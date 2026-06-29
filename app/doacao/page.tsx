import { DonationShop } from "@/components/donation-shop";

export const metadata = {
  title: "Doações",
  description: "Doe para a Focinhos Felizes pela lojinha solidária com checkout Asaas."
};

export default function DonationPage() {
  return (
    <main className="page-main">
      <section className="section" id="lojinha">
        <div className="section-heading">
          <div><p className="eyebrow">Lojinha solidária</p><h1 className="page-title">Escolha os itens e finalize no carrinho.</h1></div>
          <p>Adicione ração, vacina, cobertor, itens de cuidado ou uma doação mensal recorrente.</p>
        </div>
        <DonationShop />
      </section>
    </main>
  );
}
