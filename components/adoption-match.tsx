"use client";

import { useState } from "react";
import { animals } from "@/lib/data";

export function AdoptionMatch() {
  const [match, setMatch] = useState(animals[0]);
  const [answered, setAnswered] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const moradia = String(data.get("moradia"));
    const rotina = String(data.get("rotina"));
    const porte = String(data.get("porte"));
    const experiencia = String(data.get("experiencia"));

    const scored = animals
      .map((animal) => {
        let score = 0;
        if (animal.moradia.includes(moradia)) score += 3;
        if (animal.energia === rotina) score += 3;
        if (porte === "Sem preferência" || animal.porte === porte) score += 2;
        if (experiencia === "Primeira adoção" && animal.energia === "Calma") score += 1;
        if (animal.status === "Disponível") score += 1;
        return { animal, score };
      })
      .sort((a, b) => b.score - a.score);

    setMatch(scored[0].animal);
    setAnswered(true);
  }

  return (
    <section className="adoption-helper fred-helper" aria-label="Fred, assistente de adoção">
      <div className="fred-intro">
        <img src="/assets/senior-dog.png" alt="Fred, golden retriever mascote da Focinhos Felizes" />
        <div className="fred-bubble">
          <p className="eyebrow">IA da adoção</p>
          <h2>Oi, eu sou o Fred.</h2>
          <p>Sou o mascote da Focinhos Felizes e gostaria de te ajudar a encontrar um aumigo para adoção.</p>
          <p>Me conte um pouco da sua rotina e eu sugiro um perfil que combine com você.</p>
        </div>
      </div>

      <form className="match-form" onSubmit={onSubmit}>
        <label>Onde você mora?<select name="moradia"><option>Apartamento</option><option>Casa com quintal</option><option>Casa sem quintal</option></select></label>
        <label>Rotina da família<select name="rotina"><option>Calma</option><option>Moderada</option><option>Ativa</option></select></label>
        <label>Porte preferido<select name="porte"><option>Sem preferência</option><option>Pequeno</option><option>Médio</option><option>Grande</option></select></label>
        <label>Experiência<select name="experiencia"><option>Primeira adoção</option><option>Já tive animais</option><option>Tenho animais hoje</option></select></label>
        <button className="button primary" type="submit">Fred, encontre meu aumigo</button>
      </form>

      <div className="match-result fred-result">
        <img src={match.foto} alt={match.nome} />
        <div>
          <strong>{answered ? `Fred indica: ${match.nome}` : "Primeira sugestão do Fred"}</strong>
          <span>{match.personalidade}</span>
          <a className="button small" href={`/cadastro?animal=${match.id}`}>Quero conversar sobre {match.nome}</a>
        </div>
      </div>
    </section>
  );
}
