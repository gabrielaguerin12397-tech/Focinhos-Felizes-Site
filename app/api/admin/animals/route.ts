import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { slugify } from "@/lib/animals";

function getSupabaseClients(authHeader: string | null) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || anonKey;

  if (!url || !anonKey || !serviceKey) return null;

  return {
    userClient: createClient(url, anonKey, {
      global: { headers: authHeader ? { Authorization: authHeader } : {} },
      auth: { persistSession: false }
    }),
    adminClient: createClient(url, serviceKey, { auth: { persistSession: false } })
  };
}

export async function POST(request: Request) {
  const clients = getSupabaseClients(request.headers.get("authorization"));

  if (!clients) {
    return NextResponse.json({ error: "Supabase não configurado." }, { status: 500 });
  }

  const { data: userData } = await clients.userClient.auth.getUser();
  if (!userData.user) {
    return NextResponse.json({ error: "Login administrativo obrigatório." }, { status: 401 });
  }

  const body = await request.json();
  const nome = String(body.nome || "").trim();

  if (!nome) {
    return NextResponse.json({ error: "Informe o nome do animal." }, { status: 400 });
  }

  const slug = slugify(body.slug || nome);
  const fotoPrincipal = String(body.foto_principal_url || "").trim();

  const payload = {
    slug,
    nome,
    especie: body.especie || "Cão",
    idade: body.idade || null,
    faixa_etaria: body.faixa_etaria || "adulto",
    sexo: body.sexo || "Macho",
    porte: body.porte || "Médio",
    cor: body.cor || null,
    cidade: body.cidade || "Manaus",
    status: body.status || "Disponível",
    castrado: Boolean(body.castrado),
    vacinado: Boolean(body.vacinado),
    vermifugado: Boolean(body.vermifugado),
    personalidade: body.personalidade || null,
    historia: body.historia || null,
    energia: body.energia || "Moderada",
    moradia: Array.isArray(body.moradia) ? body.moradia : [],
    perfil_ideal: Array.isArray(body.perfil_ideal) ? body.perfil_ideal : [],
    criancas: body.criancas || "Com supervisão",
    outros_animais: body.outros_animais || "Com adaptação",
    tempo_sozinho: body.tempo_sozinho || "Moderado",
    experiencia: body.experiencia || "Primeira adoção",
    foto_principal_url: fotoPrincipal || null,
    fotos: fotoPrincipal ? [fotoPrincipal] : [],
    updated_at: new Date().toISOString()
  };

  const { data, error } = await clients.adminClient
    .from("animais")
    .upsert(payload, { onConflict: "slug" })
    .select("slug")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slug: data.slug });
}
