import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/data";
import { getPostBySlug, getPostParagraphs, getPostSlug } from "@/lib/blog";

type BlogPostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: getPostSlug(post) }));
}

export function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.subtitle
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <main className="page-main">
      <article className="section blog-article">
        <Link className="button neutral" href="/blog">Voltar para o blog</Link>
        <img className="blog-article-image" src={post.image} alt={post.title} />
        <span className="blog-category">{post.category}</span>
        <h1 className="page-title">{post.title}</h1>
        <p className="blog-article-subtitle">{post.subtitle}</p>

        <div className="blog-article-body">
          {getPostParagraphs(post).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {"steps" in post && post.steps ? (
            <ol>
              {post.steps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          ) : null}

          {"closing" in post && post.closing ? <p>{post.closing}</p> : null}
        </div>
      </article>
    </main>
  );
}
