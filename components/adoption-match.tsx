"use client";

import { useMemo, useState } from "react";
import { animals } from "@/lib/data";
import { getAnimalSlug } from "@/lib/animals";

type Step = "intro" | "especie" | "moradia" | "rotina" | "porte" | "tempoSozinho" | "criancas" | "outrosAnimais" | "experiencia" | "result";
type AdoptionMatchProps = {
  onShowAll: () => void;
};

const questions: Record<Exclude<Step, "intro" | "result">, { text: string; options: string[] }> = {
  especie: {
    text: "Você prefere encontrar um cachorro ou um gatinho?",
    options: ["Sem preferência", "Cão", "Gato"]
  },
  moradia: {
    text: "Primeiro, me conta: onde esse aumigo vai morar?",
    options: ["Apartamento", "Casa com quintal", "Casa sem quintal"]
  },
  rotina: {
    text: "Como é a rotina da casa?",
    options: ["Calma", "Moderada", "Ativa"]
  },
  porte: {
    text: "Você tem preferência de porte?",
    options: ["Sem preferência", "Pequeno", "Médio", "Grande"]
  },
  tempoSozinho: {
    text: "Quanto tempo esse aumigo ficaria sozinho por dia?",
    options: ["Pouco", "Moderado", "Longo"]
  },
  criancas: {
    text: "Tem criança convivendo na casa?",
    options: ["Sim", "Nao", "As vezes"]
  },
  outrosAnimais: {
    text: "Ja existem outros animais na casa?",
    options: ["Sim", "Nao"]
  },
  experiencia: {
    text: "E sua experiência com animais?",
    options: ["Primeira adoção", "Já tive animais", "Tenho animais hoje"]
  }
};

const order: Step[] = ["especie", "moradia", "rotina", "porte", "tempoSozinho", "criancas", "outrosAnimais", "experiencia", "result"];

export function AdoptionMatch({ onShowAll }: AdoptionMatchProps) {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const matches = useMemo(() => {
    return animals
      .map((animal) => {
        let score = 0;
        if (answers.especie === "Sem preferência" || animal.especie === answers.especie) score += 8;
        if (answers.especie && answers.especie !== "Sem preferência" && animal.especie !== answers.especie) score -= 20;
        if (animal.moradia.includes(answers.moradia)) score += 3;
        if (animal.energia === answers.rotina) score += 3;
        if (animal.energia === "Calma" && answers.rotina === "Moderada") score += 1;
        if (animal.energia === "Moderada" && answers.rotina === "Ativa") score += 1;
        if (answers.porte === "Sem preferência" || animal.porte === answers.porte) score += 2;
        if (animal.compatibilidade.tempoSozinho === answers.tempoSozinho) score += 3;
        if (answers.tempoSozinho === "Longo" && animal.compatibilidade.tempoSozinho === "Pouco") score -= 4;
        if (answers.criancas === "Sim" && animal.compatibilidade.criancas === "Sim") score += 3;
        if (answers.criancas === "Sim" && animal.compatibilidade.criancas === "Nao recomendado") score -= 8;
        if (answers.outrosAnimais === "Sim" && animal.compatibilidade.outrosAnimais === "Sim") score += 3;
        if (answers.outrosAnimais === "Sim" && animal.compatibilidade.outrosAnimais === "Com adaptacao") score += 1;
        if (answers.outrosAnimais === "Sim" && animal.compatibilidade.outrosAnimais === "Prefere ser unico") score -= 6;
        if (animal.compatibilidade.experiencia === answers.experiencia) score += 2;
        if (answers.experiencia === "Primeira adoção" && animal.energia === "Calma") score += 2;
        if (answers.experiencia === "Primeira adoção" && animal.energia === "Ativa") score -= 2;
        if (animal.status === "Disponível") score += 1;
        return { animal, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.animal);
  }, [answers]);

  const matchReasons = (animal: (typeof animals)[number]) => {
    const reasons = [];
    if (answers.especie === "Sem preferência" || animal.especie === answers.especie) reasons.push(animal.especie === "Cão" ? "é cachorro" : "é gatinho");
    if (animal.moradia.includes(answers.moradia)) reasons.push(`combina com ${answers.moradia?.toLowerCase()}`);
    if (animal.energia === answers.rotina) reasons.push(`tem energia ${animal.energia.toLowerCase()}`);
    if (answers.porte === "Sem preferência" || animal.porte === answers.porte) reasons.push(`porte ${animal.porte.toLowerCase()}`);
    if (animal.compatibilidade.tempoSozinho === answers.tempoSozinho) reasons.push(`fica bem com tempo sozinho ${answers.tempoSozinho?.toLowerCase()}`);
    return reasons.slice(0, 3).join(", ");
  };

  function answer(value: string) {
    if (step === "intro" || step === "result") return;
    const nextAnswers = { ...answers, [step]: value };
    setAnswers(nextAnswers);
    const nextStep = order[order.indexOf(step) + 1] || "result";
    setStep(nextStep);
  }

  function restart() {
    setAnswers({});
    setStep("especie");
  }

  const currentQuestion = step !== "intro" && step !== "result" ? questions[step] : null;

  return (
    <section className="adoption-helper fred-helper" aria-label="Fred, assistente de adoção">
      <div className="fred-intro">
        <img src="/assets/senior-dog.png" alt="Fred, golden retriever mascote da Focinhos Felizes" />
        <div className="fred-bubble">
          <p className="eyebrow">IA da adoção</p>
          <h2>Oi, eu sou o Fred.</h2>
          <p>Sou o mascote da Focinhos Felizes e gostaria de te ajudar a encontrar um aumigo para adoção.</p>
          <p>Vamos conversar rapidinho?</p>
        </div>
      </div>

      <div className="fred-chat" aria-live="polite">
        {step === "intro" ? (
          <>
            <div className="fred-message">Me responda algumas perguntinhas e eu sugiro o perfil que mais combina com você.</div>
            <button className="button primary" type="button" onClick={() => setStep("especie")}>Conversar com o Fred</button>
            <button className="button neutral" type="button" onClick={onShowAll}>Ver todos os animais disponíveis</button>
          </>
        ) : null}

        {currentQuestion ? (
          <>
            <div className="fred-message">{currentQuestion.text}</div>
            <div className="fred-options">
              {currentQuestion.options.map((option) => (
                <button key={option} type="button" onClick={() => answer(option)}>{option}</button>
              ))}
            </div>
          </>
        ) : null}

        {step === "result" ? (
          <div className="fred-results">
            <div className="fred-message">Esses são os aumigos que acho que vão se encaixar bem na sua rotina.</div>
            <div className="fred-result-list">
              {matches.map((animal) => (
                <article className="fred-result-card" key={animal.id}>
                  <img src={animal.foto} alt={animal.nome} />
                  <div>
                    <p className="eyebrow">Sugestão do Fred</p>
                    <h3>{animal.nome}</h3>
                    <p>{animal.personalidade}</p>
                    <p className="match-reason">Por que indiquei: {matchReasons(animal)}.</p>
                    <a className="button small" href={`/adocao/${getAnimalSlug(animal)}`}>Ver perfil de {animal.nome}</a>
                  </div>
                </article>
              ))}
            </div>
            <div className="fred-result-actions">
              <button className="button neutral" type="button" onClick={restart}>Responder de novo</button>
              <button className="button primary" type="button" onClick={onShowAll}>Ver todos os animais disponíveis</button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
