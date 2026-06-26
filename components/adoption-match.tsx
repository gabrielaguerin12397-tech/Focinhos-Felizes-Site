"use client";

import { useState } from "react";
import { animals } from "@/lib/data";

export function AdoptionMatch() {
  const [match, setMatch] = useState(animals[0]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const moradia = String(data.get("moradia"));
    const rotina = String(data.get("rotina"));
    const porte = String(data.get("porte"));

    const scored = animals
      .map((animal) => {
        let score = 0;
        if (animal.moradia.includes(moradia)) score += 2;
        if (animal.energia === rotina) score += 2;
        if (porte === "Sem preferência" || animal.porte === porte) score += 2;
        if (animal.status === "Disponível") score += 1;
        return { animal, score };
      })
      .sort((a, b) => b.score - a.score);

    setMatch(scored[0].animal);
  }

  return (
    <section className="adoption-helper" aria-label="Ajuda inteligente para adoção">
      <div>
        <p className="eyebrow">IA da adoção</p>
        <h2>Quer ajuda para encontrar um aumigo ideal?</h2>
        <p>Responda algumas preferências e a IA sugere perfis que combinam com sua rotina.</p>
      </div>
      <form className="match-form" onSubmit={onSubmit}>
        <label>Onde você mora?<select name="moradia"><option>Apartamento</option><option>Casa com quintal</option><option>Casa sem quintal</option></select></label>
        <label>Rotina da família<select name="rotina"><option>Calma</option><option>Moderada</option><option>Ativa</option></select></label>
        <label>Porte preferido<select name="porte"><option>Sem preferência</option><option>Pequeno</option><option>Médio</option><option>Grande</option></select></label>
        <button className="button primary" type="submit">Encontrar aumigo</button>
      </form>
      <div className="match-result">
        <strong>Perfil sugerido: {match.nome}</strong>
        <span>{match.personalidade}</span>
        <a className="button small" href={`/cadastro?animal=${match.id}`}>Quero conversar sobre {match.nome}</a>
      </div>
    </section>
  );
}
