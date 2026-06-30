import { AdoptionPageClient } from "@/components/adoption-page-client";

export const metadata = {
  title: "Adoção de cães e gatos em Manaus",
  description: "Conheça cães e gatos disponíveis para adoção responsável em Manaus com a ONG Focinhos Felizes."
};

export default function AdoptionPage() {
  return (
    <main className="page-main">
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">Animais para adoção</p><h1 className="page-title">Encontre um novo amigo.</h1></div>
          <p>Cada adoção passa por entrevista, termo de responsabilidade e acompanhamento inicial.</p>
        </div>
        <AdoptionPageClient />
      </section>
    </main>
  );
}
