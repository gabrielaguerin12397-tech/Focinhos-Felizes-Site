import { notFound } from "next/navigation";
import { DonationShop } from "@/components/donation-shop";
import { getShopProductByKey, getShopProducts } from "@/lib/shop";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProductPageProps = {
  params: { key: string };
};

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getShopProductByKey(params.key);
  if (!product) return {};

  return {
    title: `${product.name} | Doacao Focinhos Felizes`,
    description: product.description,
    alternates: {
      canonical: `${site.url}/doacao/${product.key}`
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image]
    }
  };
}

export default async function DonationProductPage({ params }: ProductPageProps) {
  const [products, product] = await Promise.all([getShopProducts(), getShopProductByKey(params.key)]);

  if (!product) notFound();

  return (
    <main className="page-main">
      <section className="section" id="lojinha">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Lojinha solidaria</p>
            <h1 className="page-title">Doar {product.name}</h1>
          </div>
          <p>{product.description}</p>
        </div>
        <DonationShop products={products} initialItemKey={product.key} />
      </section>
    </main>
  );
}
