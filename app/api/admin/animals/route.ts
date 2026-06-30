import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/animals";

const animalPhotoBucket = "animal-photos";

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

function getString(form: FormData, key: string, fallback = "") {
  const value = form.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getBoolean(form: FormData, key: string) {
  return form.get(key) === "on" || form.get(key) === "true";
}

function getList(form: FormData, key: string) {
  return form
    .getAll(key)
    .map((item) => String(item).trim())
    .filter(Boolean);
}

async function uploadAnimalPhotos(adminClient: any, slug: string, files: File[]) {
  if (!files.length) return [];

  const { error: bucketError } = await adminClient.storage.createBucket(animalPhotoBucket, {
    public: true,
    fileSizeLimit: 8 * 1024 * 1024,
    allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"]
  });

  if (bucketError && !String(bucketError.message || "").toLowerCase().includes("already exists")) {
    throw bucketError;
  }

  await adminClient.storage.updateBucket(animalPhotoBucket, { public: true });

  const urls: string[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${slug}/${String(index + 1).padStart(2, "0")}-${crypto.randomUUID()}.${extension}`;
    const { error } = await adminClient.storage
      .from(animalPhotoBucket)
      .upload(path, file, { contentType: file.type || "image/jpeg", upsert: true });

    if (error) throw error;

    const { data } = adminClient.storage.from(animalPhotoBucket).getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
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

export async function GET(request: Request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const { data, error } = await auth.clients.adminClient
    .from("animais")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ animals: data || [] });
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;

  const slug = new URL(request.url).searchParams.get("slug");
  const id = new URL(request.url).searchParams.get("id");
  if (!slug && !id) {
    return NextResponse.json({ error: "Informe o animal para excluir." }, { status: 400 });
  }

  const query = auth.clients.adminClient.from("animais").delete();
  const { error } = id ? await query.eq("id", id) : await query.eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/adocao");
  if (slug) revalidatePath(`/adocao/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (auth.error) return auth.error;
  const { clients } = auth;

  const contentType = request.headers.get("content-type") || "";
  const isMultipart = contentType.includes("multipart/form-data");
  const form = isMultipart ? await request.formData() : null;
  const body = form ? null : await request.json();
  const nome = form ? getString(form, "nome") : String(body.nome || "").trim();

  if (!nome) {
    return NextResponse.json({ error: "Informe o nome do animal." }, { status: 400 });
  }

  const slug = slugify(form ? getString(form, "slug", nome) : body.slug || nome);
  const existingMainPhoto = form ? getString(form, "foto_principal_url") : String(body.foto_principal_url || "").trim();
  const existingPhotos = form
    ? (() => {
        try {
          const parsed = JSON.parse(getString(form, "existing_fotos", "[]"));
          return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [];
        } catch {
          return [];
        }
      })()
    : [];

  let uploadedPhotos: string[] = [];
  try {
    uploadedPhotos = form
      ? await uploadAnimalPhotos(
          clients.adminClient,
          slug,
          form.getAll("photos").filter((item): item is File => item instanceof File && item.size > 0)
        )
      : [];
  } catch (error) {
    const message = error instanceof Error ? error.message : "erro desconhecido";
    return NextResponse.json({ error: `Nao foi possivel enviar as fotos: ${message}` }, { status: 500 });
  }

  const photos = [...existingPhotos, ...uploadedPhotos];
  if (!photos.length && existingMainPhoto) photos.push(existingMainPhoto);
  const coverIndex = Number(form ? getString(form, "cover_index", "0") : body.cover_index || 0);
  const coverPhoto = photos[Number.isFinite(coverIndex) ? coverIndex : 0] || photos[0] || null;
  const perfilIdeal = form
    ? getString(form, "perfil_ideal")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : Array.isArray(body.perfil_ideal)
      ? body.perfil_ideal
      : [];

  const payload = {
    slug,
    nome,
    especie: form ? getString(form, "especie", "Cao") : body.especie || "Cao",
    idade: form ? getString(form, "idade") || null : body.idade || null,
    faixa_etaria: form ? getString(form, "faixa_etaria", "adulto") : body.faixa_etaria || "adulto",
    sexo: form ? getString(form, "sexo", "Macho") : body.sexo || "Macho",
    porte: form ? getString(form, "porte", "Medio") : body.porte || "Medio",
    cor: form ? getString(form, "cor") || null : body.cor || null,
    cidade: form ? getString(form, "cidade", "Manaus") : body.cidade || "Manaus",
    status: form ? getString(form, "status", "Disponivel") : body.status || "Disponivel",
    castrado: form ? getBoolean(form, "castrado") : Boolean(body.castrado),
    vacinado: form ? getBoolean(form, "vacinado") : Boolean(body.vacinado),
    vermifugado: form ? getBoolean(form, "vermifugado") : Boolean(body.vermifugado),
    personalidade: form ? getString(form, "personalidade") || null : body.personalidade || null,
    historia: form ? getString(form, "historia") || null : body.historia || null,
    energia: form ? getString(form, "energia", "Moderada") : body.energia || "Moderada",
    moradia: form ? getList(form, "moradia") : Array.isArray(body.moradia) ? body.moradia : [],
    perfil_ideal: perfilIdeal,
    criancas: form ? getString(form, "criancas", "Com supervisao") : body.criancas || "Com supervisao",
    outros_animais: form ? getString(form, "outros_animais", "Com adaptacao") : body.outros_animais || "Com adaptacao",
    tempo_sozinho: form ? getString(form, "tempo_sozinho", "Moderado") : body.tempo_sozinho || "Moderado",
    experiencia: form ? getString(form, "experiencia", "Primeira adocao") : body.experiencia || "Primeira adocao",
    foto_principal_url: coverPhoto,
    fotos: photos,
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

  revalidatePath("/");
  revalidatePath("/adocao");
  revalidatePath(`/adocao/${data.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ slug: data.slug, foto_principal_url: coverPhoto, fotos: photos });
}
