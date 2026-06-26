import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Faça uma Doação",
  description: "Doe para a Focinhos Felizes por PIX, cartão ou checkout Asaas."
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
            <Link className="button donate" href="/doar-itens">Doar item</Link>
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
    </main>
  );
}
