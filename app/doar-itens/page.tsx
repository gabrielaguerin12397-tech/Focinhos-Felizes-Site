import { DonationShop } from "@/components/donation-shop";
import { getShopProducts } from "@/lib/shop";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Doação por Item",
  description: "Doe ração, vacina, cobertor, vermífugo ou kit higiene para animais acolhidos."
};

export default async function DonationItemsPage() {
  const products = await getShopProducts();

  return (
    <main className="page-main">
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">Doação rápida</p><h1 className="page-title">Escolha um item e transforme em cuidado.</h1></div>
          <p>Funciona como uma lojinha solidária. A integração real será feita por API segura do Asaas.</p>
        </div>
        <DonationShop products={products} />
      </section>
    </main>
  );
}
