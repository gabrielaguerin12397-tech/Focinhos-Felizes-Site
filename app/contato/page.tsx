import { site } from "@/lib/site";

export const metadata = {
  title: "Contato",
  description: "Fale com a ONG Focinhos Felizes pelo WhatsApp, e-mail ou Instagram."
};

export default function ContactPage() {
  return (
    <main className="page-main">
      <section className="section contact">
        <div>
          <p className="eyebrow">Contato</p>
          <h1 className="page-title">Fale com a Focinhos Felizes.</h1>
          <p><strong>WhatsApp:</strong> {site.whatsappLabel}</p>
          <p><strong>E-mail:</strong> {site.email}</p>
          <p><strong>Instagram:</strong> {site.instagramLabel}</p>
          <div className="map">Mapa / Google Maps</div>
        </div>
        <form className="form">
          <label>Nome<input required name="nome" /></label>
          <label>E-mail<input required type="email" name="email" /></label>
          <label>Mensagem<textarea required name="mensagem" /></label>
          <button className="button primary" type="submit">Enviar mensagem</button>
        </form>
      </section>
    </main>
  );
}
