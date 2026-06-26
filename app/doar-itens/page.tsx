import { DonationShop } from "@/components/donation-shop";

export const metadata = {
  title: "Doação por Item",
  description: "Doe ração, vacina, cobertor, vermífugo ou kit higiene para animais acolhidos."
};

export default function DonationItemsPage() {
  return (
    <main className="page-main">
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">Doação rápida</p><h1 className="page-title">Escolha um item e transforme em cuidado.</h1></div>
          <p>Funciona como uma lojinha solidária. A integração real será feita por API segura do Asaas.</p>
        </div>
        <DonationShop />
      </section>
    </main>
  );
}
