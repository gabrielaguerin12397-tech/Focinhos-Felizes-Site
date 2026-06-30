"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { donationItems } from "@/lib/data";

type AdminModule = "animais" | "blog" | "loja" | "leads" | "asaas";

const modules: Array<{ id: AdminModule; title: string; description: string }> = [
  { id: "animais", title: "Animais", description: "Cadastrar, buscar, editar, fotos e excluir perfis." },
  { id: "blog", title: "Blog", description: "Atualizar noticias, campanhas e dicas." },
  { id: "loja", title: "Loja", description: "Editar itens de doacao, valores, fotos e produtos mensais." },
  { id: "leads", title: "Leads", description: "Ver cadastros de adotantes e doadores." },
  { id: "asaas", title: "Asaas", description: "Configurar links e API de checkout." }
];

export function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [activeModule, setActiveModule] = useState<AdminModule>("animais");
  const [loading, setLoading] = useState(Boolean(supabase));
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const isSupabaseReady = Boolean(supabase);
  const userEmail = session?.user.email ?? "";

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setMessage("");
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const activeTitle = useMemo(() => modules.find((item) => item.id === activeModule)?.title, [activeModule]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage("Configure as variaveis do Supabase na Vercel para liberar o login real.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);

    if (error) {
      setMessage("E-mail ou senha invalidos. Confira o usuario criado no Supabase Auth.");
    }
  }

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }

  if (loading) {
    return (
      <main className="page-main">
        <section className="admin-login-screen">
          <div className="form admin-login-card">
            <img src="/assets/logo-focinhos-felizes.jpeg" alt="Focinhos Felizes" />
            <p className="eyebrow">Area da equipe</p>
            <h1>Carregando painel...</h1>
          </div>
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="page-main">
        <section className="admin-login-screen">
          <form className="form admin-login-card" onSubmit={handleLogin}>
            <img src="/assets/logo-focinhos-felizes.jpeg" alt="Focinhos Felizes" />
            <p className="eyebrow">Area da equipe</p>
            <h1>Entrar no painel</h1>

            <label>
              E-mail
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@focinhosfelizes.ong.br"
              />
            </label>

            <label>
              Senha
              <input
                required
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha"
              />
            </label>

            <button className="button primary" type="submit" disabled={submitting || !isSupabaseReady}>
              {submitting ? "Entrando..." : "Entrar"}
            </button>

            {!isSupabaseReady ? (
              <p className="login-warning">
                Login ainda nao conectado. Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY na Vercel.
              </p>
            ) : null}
            {message ? <p className="login-warning">{message}</p> : null}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="page-main">
      <section className="section admin-shell">
        <div className="admin-toolbar">
          <div>
            <p className="eyebrow">Painel administrativo</p>
            <h1>Bem-vinda ao painel</h1>
            <span className="admin-user">{userEmail}</span>
          </div>
          <button className="button neutral" type="button" onClick={handleLogout}>Sair</button>
        </div>

        <div className="admin-module-grid">
          {modules.map((item) => (
            <button
              key={item.id}
              className={`module-card ${activeModule === item.id ? "active" : ""}`}
              type="button"
              onClick={() => setActiveModule(item.id)}
            >
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>

        <div className="admin-module-panel">
          <h2>{activeTitle}</h2>
          {activeModule === "animais" ? <AnimalAdminPreview /> : null}
          {activeModule === "blog" ? <BlogAdminPreview /> : null}
          {activeModule === "loja" ? <ShopAdminPreview /> : null}
          {activeModule === "leads" ? <LeadsAdminPreview /> : null}
          {activeModule === "asaas" ? <AsaasAdminPreview /> : null}
        </div>
      </section>
    </main>
  );
}

function AnimalAdminPreview() {
  const [animalPhotos, setAnimalPhotos] = useState<string[]>([]);

  function handleAnimalPhotos(files: FileList | null) {
    if (!files) return;
    setAnimalPhotos(Array.from(files).map((file) => URL.createObjectURL(file)));
  }

  return (
    <div className="admin-workspace">
      <div className="empty-state">
        <strong>Busca de animal</strong>
        <input type="search" placeholder="Buscar por nome, cor, porte ou status" />
        <p>Proximo passo: ligar esta tela na tabela animals do Supabase para editar fotos e campos.</p>
      </div>
      <form className="form editor-form">
        <label>Nome<input placeholder="Ex: Thor" /></label>
        <label>Especie<select defaultValue="Cao"><option value="Cao">Cao</option><option value="Gato">Gato</option></select></label>
        <label>Idade<input placeholder="Ex: 3 anos, 5 meses" /></label>
        <label>Faixa etaria<select defaultValue="adulto"><option value="filhote">Filhote</option><option value="adulto">Adulto</option><option value="idoso">Idoso</option></select></label>
        <label>Sexo<select defaultValue="Macho"><option>Macho</option><option>Femea</option></select></label>
        <label>Porte<select defaultValue="Medio"><option>Pequeno</option><option>Medio</option><option>Grande</option></select></label>
        <label>Cor do pelo<input placeholder="Ex: caramelo" /></label>
        <label>Cidade<input placeholder="Ex: Manaus" /></label>
        <label>Status<select defaultValue="Disponivel"><option>Disponivel</option><option>Em processo</option><option>Adotado</option><option>Apadrinhado</option></select></label>
        <label>Nivel de energia<select defaultValue="Moderada"><option>Calma</option><option>Moderada</option><option>Ativa</option></select></label>
        <label>Moradia ideal<select multiple defaultValue={["Casa com quintal"]}><option>Apartamento</option><option>Casa com quintal</option><option>Casa sem quintal</option></select></label>
        <label>Tempo sozinho<select defaultValue="Moderado"><option>Pouco</option><option>Moderado</option><option>Longo</option></select></label>
        <label>Convivencia com criancas<select defaultValue="Com supervisao"><option>Sim</option><option>Com supervisao</option><option>Nao recomendado</option></select></label>
        <label>Convivencia com outros animais<select defaultValue="Com adaptacao"><option>Sim</option><option>Com adaptacao</option><option>Prefere ser unico</option></select></label>
        <label>Experiencia indicada<select defaultValue="Primeira adocao"><option>Primeira adocao</option><option>Ja tive animais</option><option>Tenho animais hoje</option></select></label>
        <label>Caracteristicas para o Fred<textarea placeholder="Ex: familia presente, passeios diarios, apartamento telado" /></label>
        <div className="form-check-grid">
          <label><input type="checkbox" /> Castrado</label>
          <label><input type="checkbox" /> Vacinado</label>
          <label><input type="checkbox" /> Vermifugado</label>
        </div>
        <label>
          Fotos do animal
          <input type="file" accept="image/*" multiple onChange={(event) => handleAnimalPhotos(event.target.files)} />
        </label>
        {animalPhotos.length ? (
          <div className="upload-preview-grid" aria-label="Previa das fotos do animal">
            {animalPhotos.map((photo, index) => (
              <img key={photo} src={photo} alt={`Foto ${index + 1} selecionada`} />
            ))}
          </div>
        ) : null}
        <label>Personalidade<textarea placeholder="Ex: carinhoso, sociavel, tranquilo, brincalhao" /></label>
        <label>Historia<textarea placeholder="Conte a historia do animal" /></label>
        <button className="button primary" type="button">Salvar animal</button>
      </form>
    </div>
  );
}

function BlogAdminPreview() {
  const [coverImage, setCoverImage] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");

  function handleCoverImage(files: FileList | null) {
    const file = files?.[0];
    setCoverImage(file ? URL.createObjectURL(file) : "");
  }

  function handleVideo(files: FileList | null) {
    const file = files?.[0];
    setVideoPreview(file ? URL.createObjectURL(file) : "");
  }

  return (
    <form className="form asaas-form">
      <label>Titulo<input placeholder="Titulo da noticia ou campanha" /></label>
      <label>Categoria<input placeholder="Resgate, adocao, campanha, evento..." /></label>
      <label>
        Imagem de capa
        <input type="file" accept="image/*" onChange={(event) => handleCoverImage(event.target.files)} />
      </label>
      {coverImage ? (
        <div className="blog-cover-preview">
          <img src={coverImage} alt="Previa da capa do blog" />
        </div>
      ) : null}
      <label>
        Video do post
        <input type="file" accept="video/*" onChange={(event) => handleVideo(event.target.files)} />
      </label>
      <label>
        Link de video
        <input placeholder="YouTube, Instagram, TikTok ou link direto" />
      </label>
      {videoPreview ? (
        <div className="blog-video-preview">
          <video src={videoPreview} controls />
        </div>
      ) : null}
      <label>Texto<textarea placeholder="Escreva o conteudo do blog" /></label>
      <button className="button primary" type="button">Salvar post</button>
    </form>
  );
}

function LeadsAdminPreview() {
  return <p className="empty-state">Aqui vao aparecer os cadastros recebidos pelos formularios do site.</p>;
}

function ShopAdminPreview() {
  const [productImage, setProductImage] = useState("");

  function handleProductImage(files: FileList | null) {
    const file = files?.[0];
    setProductImage(file ? URL.createObjectURL(file) : "");
  }

  return (
    <div className="admin-workspace">
      <div className="profile-list">
        {donationItems.map((item) => (
          <button className="profile-row" type="button" key={item.key}>
            <img src={item.image} alt={item.name} />
            <span><strong>{item.name}</strong><small>R$ {item.price},00 {item.type === "recurring" ? "mensal" : "item avulso"}</small></span>
          </button>
        ))}
      </div>
      <form className="form editor-form">
        <label>Nome do produto<input placeholder="Ex: Saco de ração 10 kg" /></label>
        <label>Valor<input type="number" min="1" placeholder="95" /></label>
        <label>Tipo<select defaultValue="item"><option value="item">Item avulso</option><option value="recurring">Doação mensal recorrente</option></select></label>
        <label>Imagem do produto<input type="file" accept="image/*" onChange={(event) => handleProductImage(event.target.files)} /></label>
        {productImage ? <div className="blog-cover-preview"><img src={productImage} alt="Previa do produto" /></div> : null}
        <label>Descricao<textarea placeholder="Explique como essa doação ajuda os animais" /></label>
        <button className="button primary" type="button">Salvar produto</button>
        <p className="login-hint">Proximo passo: salvar produtos no Supabase e exibir automaticamente na lojinha.</p>
      </form>
    </div>
  );
}

function AsaasAdminPreview() {
  return (
    <form className="form asaas-form">
      <label>Ambiente<select defaultValue="production"><option value="production">Produção</option><option value="sandbox">Sandbox/testes</option></select></label>
      <label>Chave da API<input placeholder="ASAAS_API_KEY fica segura na Vercel" disabled /></label>
      <p className="empty-state">A chave do Asaas deve ficar apenas nas variáveis de ambiente da Vercel. O site cria o checkout pela rota segura /api/asaas/checkout.</p>
    </form>
  );
}
