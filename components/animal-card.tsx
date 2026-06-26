import Link from "next/link";
import type { Animal } from "@/lib/data";

export function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <article className="animal-card">
      <img src={animal.foto} alt={`${animal.nome}, ${animal.especie.toLowerCase()} para adoção`} />
      <div>
        <h3>{animal.nome}</h3>
        <p className="meta">{animal.idade} • {animal.sexo.toLowerCase()} • {animal.porte.toLowerCase()}</p>
        <ul>
          <li>{animal.castrado ? "Castrado" : "Castração a programar"}, {animal.vacinado ? "vacinado" : "vacinas em andamento"} e {animal.vermifugado ? "vermifugado" : "vermifugação em andamento"}</li>
          <li>{animal.personalidade}</li>
        </ul>
        <p>{animal.historia}</p>
        <Link className="button small" href="/cadastro">Quero adotar</Link>
      </div>
    </article>
  );
}
