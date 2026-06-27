import Link from "next/link";
import { DonationShop } from "@/components/donation-shop";
import { site } from "@/lib/site";

export const metadata = {
  title: "Doações",
  description: "Doe para a Focinhos Felizes por PIX, cartão, checkout Asaas ou itens solidários."
};

export default function DonationPage() {
  return (
    <main className="page-main">
      <section className="donation-hero">
        <img src="/assets/hero-rescue.png" alt="Animal acolhido pela Focinhos Felizes" />
        <div className="donation-hero-content">
          <p className="eyebrow">Doações</p>
          <h1>Cada item comprado aqui vira cuidado real.</h1>
          <p>Ração, vacina, cobertor e apoio mensal mantêm os animais seguros enquanto eles esperam uma família.</p>
          <div className="hero-actions donation-actions">
            <Link className="button donate" href="#lojinha">Quero doar</Link>
            <Link className="button primary" href="/cadastro">Quero ajudar</Link>
          </div>
        </div>
      </section>

      <section className="section donation-impact">
        <div className="section-heading">
          <div><p className="eyebrow">Para onde vai</p><h2>Uma doação pequena resolve uma necessidade concreta.</h2></div>
          <p>A pessoa escolhe o item, monta o carrinho e finaliza pelo checkout seguro do Asaas.</p>
        </div>
        <div className="impact-cards">
          <article><img src="/assets/donation-food.png" alt="Ração" /><strong>Alimentação</strong><span>Ração e sachês para a rotina dos acolhidos.</span></article>
          <article><img src="/assets/donation-vaccine.png" alt="Vacina" /><strong>Saúde</strong><span>Vacinas, vermífugos, exames e medicamentos.</span></article>
          <article><img src="/assets/donation-blanket.png" alt="Cobertor" /><strong>Conforto</strong><span>Cobertores e itens de recuperação pós-resgate.</span></article>
        </div>
      </section>

      <section className="section" id="lojinha">
        <div className="section-heading">
          <div><p className="eyebrow">Lojinha solidária</p><h2>Escolha os itens e finalize no carrinho.</h2></div>
          <p>Você também pode escolher uma doação mensal recorrente para apoiar a ONG todos os meses.</p>
        </div>
        <DonationShop />
      </section>

      <section className="section donation-info">
        <aside className="donation-box">
          <h3>Outras formas de doar</h3>
          <p><strong>WhatsApp:</strong> {site.whatsappLabel}</p>
          <p><strong>PIX:</strong> doacoes@focinhosfelizes.ong.br</p>
          <p><strong>Checkout:</strong> os produtos da lojinha serão finalizados pelo Asaas.</p>
          <div className="qr">PIX</div>
        </aside>
      </section>
    </main>
  );
}
