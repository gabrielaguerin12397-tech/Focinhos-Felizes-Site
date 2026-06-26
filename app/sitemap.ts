import { site } from "@/lib/site";

const routes = ["", "/adocao", "/doar-itens", "/doacao", "/cadastro", "/apadrinhamento", "/transparencia", "/blog", "/eventos", "/contato"];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));
}
