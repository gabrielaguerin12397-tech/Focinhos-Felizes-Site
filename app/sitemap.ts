import { animals, posts } from "@/lib/data";
import { getAnimalSlug } from "@/lib/animals";
import { getPostSlug } from "@/lib/blog";
import { site } from "@/lib/site";

const routes = ["", "/adocao", "/doacao", "/cadastro", "/apadrinhamento", "/blog", "/eventos"];

export default function sitemap() {
  const staticRoutes = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));

  const animalRoutes = animals.map((animal) => ({
    url: `${site.url}/adocao/${getAnimalSlug(animal)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${site.url}/blog/${getPostSlug(post)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));

  return [...staticRoutes, ...animalRoutes, ...blogRoutes];
}
