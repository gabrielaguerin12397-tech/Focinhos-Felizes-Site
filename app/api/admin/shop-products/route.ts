import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/animals";

const productPhotoBucket = "shop-products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

async function requireAdmin(request: Request) {
  const clients = getSupabaseClients(request.headers.get("authorization"));

  if (!clients) {
    return { error: NextResponse.json({ error: "Supabase nao configurado." }, { status: 500 }) };
  }

  const { data: userData } = await clients.userClient.auth.getUser();
  if (!userData.user) {
    return { error: NextResponse.json({ error: "Login administrativo obrigatorio." }, { status: 401 }) };
  }

  return { clients };
}

function getString(form: FormData, key: string, fallback = "") {
  const value = form.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

async function uploadProductImage(adminClient: any, key: string, file: File | null) {
  if (!file || file.size === 0) return null;

  const { error: bucketError } = await adminClient.storage.createBucket(productPhotoBucket, {
    public: true,
    fileSizeLimit: 8 * 1024 * 1024,
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"]
  });

  if (bucketError && !String(bucketError.message || "").toLowerCase().includes("already exists")) {
    throw bucketError;
  }

  await adminClient.storage.updateBucket(productPhotoBucket, { public: true });

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${key}/${crypto.randomUUID()}.${extension}`;
  const { error } = await adminClient.storage
    .from(productPhotoBucket)
    .upload(path, file, { contentType: file.type || "image/jpeg", upsert: true });

  if (error) throw error;

  const { data } = adminClient.storage.from(productPhotoBucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const { data, error } = await auth.clients.adminClient
    .from("shop_products")
    .select("*")
    .order("ordem", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data || [] });
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const form = await request.formData();
  const nome = getString(form, "nome");
  const valor = Number(getString(form, "valor", "0"));

  if (!nome) return NextResponse.json({ error: "Informe o nome do produto." }, { status: 400 });
  if (!valor || valor <= 0) return NextResponse.json({ error: "Informe um valor valido." }, { status: 400 });

  const currentKey = getString(form, "chave");
  const chave = currentKey || slugify(nome);
  const imageFile = form.get("image");
  const existingImage = getString(form, "imagem_url");

  let imageUrl = existingImage || null;
  try {
    imageUrl = await uploadProductImage(
      auth.clients.adminClient,
      chave,
      imageFile instanceof File ? imageFile : null
    ) || imageUrl;
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    return NextResponse.json({ error: `Nao foi possivel enviar a imagem: ${message}` }, { status: 500 });
  }

  const payload = {
    chave,
    nome,
    descricao: getString(form, "descricao") || null,
    valor,
    imagem_url: imageUrl,
    tipo: getString(form, "tipo", "item") === "recurring" ? "recurring" : "item",
    ativo: getString(form, "ativo", "true") !== "false",
    ordem: Number(getString(form, "ordem", "0")) || 0,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await auth.clients.adminClient
    .from("shop_products")
    .upsert(payload, { onConflict: "chave" })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/doacao");
  revalidatePath(`/doacao/${chave}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ product: data, key: chave, link: `/doacao/${chave}` });
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const key = new URL(request.url).searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Informe o produto para excluir." }, { status: 400 });

  const { error } = await auth.clients.adminClient.from("shop_products").delete().eq("chave", key);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/doacao");
  revalidatePath(`/doacao/${key}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
