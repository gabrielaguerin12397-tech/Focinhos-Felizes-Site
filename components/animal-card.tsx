import Link from "next/link";
import type { Animal } from "@/lib/data";
import { getAnimalSlug } from "@/lib/animals";

export function AnimalCard({ animal, backHref }: { animal: Animal; backHref?: string }) {
  const href = backHref
    ? `/adocao/${getAnimalSlug(animal)}?back=${encodeURIComponent(backHref)}`
    : `/adocao/${getAnimalSlug(animal)}`;

  return (
    <article className="animal-card">
      <div className="animal-card-photo">
        <img src={animal.foto} alt={`${animal.nome}, ${animal.especie.toLowerCase()} para adocao em Manaus`} />
        <span>{animal.especie}</span>
      </div>
      <div className="animal-card-body">
        <div className="animal-card-header">
          <h3>{animal.nome}</h3>
          <span>{animal.status}</span>
        </div>
        <p className="meta">{animal.idade} • {animal.sexo.toLowerCase()} • {animal.porte.toLowerCase()} • {animal.cidade}</p>
        <p className="animal-card-story">{animal.historia}</p>
        <Link className="button small" href={href}>Ver perfil</Link>
      </div>
    </article>
  );
}
