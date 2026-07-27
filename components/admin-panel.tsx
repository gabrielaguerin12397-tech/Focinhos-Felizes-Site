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
          {activeModule === "animais" ? <AnimalAdminPreview session={session} /> : null}
          {activeModule === "blog" ? <BlogAdminPreview /> : null}
          {activeModule === "loja" ? <ShopAdminPreview session={session} /> : null}
          {activeModule === "leads" ? <LeadsAdminPreview /> : null}
          {activeModule === "asaas" ? <AsaasAdminPreview /> : null}
        </div>
      </section>
    </main>
  );
}

type AdminAnimal = {
  id?: string;
  slug: string;
  nome: string;
  especie?: string;
  idade?: string;
  faixa_etaria?: string;
  sexo?: string;
  porte?: string;
  cor?: string;
  cidade?: string;
  status?: string;
  energia?: string;
  moradia?: string[];
  tempo_sozinho?: string;
  criancas?: string;
  outros_animais?: string;
  experiencia?: string;
  experiencias?: string[];
  perfil_ideal?: string[];
  castrado?: boolean;
  vacinado?: boolean;
  vermifugado?: boolean;
  foto_principal_url?: string;
  fotos?: string[];
  personalidade?: string;
  historia?: string;
};

type AnimalPhotoDraft = {
  id: string;
  preview: string;
  file?: File;
  url?: string;
};

