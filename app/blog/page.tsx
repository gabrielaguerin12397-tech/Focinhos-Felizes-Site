import { BlogList } from "@/components/blog-list";

export const metadata = {
  title: "Blog e Notícias",
  description: "Resgates, adoções, campanhas, eventos e dicas de cuidado animal."
};

export default function BlogPage() {
  return (
    <main className="page-main">
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">Blog e notícias</p><h1 className="page-title">Campanhas, histórias e dicas.</h1></div>
          <p>Veja as últimas publicações da Focinhos Felizes. Clique para ler a notícia completa.</p>
        </div>
        <BlogList />
      </section>
    </main>
  );
}
