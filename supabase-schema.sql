create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text not null,
  email text not null,
  cidade text not null,
  interesse text not null,
  observacao text,
  consentimento boolean not null default false,
  origem text not null default 'site',
  etapa_funil text not null default 'novo',
  cpf_cnpj text,
  cep text,
  endereco text,
  numero text,
  complemento text,
  bairro text,
  estado text,
  carrinho jsonb,
  valor_total numeric(10,2),
  asaas_checkout_url text,
  created_at timestamptz not null default now()
);

alter table public.leads add column if not exists cpf_cnpj text;
alter table public.leads add column if not exists cep text;
alter table public.leads add column if not exists endereco text;
alter table public.leads add column if not exists numero text;
alter table public.leads add column if not exists complemento text;
alter table public.leads add column if not exists bairro text;
alter table public.leads add column if not exists estado text;
alter table public.leads add column if not exists carrinho jsonb;
alter table public.leads add column if not exists valor_total numeric(10,2);
alter table public.leads add column if not exists asaas_checkout_url text;

create table if not exists public.animais (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  especie text not null,
  idade text,
  sexo text,
  porte text,
  cor text,
  status text not null default 'Disponível',
  castrado boolean default false,
  vacinado boolean default false,
  vermifugado boolean default false,
  personalidade text,
  historia text,
  energia text,
  foto_principal_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text unique not null,
  categoria text,
  resumo text,
  conteudo text,
  imagem_capa_url text,
  video_url text,
  video_embed_url text,
  publicado boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.checkout_links (
  id uuid primary key default gen_random_uuid(),
  chave text unique not null,
  nome text not null,
  valor numeric(10,2),
  asaas_payment_link_id text,
  asaas_checkout_url text,
  recorrente boolean not null default false,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shop_products (
  id uuid primary key default gen_random_uuid(),
  chave text unique not null,
  nome text not null,
  descricao text,
  valor numeric(10,2) not null,
  imagem_url text,
  tipo text not null default 'item',
  ativo boolean not null default true,
  ordem integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
