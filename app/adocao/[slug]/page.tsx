import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimalPhotoViewer } from "@/components/animal-photo-viewer";
import { getAnimalBySlug, getAnimalSlug } from "@/lib/animals";
import { site } from "@/lib/site";

export const dynamicParams = true;
export const dynamic = "force-dynamic";
export const revalidate = 0;

type AnimalPageProps = {
  params: { slug: string };
  searchParams?: { back?: string };
};

export async function generateMetadata({ params }: AnimalPageProps) {
  const animal = await getAnimalBySlug(params.slug);

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

export default async function AnimalProfilePage({ params, searchParams }: AnimalPageProps) {
  const animal = await getAnimalBySlug(params.slug);

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
  const healthItems = [
    animal.castrado ? "Castrado" : "",
    animal.vacinado ? "Vacinado" : "",
    animal.vermifugado ? "Vermifugado" : ""
  ].filter(Boolean);
  const backHref = searchParams?.back?.startsWith("/adocao") ? searchParams.back : "/adocao?ver=todos";

  return (
    <main className="page-main">
      <article className="section animal-profile-page compact-profile">
        <Link className="button neutral" href={backHref}>Voltar para adoção</Link>
        <div className="animal-profile-hero">
          <img src={animal.foto} alt={`${animal.nome}, ${animal.especie.toLowerCase()} ${animal.cor.toLowerCase()} para adoção em Manaus`} />
          <div className="animal-profile-card">
            <p className="eyebrow">Adoção responsável em Manaus</p>
            <h1 className="page-title">{animal.nome}</h1>
            <p>{animal.personalidade}</p>
            <div className="animal-quick-facts">
              <span>Pet: {animal.especie}</span>
              <span>Idade: {animal.idade}</span>
              <span>Cidade: {animal.cidade}</span>
              <span>Porte: {animal.porte}</span>
              <span>Cor: {animal.cor}</span>
              <span>Energia: {animal.energia}</span>
            </div>
            {healthItems.length ? (
              <div className="animal-health-list" aria-label="Cuidados veterinarios ja realizados">
                {healthItems.map((item) => <span key={item}>✓ {item}</span>)}
              </div>
            ) : null}
            <div className="animal-profile-actions">
              <a className="button primary" href={`https://wa.me/55${site.whatsapp}?text=Tenho%20interesse%20em%20adotar%20${encodeURIComponent(animal.nome)}`} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a>
            </div>
          </div>
        </div>

        <section className="animal-profile-grid compact" aria-label={`Informações de ${animal.nome}`}>
          <div><strong>Espécie</strong><span>{animal.especie}</span></div>
          <div><strong>Idade</strong><span>{animal.idade}</span></div>
          <div><strong>Sexo</strong><span>{animal.sexo}</span></div>
          <div><strong>Porte</strong><span>{animal.porte}</span></div>
          <div><strong>Cor do pelo</strong><span>{animal.cor}</span></div>
          <div><strong>Cidade</strong><span>{animal.cidade}</span></div>
        </section>

        <AnimalPhotoViewer animalName={animal.nome} photos={animal.fotos?.length ? animal.fotos : [animal.foto]} />

        <section className="animal-story">
          <h2>História de {animal.nome}</h2>
          <p>{animal.historia}</p>
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
