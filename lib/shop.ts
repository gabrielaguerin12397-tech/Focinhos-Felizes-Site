import { createClient } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";
import { donationItems, type DonationProduct } from "@/lib/data";
import { slugify } from "@/lib/animals";

type ShopProductRow = {
  id: string;
  chave: string | null;
  nome: string;
  descricao: string | null;
  valor: number | string;
  imagem_url: string | null;
  tipo: string | null;
  ativo: boolean | null;
  ordem: number | null;
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

export function productFromRow(row: ShopProductRow): DonationProduct {
  return {
    key: row.chave || slugify(row.nome),
    name: row.nome,
    price: Number(row.valor) || 0,
    image: row.imagem_url || "/assets/donation-food.png",
    description: row.descricao || "Doacao solidaria para ajudar os animais acolhidos.",
    type: row.tipo === "recurring" ? "recurring" : "item"
  };
}

export async function getShopProducts() {
  noStore();
  const supabase = getServerSupabase();
  if (!supabase) return donationItems;

  const { data, error } = await supabase
    .from("shop_products")
    .select("*")
    .eq("ativo", true)
    .order("ordem", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data?.length) return donationItems;
  return (data as ShopProductRow[]).map(productFromRow);
}

export async function getShopProductByKey(key: string) {
  const products = await getShopProducts();
  return products.find((product) => product.key === key) || null;
}
