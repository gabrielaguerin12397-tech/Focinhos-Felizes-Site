export const metadata = {
  title: "Administração",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return (
    <main className="page-main">
      <section className="admin-login-screen">
        <form className="form admin-login-card">
          <img src="/assets/logo-focinhos-felizes.jpeg" alt="Focinhos Felizes" />
          <p className="eyebrow">Área da equipe</p>
          <h1>Entrar no painel</h1>
          <label>E-mail<input required type="email" defaultValue="admin@focinhosfelizes.ong.br" /></label>
          <label>Senha<input required type="password" defaultValue="focinhos123" /></label>
          <button className="button primary" type="button">Entrar</button>
          <p className="login-hint">Próximo passo: conectar Supabase Auth, banco, storage, Asaas e IA segura.</p>
        </form>
      </section>
      <section className="section admin-shell unlocked">
        <div className="admin-module-grid">
          <button className="module-card active" type="button"><strong>Animais</strong><span>Cadastrar, buscar, editar, fotos e excluir perfis.</span></button>
          <button className="module-card" type="button"><strong>Blog</strong><span>Atualizar notícias, campanhas e dicas.</span></button>
          <button className="module-card" type="button"><strong>Leads</strong><span>Ver cadastros de adotantes e doadores.</span></button>
          <button className="module-card" type="button"><strong>Asaas</strong><span>Configurar links e API de checkout.</span></button>
        </div>
      </section>
    </main>
  );
}
