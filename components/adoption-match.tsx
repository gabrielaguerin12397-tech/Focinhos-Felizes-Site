"use client";

import { useMemo, useState } from "react";
import { animals } from "@/lib/data";

type Step = "intro" | "moradia" | "rotina" | "porte" | "experiencia" | "result";

const questions: Record<Exclude<Step, "intro" | "result">, { text: string; options: string[] }> = {
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
  experiencia: {
    text: "E sua experiência com animais?",
    options: ["Primeira adoção", "Já tive animais", "Tenho animais hoje"]
  }
};

const order: Step[] = ["moradia", "rotina", "porte", "experiencia", "result"];

export function AdoptionMatch() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const match = useMemo(() => {
    const scored = animals
      .map((animal) => {
        let score = 0;
        if (animal.moradia.includes(answers.moradia)) score += 3;
        if (animal.energia === answers.rotina) score += 3;
        if (answers.porte === "Sem preferência" || animal.porte === answers.porte) score += 2;
        if (answers.experiencia === "Primeira adoção" && animal.energia === "Calma") score += 1;
        if (animal.status === "Disponível") score += 1;
        return { animal, score };
      })
      .sort((a, b) => b.score - a.score);

    return scored[0].animal;
  }, [answers]);

  function answer(value: string) {
    if (step === "intro" || step === "result") return;
    const nextAnswers = { ...answers, [step]: value };
    setAnswers(nextAnswers);
    const nextStep = order[order.indexOf(step) + 1] || "result";
    setStep(nextStep);
  }

  function restart() {
    setAnswers({});
    setStep("moradia");
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
            <button className="button primary" type="button" onClick={() => setStep("moradia")}>Conversar com o Fred</button>
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
          <div className="fred-result-card">
            <img src={match.foto} alt={match.nome} />
            <div>
              <p className="eyebrow">Sugestão do Fred</p>
              <h3>{match.nome}</h3>
              <p>{match.personalidade}</p>
              <a className="button small" href={`/cadastro?animal=${match.id}`}>Quero conversar sobre {match.nome}</a>
              <button className="button neutral" type="button" onClick={restart}>Responder de novo</button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
