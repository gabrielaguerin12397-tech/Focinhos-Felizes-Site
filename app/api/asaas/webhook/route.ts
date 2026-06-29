import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type AsaasWebhookPayload = {
  id?: string;
  event?: string;
  dateCreated?: string;
  payment?: {
    id?: string;
    status?: string;
    value?: number;
    netValue?: number;
    billingType?: string;
    customer?: string;
    externalReference?: string;
    paymentLink?: string;
    invoiceUrl?: string;
    transactionReceiptUrl?: string;
    confirmedDate?: string;
    paymentDate?: string;
    clientPaymentDate?: string;
  };
  subscription?: {
    id?: string;
    status?: string;
    externalReference?: string;
  };
};

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
  const configuredToken = process.env.ASAAS_WEBHOOK_TOKEN;
  const receivedToken = request.headers.get("asaas-access-token");

  if (configuredToken && receivedToken !== configuredToken) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = await request.json().catch(() => null) as AsaasWebhookPayload | null;

  if (!payload?.event) {
    return NextResponse.json({ ok: false, message: "Evento invalido." }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!isHttpUrl(supabaseUrl) || !serviceRoleKey) {
    return NextResponse.json({ ok: false, message: "Supabase nao configurado." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl as string, serviceRoleKey);
  const eventId = payload.id || `${payload.event}-${payload.payment?.id || payload.subscription?.id || Date.now()}`;
  const payment = payload.payment;
  const subscription = payload.subscription;
  const externalReference = payment?.externalReference || subscription?.externalReference;

  const { error: eventError } = await supabase.from("asaas_webhook_events").upsert({
    event_id: eventId,
    event_type: payload.event,
    payment_id: payment?.id || null,
    subscription_id: subscription?.id || null,
    external_reference: externalReference || null,
    payload,
    received_at: new Date().toISOString()
  }, { onConflict: "event_id" });

  if (eventError) {
    return NextResponse.json({ ok: false, message: "Erro ao registrar evento." }, { status: 500 });
  }

  if (externalReference) {
    await supabase.from("leads").update({
      etapa_funil: getFunnelStage(payload.event, payment?.status || subscription?.status),
      asaas_event_last: payload.event,
      asaas_payment_id: payment?.id || null,
      asaas_subscription_id: subscription?.id || null,
      asaas_status: payment?.status || subscription?.status || null,
      asaas_billing_type: payment?.billingType || null,
      asaas_invoice_url: payment?.invoiceUrl || null,
      asaas_receipt_url: payment?.transactionReceiptUrl || null,
      asaas_paid_at: payment?.confirmedDate || payment?.paymentDate || payment?.clientPaymentDate || null
    }).eq("id", externalReference);
  }

  return NextResponse.json({ ok: true });
}

function getFunnelStage(event: string, status?: string) {
  if (event === "PAYMENT_RECEIVED" || event === "PAYMENT_CONFIRMED" || status === "RECEIVED" || status === "CONFIRMED") {
    return "pagamento_confirmado";
  }

  if (event === "PAYMENT_OVERDUE" || status === "OVERDUE") {
    return "pagamento_vencido";
  }

  if (event === "PAYMENT_DELETED" || event === "PAYMENT_REFUNDED" || status === "REFUNDED") {
    return "pagamento_cancelado";
  }

  if (event.startsWith("SUBSCRIPTION_")) {
    return "assinatura_atualizada";
  }

  return "pagamento_atualizado";
}
