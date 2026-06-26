export const metadata = {
  title: "Quero Ajudar",
  description: "Cadastre-se para adotar, doar, apadrinhar ou acompanhar campanhas da Focinhos Felizes."
};

export default function LeadPage() {
  return (
    <main className="page-main">
      <section className="section lead-page">
        <div>
          <p className="eyebrow">Entre no nosso funil de cuidado</p>
          <h1 className="page-title">Conte como você quer ajudar.</h1>
          <p>Com seu cadastro, a ONG pode enviar oportunidades certas para você: animais para adoção, campanhas de ração, apadrinhamento e prestação de contas.</p>
          <div className="lead-benefits">
            <article><strong>Adoção</strong><span>Receba perfis compatíveis com sua realidade.</span></article>
            <article><strong>Doação</strong><span>Saiba quando faltar ração, vacina ou medicamento.</span></article>
            <article><strong>Apadrinhamento</strong><span>Acompanhe animais que precisam de apoio mensal.</span></article>
          </div>
        </div>
        <form className="form lead-form">
          <h2>Cadastro de apoiador</h2>
          <label>Nome completo<input required name="nome" /></label>
          <label>WhatsApp<input required name="whatsapp" placeholder="(92) 98570-1881" /></label>
          <label>E-mail<input required type="email" name="email" /></label>
          <label>Cidade<input required name="cidade" /></label>
          <label>Como quer ajudar?<select name="interesse"><option>Quero adotar</option><option>Quero doar itens</option><option>Quero apadrinhar</option><option>Quero receber campanhas</option></select></label>
          <label>Observação<textarea name="observacao" /></label>
          <label className="consent-check"><input required type="checkbox" /> Autorizo contato sobre adoção, doações, apadrinhamento e campanhas.</label>
          <button className="button primary" type="submit">Enviar cadastro</button>
        </form>
      </section>
    </main>
  );
}
