import Link from "next/link";
import { animals, donationItems } from "@/lib/data";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <main>
      <section className="hero emotional-hero" aria-label="Página inicial">
        <img className="hero-image" src="/assets/caramel-dog.png" alt="Thor, cachorro resgatado pela Focinhos Felizes" />
        <div className="hero-overlay">
          <p className="eyebrow">Thor ainda espera por uma família</p>
          <h1>Eles não precisam de pena. Precisam de uma chance.</h1>
          <p>Cada adoção abre espaço para um novo resgate. Cada doação vira ração, vacina, abrigo e cuidado para quem ainda não tem para onde ir.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/adocao">Quero adotar</Link>
            <Link className="button donate" href="/doacao#itens">Quero ajudar agora</Link>
            <Link className="button light" href="/cadastro">Receber novidades</Link>
          </div>
          <div className="hero-links">
            <Link href="/doacao#itens">Doar item</Link>
            <Link href="/apadrinhamento">Apadrinhar</Link>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </section>

      <section className="impact-strip">
        <strong>84 animais dependem hoje de ração, cuidados veterinários e lares responsáveis.</strong>
        <span>Um gesto pequeno pode ser o primeiro dia seguro de uma nova história.</span>
      </section>

      <section className="section donation-mini">
        <div className="section-heading">
          <div><p className="eyebrow">Ajude com pouco</p><h2>Escolha um cuidado concreto.</h2></div>
          <p>Para quem não pode adotar agora, a doação por item mostra exatamente como a ajuda chega aos animais.</p>
        </div>
        <div className="mini-donation-grid">
          {donationItems.slice(2).map((item) => (
            <Link key={item.key} href="/doacao#itens"><span>R$ {item.price}</span><strong>{item.name}</strong></Link>
          ))}
        </div>
      </section>

      <section className="section featured-home">
        <div><p className="eyebrow">Animais em destaque</p><h2>Conheça quem está esperando.</h2></div>
        <div className="home-animal-grid">
          {animals.slice(0, 3).map((animal) => (
            <article key={animal.id}>
              <img src={animal.foto} alt={animal.nome} />
              <div><strong>{animal.nome}</strong><span>{animal.personalidade}</span></div>
            </article>
          ))}
        </div>
        <Link className="button primary" href="/adocao">Ver todos para adoção</Link>
      </section>

      <section className="stats-band">
        <article><strong>1.248</strong><span>animais resgatados</span></article>
        <article><strong>936</strong><span>animais adotados</span></article>
        <article><strong>2.410</strong><span>castrações realizadas</span></article>
        <article><strong>84</strong><span>animais acolhidos hoje</span></article>
      </section>
    </main>
  );
}
