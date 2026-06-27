import Link from "next/link";
import { DonationShop } from "@/components/donation-shop";
import { site } from "@/lib/site";

export const metadata = {
  title: "Faça uma Doação",
  description: "Doe para a Focinhos Felizes por PIX, cartão, checkout Asaas ou itens solidários."
};

export default function DonationPage() {
  return (
    <main className="page-main">
      <section className="section donation">
        <div>
          <p className="eyebrow">Faça uma doação</p>
          <h1 className="page-title">Sua contribuição vira alimento, atendimento veterinário e novas chances.</h1>
          <p>Doe pelo checkout seguro do Asaas, por PIX ou escolha um item específico.</p>
          <div className="use-list"><span>Ração e sachês</span><span>Vacinas</span><span>Castrações</span><span>Exames</span></div>
          <div className="hero-actions donation-actions">
            <Link className="button donate" href="#itens">Doar item</Link>
            <Link className="button primary" href="/cadastro">Quero ajudar</Link>
          </div>
        </div>
        <aside className="donation-box">
          <h3>Dados de doação</h3>
          <p><strong>WhatsApp:</strong> {site.whatsappLabel}</p>
          <p><strong>PIX:</strong> doacoes@focinhosfelizes.ong.br</p>
          <p><strong>Checkout:</strong> link do Asaas configurável no painel Admin.</p>
          <div className="qr">PIX</div>
        </aside>
      </section>

      <section className="section" id="itens">
        <div className="section-heading">
          <div><p className="eyebrow">Doação por item</p><h2>Escolha um cuidado concreto.</h2></div>
          <p>Funciona como uma lojinha solidária: ração, vacina, cobertor, vermífugo e outros itens essenciais.</p>
        </div>
        <DonationShop />
      </section>
    </main>
  );
}
