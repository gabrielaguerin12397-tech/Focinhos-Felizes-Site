const projects = ["Castração Solidária", "Resgates", "Educação Animal", "Feiras de Adoção", "Empresa Amiga", "Apadrinhamento"];

export const metadata = {
  title: "Projetos",
  description: "Conheça os projetos da Focinhos Felizes."
};

export default function ProjectsPage() {
  return (
    <main className="page-main">
      <section className="section">
        <div className="section-heading"><div><p className="eyebrow">Projetos</p><h1 className="page-title">Programas que ampliam o impacto.</h1></div><p>Frentes contínuas organizam recursos, voluntários, parceiros e metas.</p></div>
        <div className="project-grid">
          {projects.map((project) => <article key={project}><h3>{project}</h3><p>Ações estruturadas para ampliar cuidado, prevenção e adoções responsáveis.</p></article>)}
        </div>
      </section>
    </main>
  );
}
