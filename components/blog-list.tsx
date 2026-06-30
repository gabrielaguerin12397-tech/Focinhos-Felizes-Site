import Link from "next/link";
import { posts } from "@/lib/data";
import { getPostSlug } from "@/lib/blog";

export function BlogList() {
  return (
    <div className="blog-grid">
      {posts.map((post) => (
        <article className="blog-card" key={post.title}>
          <img src={post.image} alt={post.title} />
          <div>
            <span className="blog-category">{post.category}</span>
            <h2>{post.title}</h2>
            <p className="blog-subtitle">{post.subtitle}</p>
            <Link className="button small" href={`/blog/${getPostSlug(post)}`}>
              Ler notícia
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
