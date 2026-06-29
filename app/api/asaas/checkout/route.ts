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
      message: "Preencha seus dados e aceite o contato antes de ir para o checkout."
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

  const total = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
  const description = items
    .map((item) => `${item.qty || 1}x ${item.name}`)
    .join(", ");

  if (!isHttpUrl(supabaseUrl) || !serviceRoleKey) {
    return NextResponse.json({
      checkoutUrl: null,
      message: "Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY na Vercel para salvar o lead antes do checkout."
    }, { status: 500 });
  }

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
    cpf_cnpj: donor.cpfCnpj,
    cep: donor.cep,
    endereco: donor.endereco,
    numero: donor.numero,
    complemento: donor.complemento || null,
    bairro: donor.bairro,
    estado: donor.estado,
    carrinho: items,
    valor_total: total
  }).select("id").single();

  if (leadError) {
    return NextResponse.json({
      checkoutUrl: null,
      message: "Não foi possível salvar seus dados no CRM. Tente novamente."
    }, { status: 500 });
  }

  const response = await fetch(`${asaasBaseUrl}/paymentLinks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey
    },
    body: JSON.stringify({
      name: hasRecurring ? "Doação mensal - Focinhos Felizes" : "Doação de itens - Focinhos Felizes",
      description,
      value: total,
      billingType: "UNDEFINED",
      chargeType: hasRecurring ? "RECURRENT" : "DETACHED",
      subscriptionCycle: hasRecurring ? "MONTHLY" : undefined,
      dueDateLimitDays: 7,
      isAddressRequired: true,
      externalReference: lead?.id || `focinhos-${Date.now()}`
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json({
      checkoutUrl: null,
      message: data?.errors?.[0]?.description || "O Asaas recusou a criação do checkout."
    }, { status: response.status });
  }

  const checkoutUrl = data.url || data.paymentLink || null;

  if (lead?.id && checkoutUrl) {
    await supabase.from("leads").update({
      asaas_checkout_url: checkoutUrl,
      asaas_payment_link_id: data.id || null,
      etapa_funil: "checkout_asaas"
    }).eq("id", lead.id);
  }

  return NextResponse.json({
    checkoutUrl,
    asaasId: data.id || null
  });
}
