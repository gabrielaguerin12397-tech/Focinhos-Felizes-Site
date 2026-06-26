import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const message = String(body.message || "");

  return NextResponse.json({
    reply: `Recebi sua mensagem: "${message}". A próxima etapa é conectar esta rota ao OpenAI usando OPENAI_API_KEY no ambiente da Vercel.`
  });
}
