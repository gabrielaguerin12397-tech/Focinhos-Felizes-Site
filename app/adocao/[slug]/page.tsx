import Link from "next/link";
import { notFound } from "next/navigation";
import { animals } from "@/lib/data";
import { getAnimalBySlug, getAnimalSlug } from "@/lib/animals";
import { site } from "@/lib/site";

type AnimalPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return animals.map((animal) => ({ slug: getAnimalSlug(animal) }));
}

export function generateMetadata({ params }: AnimalPageProps) {
  const animal = getAnimalBySlug(params.slug);

  if (!animal) return {};

  const especie = animal.especie === "Cão" ? "cachorro" : "gato";

  return {
    title: `${animal.nome} para adoção em Manaus | Focinhos Felizes`,
    description: `${animal.nome} é um ${especie} ${animal.cor.toLowerCase()}, ${animal.porte.toLowerCase()}, ${animal.idade}, disponível para adoção responsável em Manaus.`,
    alternates: {
      canonical: `${site.url}/adocao/${getAnimalSlug(animal)}`
    },
    openGraph: {
      title: `${animal.nome} para adoção em Manaus`,
      description: animal.personalidade,
      images: [animal.foto],
      type: "article"
    }
  };
}

export default function AnimalProfilePage({ params }: AnimalPageProps) {
  const animal = getAnimalBySlug(params.slug);

  if (!animal) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${animal.nome} para adoção em Manaus`,
    description: animal.historia,
    url: `${site.url}/adocao/${getAnimalSlug(animal)}`,
    image: `${site.url}${animal.foto}`,
    about: {
      "@type": "AnimalShelter",
      name: site.name,
      url: site.url,
      areaServed: "Manaus, AM"
    }
  };

  return (
    <main className="page-main">
      <article className="section animal-profile-page">
        <Link className="button neutral" href="/adocao">Voltar para adoção</Link>
        <div className="animal-profile-hero">
          <img src={animal.foto} alt={`${animal.nome}, ${animal.especie.toLowerCase()} ${animal.cor.toLowerCase()} para adoção em Manaus`} />
          <div>
            <p className="eyebrow">Adoção responsável em Manaus</p>
            <h1 className="page-title">{animal.nome}</h1>
            <p>{animal.personalidade}</p>
            <div className="animal-profile-actions">
              <Link className="button primary" href={`/cadastro?animal=${animal.id}`}>Quero adotar {animal.nome}</Link>
              <a className="button neutral" href={`https://wa.me/55${site.whatsapp}?text=Tenho%20interesse%20em%20adotar%20${encodeURIComponent(animal.nome)}`} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a>
            </div>
          </div>
        </div>

        <section className="animal-profile-grid" aria-label={`Informações de ${animal.nome}`}>
          <div><strong>Espécie</strong><span>{animal.especie}</span></div>
          <div><strong>Idade</strong><span>{animal.idade}</span></div>
          <div><strong>Sexo</strong><span>{animal.sexo}</span></div>
          <div><strong>Porte</strong><span>{animal.porte}</span></div>
          <div><strong>Cor do pelo</strong><span>{animal.cor}</span></div>
          <div><strong>Cidade</strong><span>{animal.cidade}</span></div>
          <div><strong>Castração</strong><span>{animal.castrado ? "Castrado" : "A programar"}</span></div>
          <div><strong>Vacinas</strong><span>{animal.vacinado ? "Vacinado" : "Em andamento"}</span></div>
          <div><strong>Vermifugação</strong><span>{animal.vermifugado ? "Vermifugado" : "Em andamento"}</span></div>
        </section>

        <section className="animal-story">
          <h2>História de {animal.nome}</h2>
          <p>{animal.historia}</p>
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
