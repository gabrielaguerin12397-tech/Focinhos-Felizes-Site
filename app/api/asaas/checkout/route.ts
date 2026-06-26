import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    checkoutUrl: null,
    item: body.item || null,
    message: "Configure ASAAS_API_KEY na Vercel e implemente a criação de cobrança/link de pagamento nesta rota."
  });
}
