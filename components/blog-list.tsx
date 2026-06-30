"use client";

import { useState } from "react";
import { posts } from "@/lib/data";

type BlogPost = (typeof posts)[number];

export function BlogList() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="blog-layout">
      <div className="blog-grid">
        {posts.map((post) => (
          <article className="blog-card" key={post.title}>
            <img src={post.image} alt={post.title} />
            <div>
              <span className="blog-category">{post.category}</span>
              <h2>{post.title}</h2>
              <p className="blog-subtitle">{post.subtitle}</p>
              <button className="button small" type="button" onClick={() => setSelectedPost(post)}>
                Ler notícia
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedPost ? (
        <article className="blog-reader">
          <button className="blog-reader-close" type="button" onClick={() => setSelectedPost(null)}>Fechar</button>
          <img src={selectedPost.image} alt={selectedPost.title} />
          <span className="blog-category">{selectedPost.category}</span>
          <h2>{selectedPost.title}</h2>
          <p className="blog-subtitle">{selectedPost.subtitle}</p>
          {"body" in selectedPost && selectedPost.body
            ? Array.isArray(selectedPost.body)
              ? selectedPost.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
              : <p>{selectedPost.body}</p>
            : <p>{selectedPost.content}</p>}
          {"steps" in selectedPost && selectedPost.steps ? (
            <ol>
              {selectedPost.steps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          ) : null}
          {"closing" in selectedPost && selectedPost.closing ? <p>{selectedPost.closing}</p> : null}
        </article>
      ) : (
        <aside className="blog-reader empty">
          <strong>Escolha uma notícia</strong>
          <span>Clique em “Ler notícia” para abrir o conteúdo completo aqui.</span>
        </aside>
      )}
    </div>
  );
}
