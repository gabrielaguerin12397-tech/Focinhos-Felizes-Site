import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isHttpUrl(value: string | undefined) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const hasSupabaseConfig = isHttpUrl(supabaseUrl) && Boolean(supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
