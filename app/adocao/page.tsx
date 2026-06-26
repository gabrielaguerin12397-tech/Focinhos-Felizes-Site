import { animals } from "@/lib/data";
import { AnimalCard } from "@/components/animal-card";
import { AdoptionMatch } from "@/components/adoption-match";

export const metadata = {
  title: "Animais para Adoção",
  description: "Conheça cães e gatos disponíveis para adoção responsável na ONG Focinhos Felizes."
};

export default function AdoptionPage() {
  return (
    <main className="page-main">
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">Animais para adoção</p><h1 className="page-title">Encontre um novo amigo.</h1></div>
          <p>Cada adoção passa por entrevista, termo de responsabilidade e acompanhamento inicial.</p>
        </div>
        <AdoptionMatch />
        <div className="animal-grid">
          {animals.map((animal) => <AnimalCard key={animal.id} animal={animal} />)}
        </div>
      </section>
    </main>
  );
}
