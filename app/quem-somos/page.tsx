export const metadata = {
  title: "Quem Somos",
  description: "História, missão, visão e valores da ONG Focinhos Felizes."
};

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="section split">
        <div><p className="eyebrow">Quem somos</p><h1 className="page-title">Uma rede de cuidado para animais em vulnerabilidade.</h1><p>A Focinhos Felizes nasceu para dar resposta organizada a situações de abandono, maus-tratos e risco.</p></div>
        <div className="values-grid">
          <article><h3>Missão</h3><p>Proteger animais e promover adoções responsáveis.</p></article>
          <article><h3>Visão</h3><p>Ser referência local em bem-estar animal e participação comunitária.</p></article>
          <article><h3>Valores</h3><p>Respeito, ética, prestação de contas, empatia e responsabilidade.</p></article>
          <article><h3>Transparência</h3><p>Relatórios, receitas, despesas, projetos e parceiros publicados.</p></article>
        </div>
      </section>
    </main>
  );
}
