export const metadata = {
  title: "Denúncias e Resgate",
  description: "Envie pedidos de resgate e denúncias para avaliação conforme recursos e urgência."
};

export default function RescuePage() {
  return (
    <main className="page-main">
      <section className="section rescue">
        <div><p className="eyebrow">Denúncias e pedidos de resgate</p><h1 className="page-title">Pedidos são avaliados por urgência, recursos e capacidade.</h1><p>A ONG analisa cada caso, mas não consegue garantir acolhimento imediato.</p></div>
        <form className="form compact">
          <label>Localização<input required name="localizacao" /></label>
          <label>Fotos<input type="file" name="fotos" multiple /></label>
          <label>Descrição<textarea required name="descricao" /></label>
          <label>Contato<input required name="contato" /></label>
          <button className="button primary" type="submit">Enviar pedido</button>
        </form>
      </section>
    </main>
  );
}
