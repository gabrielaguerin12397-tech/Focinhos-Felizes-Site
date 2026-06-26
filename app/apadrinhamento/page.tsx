export const metadata = {
  title: "Apadrinhamento",
  description: "Apadrinhe mensalmente um animal acolhido pela Focinhos Felizes."
};

export default function SponsorPage() {
  return (
    <main className="page-main">
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">Apadrinhamento</p><h1 className="page-title">Ajude mensalmente um animal acolhido.</h1></div>
          <p>O padrinho contribui com alimentação, medicamentos, vacinas, exames e cuidados diários.</p>
        </div>
        <div className="sponsor-list">
          {["Thor - R$ 60/mês", "Luna - R$ 45/mês", "Nico - R$ 90/mês"].map((item) => (
            <article key={item}><span>{item.split(" - ")[0]}</span><strong>{item.split(" - ")[1]}</strong><button className="button donate" type="button">Apadrinhar</button></article>
          ))}
        </div>
      </section>
    </main>
  );
}
