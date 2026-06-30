import { posts } from "@/lib/data";

export type BlogPost = (typeof posts)[number];

export function getPostSlug(post: BlogPost) {
  return post.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => getPostSlug(post) === slug) || null;
}

export function getPostParagraphs(post: BlogPost) {
  if ("body" in post && post.body) {
    return Array.isArray(post.body) ? post.body : [post.body];
  }

  return [post.content];
}
