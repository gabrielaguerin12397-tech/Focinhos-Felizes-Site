import { NextResponse } from "next/server";

type CheckoutItem = {
  key: string;
  name: string;
  price: number;
  qty: number;
  type: "item" | "recurring";
};

const asaasBaseUrl =
  process.env.ASAAS_ENVIRONMENT === "sandbox"
    ? "https://api-sandbox.asaas.com/v3"
    : "https://api.asaas.com/v3";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const items = Array.isArray(body.items) ? body.items as CheckoutItem[] : [];
  const apiKey = process.env.ASAAS_API_KEY;

  if (!items.length) {
    return NextResponse.json({ checkoutUrl: null, message: "Escolha pelo menos um item para doar." }, { status: 400 });
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
      externalReference: `focinhos-${Date.now()}`
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json({
      checkoutUrl: null,
      message: data?.errors?.[0]?.description || "O Asaas recusou a criação do checkout."
    }, { status: response.status });
  }

  return NextResponse.json({
    checkoutUrl: data.url || data.paymentLink || null,
    asaasId: data.id || null
  });
}
