import { posts } from "@/lib/data";

export const metadata = {
  title: "Blog e Notícias",
  description: "Resgates, adoções, campanhas, eventos e dicas de cuidado animal."
};

export default function BlogPage() {
  return (
    <main className="page-main">
      <section className="section news-events">
        <div>
          <p className="eyebrow">Blog e notícias</p>
          <h1 className="page-title">Últimas campanhas e histórias.</h1>
          {posts.map((post) => (
            <article key={post.title}><strong>{post.title}</strong><span>{post.summary}</span></article>
          ))}
        </div>
      </section>
    </main>
  );
}
