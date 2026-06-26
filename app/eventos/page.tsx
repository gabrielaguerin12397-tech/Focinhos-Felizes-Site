export const metadata = {
  title: "Eventos",
  description: "Calendário de feiras, bazares, mutirões e campanhas beneficentes."
};

export default function EventsPage() {
  return (
    <main className="page-main">
      <section className="section news-events">
        <div><p className="eyebrow">Eventos</p><h1 className="page-title">Calendário de ações.</h1>
          <article><strong>29/06</strong><span>Feira de adoção no Parque Central</span></article>
          <article><strong>06/07</strong><span>Bazar beneficente</span></article>
          <article><strong>13/07</strong><span>Campanha de arrecadação de ração</span></article>
        </div>
      </section>
    </main>
  );
}
