import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type CheckoutItem = {
  key: string;
  name: string;
  price: number;
  qty: number;
  type: "item" | "recurring";
};

type Donor = {
  nome?: string;
  email?: string;
  whatsapp?: string;
  cpfCnpj?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  consentimento?: string;
};

const asaasBaseUrl =
  process.env.ASAAS_ENVIRONMENT === "sandbox"
    ? "https://api-sandbox.asaas.com/v3"
    : "https://api.asaas.com/v3";

function isHttpUrl(value: string | undefined) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function onlyDigits(value: string | undefined) {
  return String(value || "").replace(/\D/g, "");
}

function getDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().slice(0, 10);
}

async function asaasRequest(path: string, apiKey: string, body: unknown) {
  const response = await fetch(`${asaasBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey
    },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const items = Array.isArray(body.items) ? body.items as CheckoutItem[] : [];
  const donor = (body.donor || {}) as Donor;
  const apiKey = process.env.ASAAS_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!items.length) {
    return NextResponse.json({ checkoutUrl: null, message: "Escolha pelo menos um item para doar." }, { status: 400 });
  }

  const requiredDonorFields: Array<keyof Donor> = ["nome", "email", "whatsapp", "cpfCnpj", "cep", "endereco", "numero", "bairro", "cidade", "estado"];
  const missingField = requiredDonorFields.find((field) => !String(donor[field] || "").trim());

  if (missingField || donor.consentimento !== "true") {
    return NextResponse.json({
      checkoutUrl: null,
      message: "Preencha seus dados e aceite o contato antes de finalizar a compra."
    }, { status: 400 });
  }

  const hasRecurring = items.some((item) => item.type === "recurring");
  const hasOneTime = items.some((item) => item.type === "item");

  if (hasRecurring && hasOneTime) {
    return NextResponse.json({
      checkoutUrl: null,
      message: "Finalize a doação mensal separada dos itens avulsos."
    }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({
      checkoutUrl: null,
      message: "Configure ASAAS_API_KEY na Vercel para ativar o checkout real."
    }, { status: 500 });
  }

  if (!isHttpUrl(supabaseUrl) || !serviceRoleKey) {
    return NextResponse.json({
      checkoutUrl: null,
      message: "Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY na Vercel para salvar o lead antes do checkout."
    }, { status: 500 });
  }

  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
  const description = items.map((item) => `${item.qty || 1}x ${item.name}`).join(", ");
  const supabase = createClient(supabaseUrl as string, serviceRoleKey);

  const { data: lead, error: leadError } = await supabase.from("leads").insert({
    nome: donor.nome,
    email: donor.email,
    whatsapp: donor.whatsapp,
    cidade: donor.cidade,
    interesse: hasRecurring ? "doacao_mensal" : "doacao_itens",
    observacao: description,
    consentimento: true,
    origem: "lojinha",
    etapa_funil: "checkout_iniciado",
    cpf_cnpj: onlyDigits(donor.cpfCnpj),
    cep: onlyDigits(donor.cep),
    endereco: donor.endereco,
    numero: donor.numero,
    complemento: donor.complemento || null,
    bairro: donor.bairro,
    estado: String(donor.estado || "").toUpperCase(),
    carrinho: items,
    valor_total: total
  }).select("id").single();

  if (leadError) {
    return NextResponse.json({
      checkoutUrl: null,
      message: "Não foi possível salvar seus dados no CRM. Tente novamente."
    }, { status: 500 });
  }

  const customerResult = await asaasRequest("/customers", apiKey, {
    name: donor.nome,
    cpfCnpj: onlyDigits(donor.cpfCnpj),
    email: donor.email,
    mobilePhone: onlyDigits(donor.whatsapp),
    postalCode: onlyDigits(donor.cep),
    address: donor.endereco,
    addressNumber: donor.numero,
    complement: donor.complemento || undefined,
    province: donor.bairro,
    externalReference: lead.id
  });

  if (!customerResult.response.ok) {
    return NextResponse.json({
      checkoutUrl: null,
      message: customerResult.data?.errors?.[0]?.description || "O Asaas recusou o cadastro do cliente."
    }, { status: customerResult.response.status });
  }

  const customerId = customerResult.data.id;
  const commonCharge = {
    customer: customerId,
    billingType: "UNDEFINED",
    value: total,
    description,
    externalReference: lead.id
  };

  const chargeResult = hasRecurring
    ? await asaasRequest("/subscriptions", apiKey, {
        ...commonCharge,
        cycle: "MONTHLY",
        nextDueDate: getDueDate()
      })
    : await asaasRequest("/payments", apiKey, {
        ...commonCharge,
        dueDate: getDueDate()
      });

  if (!chargeResult.response.ok) {
    return NextResponse.json({
      checkoutUrl: null,
      message: chargeResult.data?.errors?.[0]?.description || "O Asaas recusou a criação da cobrança."
    }, { status: chargeResult.response.status });
  }

  let checkoutUrl = chargeResult.data.invoiceUrl || chargeResult.data.bankSlipUrl || null;

  if (hasRecurring && !checkoutUrl && chargeResult.data.id) {
    const paymentSearch = await fetch(`${asaasBaseUrl}/payments?subscription=${chargeResult.data.id}&limit=1`, {
      headers: { access_token: apiKey }
    });
    const paymentData = await paymentSearch.json().catch(() => ({}));
    checkoutUrl = paymentData?.data?.[0]?.invoiceUrl || null;
  }

  if (!checkoutUrl) {
    return NextResponse.json({
      checkoutUrl: null,
      message: "Cobrança criada, mas o Asaas não retornou a página de pagamento."
    }, { status: 500 });
  }

  await supabase.from("leads").update({
    asaas_customer_id: customerId,
    asaas_checkout_url: checkoutUrl,
    asaas_payment_id: hasRecurring ? null : chargeResult.data.id || null,
    asaas_subscription_id: hasRecurring ? chargeResult.data.id || null : null,
    asaas_status: chargeResult.data.status || null,
    asaas_billing_type: chargeResult.data.billingType || null,
    etapa_funil: "checkout_asaas"
  }).eq("id", lead.id);

  return NextResponse.json({
    checkoutUrl,
    asaasId: chargeResult.data.id || null
  });
}
