import { createClient } from "@supabase/supabase-js";
import type { Animal } from "@/lib/data";

type AnimalRow = {
  id: string;
  slug: string | null;
  nome: string;
  especie: string | null;
  idade: string | null;
  faixa_etaria: string | null;
  sexo: string | null;
  porte: string | null;
  cor: string | null;
  cidade: string | null;
  status: string | null;
  castrado: boolean | null;
  vacinado: boolean | null;
  vermifugado: boolean | null;
  personalidade: string | null;
  historia: string | null;
  energia: string | null;
  moradia: string[] | null;
  perfil_ideal: string[] | null;
  criancas: string | null;
  outros_animais: string | null;
  tempo_sozinho: string | null;
  experiencia: string | null;
  foto_principal_url: string | null;
  fotos: string[] | null;
};

function getServerSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const url = new URL(supabaseUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
}

export type AnimalProfile = Animal;

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeSpecies(value?: string | null): Animal["especie"] {
  const normalized = String(value || "").toLowerCase();
  return normalized.includes("gat") ? "Gato" : "Cão";
}

function normalizeSex(value?: string | null): Animal["sexo"] {
  const normalized = String(value || "").toLowerCase();
  return normalized.includes("f") ? "Fêmea" : "Macho";
}

function normalizeSize(value?: string | null): Animal["porte"] {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("pequ")) return "Pequeno";
  if (normalized.includes("grand")) return "Grande";
  return "Médio";
}

function normalizeEnergy(value?: string | null): Animal["energia"] {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("calm")) return "Calma";
  if (normalized.includes("ativ")) return "Ativa";
  return "Moderada";
}

function normalizeStatus(value?: string | null): Animal["status"] {
  if (value === "Adotado" || value === "Apadrinhado" || value === "Em processo") return value;
  return "Disponível";
}

function normalizeChildren(value?: string | null): Animal["compatibilidade"]["criancas"] {
  if (value === "Sim" || value === "Não recomendado" || value === "Nao recomendado") return value === "Nao recomendado" ? "Não recomendado" : value;
  return "Com supervisão";
}

function normalizeOtherAnimals(value?: string | null): Animal["compatibilidade"]["outrosAnimais"] {
  if (value === "Sim" || value === "Prefere ser único" || value === "Prefere ser unico") return value === "Prefere ser unico" ? "Prefere ser único" : value;
  return "Com adaptação";
}

function normalizeAloneTime(value?: string | null): Animal["compatibilidade"]["tempoSozinho"] {
  if (value === "Pouco" || value === "Longo") return value;
  return "Moderado";
}

function normalizeExperience(value?: string | null): Animal["compatibilidade"]["experiencia"] {
  if (value === "Já tive animais" || value === "Ja tive animais") return "Já tive animais";
  if (value === "Tenho animais hoje") return "Tenho animais hoje";
  return "Primeira adoção";
}

export function animalFromRow(row: AnimalRow): Animal {
  const slug = row.slug || slugify(row.nome);
  const faixaEtaria = row.faixa_etaria || "adulto";

  return {
    id: slug,
    nome: row.nome,
    especie: normalizeSpecies(row.especie),
    idade: row.idade || "Idade não informada",
    sexo: normalizeSex(row.sexo),
    porte: normalizeSize(row.porte),
    cor: row.cor || "Não informada",
    cidade: row.cidade || "Manaus",
    status: normalizeStatus(row.status),
    castrado: Boolean(row.castrado),
    vacinado: Boolean(row.vacinado),
    vermifugado: Boolean(row.vermifugado),
    personalidade: row.personalidade || "Perfil em avaliação pela equipe.",
    historia: row.historia || "A história deste animal ainda será atualizada pela equipe.",
    energia: normalizeEnergy(row.energia),
    moradia: row.moradia?.length ? row.moradia : ["Casa com quintal", "Casa sem quintal"],
    perfilIdeal: row.perfil_ideal?.length ? row.perfil_ideal : [],
    compatibilidade: {
      criancas: normalizeChildren(row.criancas),
      outrosAnimais: normalizeOtherAnimals(row.outros_animais),
      tempoSozinho: normalizeAloneTime(row.tempo_sozinho),
      experiencia: normalizeExperience(row.experiencia)
    },
    foto: row.foto_principal_url || row.fotos?.[0] || "/assets/caramel-dog.png",
    fotos: row.fotos?.length ? row.fotos : row.foto_principal_url ? [row.foto_principal_url] : [],
    tags: [
      faixaEtaria,
      normalizeSex(row.sexo) === "Fêmea" ? "femea" : "macho",
      normalizeSize(row.porte).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    ]
  };
}

export function getAnimalSlug(animal: AnimalProfile) {
  return animal.id || slugify(animal.nome);
}

export async function getAnimals() {
  const supabase = getServerSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("animais")
    .select("*")
    .neq("status", "Adotado")
    .order("created_at", { ascending: false });

  if (error || !data?.length) return [];

  return (data as AnimalRow[]).map(animalFromRow);
}

export async function getAnimalBySlug(slug: string) {
  const supabase = getServerSupabase();

  if (supabase) {
    const { data } = await supabase
      .from("animais")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (data) return animalFromRow(data as AnimalRow);
  }

  return null;
}
