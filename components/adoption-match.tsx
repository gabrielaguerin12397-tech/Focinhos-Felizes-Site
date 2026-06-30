"use client";

import { useMemo, useState } from "react";
import type { Animal } from "@/lib/data";
import { getAnimalSlug } from "@/lib/animals";

type Step = "intro" | "especie" | "moradia" | "rotina" | "porte" | "tempoSozinho" | "criancas" | "outrosAnimais" | "experiencia" | "result";

type AdoptionMatchProps = {
  animals: Animal[];
  onShowAll: () => void;
};

const questions: Record<Exclude<Step, "intro" | "result">, { text: string; options: string[] }> = {
  especie: {
    text: "Voce prefere encontrar um cachorro ou um gatinho?",
    options: ["Sem preferencia", "Cao", "Gato"]
  },
  moradia: {
    text: "Onde esse aumigo vai morar?",
    options: ["Apartamento", "Casa com quintal", "Casa sem quintal"]
  },
  rotina: {
    text: "Como e a rotina da casa?",
    options: ["Calma", "Moderada", "Ativa"]
  },
  porte: {
    text: "Voce tem preferencia de porte?",
    options: ["Sem preferencia", "Pequeno", "Medio", "Grande"]
  },
  tempoSozinho: {
    text: "Quanto tempo esse aumigo ficaria sozinho por dia?",
    options: ["Pouco", "Moderado", "Longo"]
  },
  criancas: {
    text: "Tem crianca convivendo na casa?",
    options: ["Sim", "Nao", "As vezes"]
  },
  outrosAnimais: {
    text: "Ja existem outros animais na casa?",
    options: ["Sim", "Nao"]
  },
  experiencia: {
    text: "E sua experiencia com animais?",
    options: ["Primeira adocao", "Ja tive animais", "Tenho animais hoje"]
  }
};

const order: Step[] = ["especie", "moradia", "rotina", "porte", "tempoSozinho", "criancas", "outrosAnimais", "experiencia", "result"];

function normalize(value: string | undefined) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function AdoptionMatch({ animals, onShowAll }: AdoptionMatchProps) {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const matches = useMemo(() => {
    return animals
      .map((animal) => {
        let score = 0;
        if (answers.especie === "Sem preferencia" || normalize(animal.especie) === normalize(answers.especie)) score += 8;
        if (answers.especie && answers.especie !== "Sem preferencia" && normalize(animal.especie) !== normalize(answers.especie)) score -= 20;
        if (animal.moradia.some((item) => normalize(item) === normalize(answers.moradia))) score += 3;
        if (normalize(animal.energia) === normalize(answers.rotina)) score += 3;
        if (animal.energia === "Calma" && answers.rotina === "Moderada") score += 1;
        if (normalize(animal.energia) === "moderada" && answers.rotina === "Ativa") score += 1;
        if (answers.porte === "Sem preferencia" || normalize(animal.porte) === normalize(answers.porte)) score += 2;
        if (normalize(animal.compatibilidade.tempoSozinho) === normalize(answers.tempoSozinho)) score += 3;
        if (answers.tempoSozinho === "Longo" && animal.compatibilidade.tempoSozinho === "Pouco") score -= 4;
        if (answers.criancas === "Sim" && animal.compatibilidade.criancas === "Sim") score += 3;
        if (answers.criancas === "Sim" && normalize(animal.compatibilidade.criancas).includes("nao recomendado")) score -= 8;
        if (answers.outrosAnimais === "Sim" && animal.compatibilidade.outrosAnimais === "Sim") score += 3;
        if (answers.outrosAnimais === "Sim" && normalize(animal.compatibilidade.outrosAnimais).includes("adapt")) score += 1;
        if (answers.outrosAnimais === "Sim" && normalize(animal.compatibilidade.outrosAnimais).includes("unico")) score -= 6;
        if (normalize(animal.compatibilidade.experiencia) === normalize(answers.experiencia)) score += 2;
        if (answers.experiencia === "Primeira adocao" && animal.energia === "Calma") score += 2;
        if (answers.experiencia === "Primeira adocao" && animal.energia === "Ativa") score -= 2;
        if (normalize(animal.status).includes("dispon")) score += 1;
        return { animal, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.animal);
  }, [animals, answers]);

  const matchReasons = (animal: Animal) => {
    const reasons = [];
    if (answers.especie === "Sem preferencia" || normalize(animal.especie) === normalize(answers.especie)) reasons.push(normalize(animal.especie).includes("cao") ? "e cachorro" : "e gatinho");
    if (animal.moradia.some((item) => normalize(item) === normalize(answers.moradia))) reasons.push(`combina com ${answers.moradia?.toLowerCase()}`);
    if (normalize(animal.energia) === normalize(answers.rotina)) reasons.push(`tem energia ${animal.energia.toLowerCase()}`);
    if (answers.porte === "Sem preferencia" || normalize(animal.porte) === normalize(answers.porte)) reasons.push(`porte ${animal.porte.toLowerCase()}`);
    if (normalize(animal.compatibilidade.tempoSozinho) === normalize(answers.tempoSozinho)) reasons.push(`fica bem com tempo sozinho ${answers.tempoSozinho?.toLowerCase()}`);
    return reasons.slice(0, 3).join(", ");
  };

  function answer(value: string) {
    if (step === "intro" || step === "result") return;
    setAnswers((current) => ({ ...current, [step]: value }));
    setStep(order[order.indexOf(step) + 1] || "result");
  }

  function restart() {
    setAnswers({});
    setStep("especie");
  }

  const currentQuestion = step !== "intro" && step !== "result" ? questions[step] : null;

  return (
    <section className="fred-stage" aria-label="Fred, assistente de adocao">
      <div className="fred-conversation">
        <img src="/assets/senior-dog.png" alt="Fred, golden retriever mascote da Focinhos Felizes" />
        <div className="fred-bubble fred-live-bubble" aria-live="polite">
          <h2>Oi, eu sou o Fred.</h2>

          {step === "intro" ? (
            <>
              <p>Eu posso conversar com voce e ajudar a encontrar um aumigo que combine com sua rotina.</p>
              <div className="fred-options in-bubble">
                <button type="button" onClick={() => setStep("especie")}>Quero conversar com o Fred</button>
                <button type="button" onClick={onShowAll}>Ver todos os animais disponiveis</button>
              </div>
            </>
          ) : null}

          {currentQuestion ? (
            <>
              <p className="fred-question">{currentQuestion.text}</p>
              <div className="fred-options in-bubble">
                {currentQuestion.options.map((option) => (
                  <button key={option} type="button" onClick={() => answer(option)}>{option}</button>
                ))}
              </div>
            </>
          ) : null}

          {step === "result" ? (
            <div className="fred-results">
              <p className="fred-question">Esses sao os aumigos que acho que vao se encaixar bem na sua rotina.</p>
              {matches.length ? (
                <div className="fred-result-list">
                  {matches.map((animal) => (
                    <article className="fred-result-card" key={animal.id}>
                      <img src={animal.foto} alt={animal.nome} />
                      <div>
                        <h3>{animal.nome}</h3>
                        <p>{animal.personalidade}</p>
                        <p className="match-reason">Por que indiquei: {matchReasons(animal)}.</p>
                        <a className="button small" href={`/adocao/${getAnimalSlug(animal)}`}>Ver perfil de {animal.nome}</a>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p>Ainda nao encontrei animais cadastrados para sugerir.</p>
              )}
              <div className="fred-options in-bubble">
                <button type="button" onClick={restart}>Responder de novo</button>
                <button type="button" onClick={onShowAll}>Ver todos os animais disponiveis</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
