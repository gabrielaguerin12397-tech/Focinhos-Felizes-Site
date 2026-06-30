import Link from "next/link";
import { notFound } from "next/navigation";
import { getAnimalBySlug, getAnimalSlug } from "@/lib/animals";
import { site } from "@/lib/site";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

type AnimalPageProps = {
  params: { slug: string };
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

export default async function AnimalProfilePage({ params }: AnimalPageProps) {
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

  return (
    <main className="page-main">
      <article className="section animal-profile-page compact-profile">
        <Link className="button neutral" href="/adocao">Voltar para adoção</Link>
        <div className="animal-profile-hero">
          <img src={animal.foto} alt={`${animal.nome}, ${animal.especie.toLowerCase()} ${animal.cor.toLowerCase()} para adoção em Manaus`} />
          <div className="animal-profile-card">
            <p className="eyebrow">Adoção responsável em Manaus</p>
            <h1 className="page-title">{animal.nome}</h1>
            <p>{animal.personalidade}</p>
            <div className="animal-quick-facts">
              <span>🐾 {animal.especie}</span>
              <span>🎂 {animal.idade}</span>
              <span>📍 {animal.cidade}</span>
              <span>📏 {animal.porte}</span>
              <span>🎨 {animal.cor}</span>
              <span>⚡ {animal.energia}</span>
            </div>
            {healthItems.length ? (
              <div className="animal-health-list" aria-label="Cuidados veterinarios ja realizados">
                {healthItems.map((item) => <span key={item}>✓ {item}</span>)}
              </div>
            ) : null}
            <div className="animal-profile-actions">
              <Link className="button primary" href={`/cadastro?animal=${animal.id}`}>Quero adotar {animal.nome}</Link>
              <a className="button neutral" href={`https://wa.me/55${site.whatsapp}?text=Tenho%20interesse%20em%20adotar%20${encodeURIComponent(animal.nome)}`} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a>
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

        {animal.fotos?.length ? (
          <section className="animal-photo-gallery" aria-label={`Fotos de ${animal.nome}`}>
            {animal.fotos.map((foto, index) => (
              <img key={foto} src={foto} alt={`${animal.nome} para adoção em Manaus - foto ${index + 1}`} />
            ))}
          </section>
        ) : null}

        <section className="animal-story">
          <h2>História de {animal.nome}</h2>
          <p>{animal.historia}</p>
        </section>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