function AnimalAdminPreview({ session }: { session: Session }) {
  const [animals, setAnimals] = useState<AdminAnimal[]>([]);
  const [selectedAnimal, setSelectedAnimal] = useState<AdminAnimal | null>(null);
  const [animalPhotos, setAnimalPhotos] = useState<AnimalPhotoDraft[]>([]);
  const [coverPhotoId, setCoverPhotoId] = useState("");
  const [animalQuery, setAnimalQuery] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingAnimals, setLoadingAnimals] = useState(false);

  useEffect(() => {
    loadAnimals();
  }, []);

  async function loadAnimals() {
    setLoadingAnimals(true);
    const response = await fetch("/api/admin/animals", {
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const result = await response.json();
    setLoadingAnimals(false);

    if (response.ok) setAnimals(result.animals || []);
  }

  function handleAnimalPhotos(files: FileList | null) {
    if (!files) return;
    const newPhotos = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      preview: URL.createObjectURL(file)
    }));

    setAnimalPhotos((current) => {
      const next = [...current, ...newPhotos];
      if (!coverPhotoId && next[0]) setCoverPhotoId(next[0].id);
      return next;
    });
  }

  function moveAnimalPhoto(index: number, direction: -1 | 1) {
    setAnimalPhotos((current) => {
      const next = [...current];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return current;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  }

  function removeAnimalPhoto(index: number) {
    setAnimalPhotos((current) => {
      const next = current.filter((_, currentIndex) => currentIndex !== index);
      if (current[index]?.id === coverPhotoId) setCoverPhotoId(next[0]?.id || "");
      return next;
    });
  }

  async function compressAnimalPhoto(file: File) {
    if (!file.type.startsWith("image/")) return file;

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

    const maxSize = 1400;
    const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);
    const context = canvas.getContext("2d");
    if (!context) return file;

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.78));
    URL.revokeObjectURL(image.src);

    if (!blob) return file;

    return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" });
  }

  function startNewAnimal() {
    setSelectedAnimal(null);
    setAnimalPhotos([]);
    setCoverPhotoId("");
    setSaveMessage("");
  }

  function editAnimal(animal: AdminAnimal) {
    const photos = (animal.fotos?.length ? animal.fotos : animal.foto_principal_url ? [animal.foto_principal_url] : []).map((url) => ({
      id: url,
      url,
      preview: url
    }));

    setSelectedAnimal(animal);
    setAnimalPhotos(photos);
    setCoverPhotoId(animal.foto_principal_url || photos[0]?.id || "");
    setSaveMessage("");
  }

  async function deleteAnimal(animal: AdminAnimal) {
    if (!window.confirm(`Excluir o cadastro de ${animal.nome}?`)) return;

    const params = animal.id ? `id=${encodeURIComponent(animal.id)}` : `slug=${encodeURIComponent(animal.slug)}`;
    const response = await fetch(`/api/admin/animals?${params}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.access_token}` }
    });

    if (!response.ok) {
      const result = await response.json();
      setSaveMessage(`Nao foi possivel excluir: ${result.error || "erro desconhecido"}`);
      return;
    }

    if (selectedAnimal?.slug === animal.slug) startNewAnimal();
    setAnimals((current) => current.filter((item) => item.slug !== animal.slug));
    setSaveMessage("Cadastro excluido.");
  }

  async function handleSaveAnimal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveMessage("");
    setSaving(true);

    const form = new FormData(event.currentTarget);
    const perfilIdeal = String(form.get("perfil_ideal") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    form.delete("photos");
    form.set("perfil_ideal", perfilIdeal.join(", "));
    form.set("slug", selectedAnimal?.slug || "");
    form.set("existing_fotos", JSON.stringify(animalPhotos.filter((photo) => photo.url).map((photo) => photo.url)));
    form.set("cover_index", String(Math.max(0, animalPhotos.findIndex((photo) => photo.id === coverPhotoId))));
    for (const photo of animalPhotos.filter((item) => item.file)) {
      form.append("photos", await compressAnimalPhoto(photo.file as File));
    }

    const response = await fetch("/api/admin/animals", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`
      },
      body: form
    });
    const result = await response.json();
    setSaving(false);

    if (!response.ok) {
      setSaveMessage(`Nao foi possivel salvar: ${result.error || "erro desconhecido"}`);
      return;
    }

    setSaveMessage(`Animal salvo. Pagina criada: /adocao/${result.slug}`);
    event.currentTarget.reset();
    setSelectedAnimal(null);
    setAnimalPhotos([]);
    setCoverPhotoId("");
    await loadAnimals();
  }

  const filteredAnimals = animals.filter((animal) => {
    const query = animalQuery.toLowerCase();
    return [animal.nome, animal.cor, animal.porte, animal.status, animal.especie].some((value) => String(value || "").toLowerCase().includes(query));
  });

  const formKey = selectedAnimal?.slug || "new-animal";

  return (
    <div className="admin-workspace">
      <div className="empty-state">
        <strong>Busca de animal</strong>
        <input type="search" value={animalQuery} onChange={(event) => setAnimalQuery(event.target.value)} placeholder="Buscar por nome, cor, porte ou status" />
        <button className="button neutral" type="button" onClick={startNewAnimal}>Novo animal</button>
        <div className="profile-list">
          {loadingAnimals ? <p>Carregando animais...</p> : null}
          {filteredAnimals.map((animal) => (
            <div className="profile-row editable-row" key={animal.slug}>
              <button type="button" onClick={() => editAnimal(animal)}>
                <img src={animal.foto_principal_url || animal.fotos?.[0] || "/assets/caramel-dog.png"} alt={animal.nome} />
                <span><strong>{animal.nome}</strong><small>{animal.especie} - {animal.porte} - {animal.status}</small></span>
              </button>
              <button type="button" onClick={() => deleteAnimal(animal)}>Excluir</button>
            </div>
          ))}
        </div>
      </div>
      <form key={formKey} className="form editor-form" onSubmit={handleSaveAnimal}>
        <h3>{selectedAnimal ? `Editando ${selectedAnimal.nome}` : "Novo animal"}</h3>
        <label>Nome<input name="nome" required defaultValue={selectedAnimal?.nome || ""} placeholder="Ex: Thor" /></label>
        <label>Especie<select name="especie" defaultValue="Cão"><option value="Cão">Cao</option><option value="Gato">Gato</option></select></label>
        <label>Idade<input name="idade" defaultValue={selectedAnimal?.idade || ""} placeholder="Ex: 3 anos, 5 meses" /></label>
        <label>Faixa etaria<select name="faixa_etaria" defaultValue={selectedAnimal?.faixa_etaria || "adulto"}><option value="filhote">Filhote</option><option value="adulto">Adulto</option><option value="idoso">Idoso</option></select></label>
        <label>Sexo<select name="sexo" defaultValue="Macho"><option>Macho</option><option>Fêmea</option></select></label>
        <label>Porte<select name="porte" defaultValue="Médio"><option>Pequeno</option><option>Médio</option><option>Grande</option></select></label>
        <label>Cor do pelo<input name="cor" defaultValue={selectedAnimal?.cor || ""} placeholder="Ex: caramelo" /></label>
        <label>Cidade<input name="cidade" defaultValue={selectedAnimal?.cidade || "Manaus"} placeholder="Ex: Manaus" /></label>
        <label>Status<select name="status" defaultValue="Disponível"><option>Disponível</option><option>Em processo</option><option>Adotado</option><option>Apadrinhado</option></select></label>
        <label>Nivel de energia<select name="energia" defaultValue="Moderada"><option>Calma</option><option>Moderada</option><option>Ativa</option></select></label>
        <fieldset className="option-check-grid">
          <legend>Moradia ideal</legend>
          {["Apartamento", "Casa com quintal", "Casa sem quintal"].map((option) => (
            <label key={option}>
              <input name="moradia" type="checkbox" value={option} defaultChecked={(selectedAnimal?.moradia?.length ? selectedAnimal.moradia : ["Casa com quintal"]).includes(option)} />
              {option}
            </label>
          ))}
        </fieldset>
        <label>Tempo sozinho<select name="tempo_sozinho" defaultValue="Moderado"><option>Pouco</option><option>Moderado</option><option>Longo</option></select></label>
        <label>Convivencia com criancas<select name="criancas" defaultValue="Com supervisão"><option>Sim</option><option>Com supervisão</option><option>Não recomendado</option></select></label>
        <label>Convivencia com outros animais<select name="outros_animais" defaultValue="Com adaptação"><option>Sim</option><option>Com adaptação</option><option>Prefere ser único</option></select></label>
        <fieldset className="option-check-grid">
          <legend>Experiencia indicada</legend>
          {["Primeira adoção", "Já tive animais", "Tenho animais hoje"].map((option) => (
            <label key={option}>
              <input name="experiencia" type="checkbox" value={option} defaultChecked={(selectedAnimal?.experiencias?.length ? selectedAnimal.experiencias : selectedAnimal?.experiencia ? [selectedAnimal.experiencia] : ["Primeira adoção"]).includes(option)} />
              {option}
            </label>
          ))}
        </fieldset>
        <label>Caracteristicas para o Fred<textarea name="perfil_ideal" defaultValue={selectedAnimal?.perfil_ideal?.join(", ") || ""} placeholder="Ex: familia presente, passeios diarios, apartamento telado" /></label>
        <div className="form-check-grid">
          <label><input name="castrado" type="checkbox" defaultChecked={Boolean(selectedAnimal?.castrado)} /> Castrado</label>
          <label><input name="vacinado" type="checkbox" defaultChecked={Boolean(selectedAnimal?.vacinado)} /> Vacinado</label>
          <label><input name="vermifugado" type="checkbox" defaultChecked={Boolean(selectedAnimal?.vermifugado)} /> Vermifugado</label>
        </div>
        <label>URL da foto principal<input name="foto_principal_url" defaultValue={selectedAnimal?.foto_principal_url || ""} placeholder="Opcional: use apenas se quiser colar uma imagem pronta" /></label>
        <label>
          Fotos do animal
          <input type="file" accept="image/*" multiple onChange={(event) => handleAnimalPhotos(event.target.files)} />
        </label>
        {animalPhotos.length ? (
          <div className="upload-preview-grid" aria-label="Previa das fotos do animal">
            {animalPhotos.map((photo, index) => (
              <div className="ordered-photo" key={photo.id}>
                <img src={photo.preview} alt={`Foto ${index + 1} selecionada`} />
                <label><input type="radio" checked={coverPhotoId === photo.id} onChange={() => setCoverPhotoId(photo.id)} /> Capa</label>
                <strong>{index === 0 ? "Primeira foto" : `Foto ${index + 1}`}</strong>
                <div>
                  <button type="button" onClick={() => moveAnimalPhoto(index, -1)} disabled={index === 0} aria-label="Subir foto">↑</button>
                  <button type="button" onClick={() => moveAnimalPhoto(index, 1)} disabled={index === animalPhotos.length - 1} aria-label="Descer foto">↓</button>
                  <button type="button" onClick={() => removeAnimalPhoto(index)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <label>Personalidade<textarea name="personalidade" defaultValue={selectedAnimal?.personalidade || ""} placeholder="Ex: carinhoso, sociavel, tranquilo, brincalhao" /></label>
        <label>Historia<textarea name="historia" defaultValue={selectedAnimal?.historia || ""} placeholder="Conte a historia do animal" /></label>
        <button className="button primary" type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar animal"}</button>
        {saveMessage ? <p className="login-warning">{saveMessage}</p> : null}
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

type AdminShopProduct = {
  chave: string;
  nome: string;
  descricao?: string | null;
  valor: number | string;
  imagem_url?: string | null;
  tipo?: string | null;
  ativo?: boolean | null;
  ordem?: number | null;
};

function ShopAdminPreview({ session }: { session: Session }) {
  const [products, setProducts] = useState<AdminShopProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<AdminShopProduct | null>(null);
  const [productImage, setProductImage] = useState("");
  const [savingProduct, setSavingProduct] = useState(false);
  const [shopMessage, setShopMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const response = await fetch("/api/admin/shop-products", {
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok) setProducts(result.products || []);
  }

  function handleProductImage(files: FileList | null) {
    const file = files?.[0];
    setProductImage(file ? URL.createObjectURL(file) : "");
  }

  function editProduct(product: AdminShopProduct) {
    setSelectedProduct(product);
    setProductImage(product.imagem_url || "");
    setShopMessage("");
  }

  function newProduct() {
    setSelectedProduct(null);
    setProductImage("");
    setShopMessage("");
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingProduct(true);
    setShopMessage("");

    const form = new FormData(event.currentTarget);
    form.set("chave", selectedProduct?.chave || "");
    form.set("imagem_url", selectedProduct?.imagem_url || "");

    const response = await fetch("/api/admin/shop-products", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}` },
      body: form
    });
    const result = await response.json().catch(() => ({}));
    setSavingProduct(false);

    if (!response.ok) {
      setShopMessage(`Nao foi possivel salvar: ${result.error || "erro desconhecido"}`);
      return;
    }

    setShopMessage(`Produto salvo. Link para divulgar: ${result.link}`);
    event.currentTarget.reset();
    setSelectedProduct(null);
    setProductImage("");
    await loadProducts();
  }

  async function deleteProduct(product: AdminShopProduct) {
    if (!window.confirm(`Excluir ${product.nome} da lojinha?`)) return;

    const response = await fetch(`/api/admin/shop-products?key=${encodeURIComponent(product.chave)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setShopMessage(`Nao foi possivel excluir: ${result.error || "erro desconhecido"}`);
      return;
    }

    if (selectedProduct?.chave === product.chave) {
      setSelectedProduct(null);
      setProductImage("");
    }
    setProducts((current) => current.filter((item) => item.chave !== product.chave));
    setShopMessage("Produto excluido.");
  }

  async function copyProductLink(key: string) {
    const link = `${window.location.origin}/doacao/${key}`;
    await navigator.clipboard.writeText(link);
    setShopMessage(`Link copiado: ${link}`);
  }

  const formKey = selectedProduct?.chave || "new-product";

  return (
    <div className="admin-workspace">
      <div className="empty-state">
        <button className="button neutral" type="button" onClick={newProduct}>Novo produto</button>
        <div className="profile-list">
          {products.map((item) => (
            <div className="profile-row editable-row" key={item.chave}>
              <button type="button" onClick={() => editProduct(item)}>
                <img src={item.imagem_url || "/assets/donation-food.png"} alt={item.nome} />
                <span>
                  <strong>{item.nome}</strong>
                  <small>R$ {Number(item.valor)},00 {item.tipo === "recurring" ? "mensal" : "item avulso"} - /doacao/{item.chave}</small>
                </span>
              </button>
              <button type="button" onClick={() => copyProductLink(item.chave)}>Copiar link do produto</button>
              <button type="button" onClick={() => deleteProduct(item)}>Excluir</button>
            </div>
          ))}
          {!products.length ? <p>Nenhum produto cadastrado ainda.</p> : null}
        </div>
      </div>
      <form key={formKey} className="form editor-form" onSubmit={saveProduct}>
        <h3>{selectedProduct ? `Editando ${selectedProduct.nome}` : "Novo produto"}</h3>
        <label>Nome do produto<input name="nome" required defaultValue={selectedProduct?.nome || ""} placeholder="Ex: Saco de racao 10 kg" /></label>
        <label>Valor<input name="valor" required type="number" min="1" step="0.01" defaultValue={selectedProduct?.valor || ""} placeholder="95" /></label>
        <label>Tipo<select name="tipo" defaultValue={selectedProduct?.tipo || "item"}><option value="item">Item avulso</option><option value="recurring">Doacao mensal recorrente</option></select></label>
        <label>Ordem<input name="ordem" type="number" defaultValue={selectedProduct?.ordem || 0} placeholder="0" /></label>
        <label>Imagem do produto<input name="image" type="file" accept="image/*" onChange={(event) => handleProductImage(event.target.files)} /></label>
        {productImage ? <div className="blog-cover-preview"><img src={productImage} alt="Previa do produto" /></div> : null}
        <label>Descricao<textarea name="descricao" defaultValue={selectedProduct?.descricao || ""} placeholder="Explique como essa doacao ajuda os animais" /></label>
        <button className="button primary" type="submit" disabled={savingProduct}>{savingProduct ? "Salvando..." : "Salvar produto"}</button>
        {shopMessage ? <p className="login-warning">{shopMessage}</p> : null}
      </form>
    </div>
  );
}

function ShopAdminPreviewLegacy() {
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
