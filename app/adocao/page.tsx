import { AdoptionPageClient } from "@/components/adoption-page-client";
import { getAnimals } from "@/lib/animals";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Adoção de cães e gatos em Manaus",
  description: "Conheça cães e gatos disponíveis para adoção responsável em Manaus com a ONG Focinhos Felizes."
};

export default async function AdoptionPage() {
  const animals = await getAnimals();

  return (
    <main className="page-main">
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">Animais para adoção</p><h1 className="page-title">Encontre um novo amigo.</h1></div>
          <p>Cada adoção passa por entrevista, termo de responsabilidade e acompanhamento inicial.</p>
        </div>
        <AdoptionPageClient animals={animals} />
      </section>
    </main>
  );
}
