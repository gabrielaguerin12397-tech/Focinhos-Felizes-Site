"use client";

import { useState } from "react";
import Link from "next/link";

const suggestions = [
  { label: "Quero adotar", href: "/adocao", text: "Veja os animais disponíveis e peça ajuda para encontrar um perfil compatível." },
  { label: "Quero doar ração", href: "/doar-itens", text: "Você pode doar ração, vacina, cobertor, vermífugo ou kit higiene." },
  { label: "Quero apadrinhar", href: "/apadrinhamento", text: "O apadrinhamento ajuda mensalmente animais acolhidos." },
  { label: "Instagram", href: "https://www.instagram.com/focinhosfelizesff/", text: "Acompanhe campanhas e finais felizes pelo Instagram." }
];

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: "Oi! Posso te levar para adoção, doação, apadrinhamento, resgate ou Instagram.", href: "", label: "" }]);

  function handle(text: string) {
    const normalized = text.toLowerCase();
    const match = suggestions.find((item) => normalized.includes(item.label.toLowerCase().split(" ")[1] || item.label.toLowerCase()));
    const response = match || { label: "Quero ajudar", href: "/cadastro", text: "Posso te cadastrar para a ONG entrar em contato com campanhas e oportunidades." };
    setMessages((current) => [...current, { from: "user", text, href: "", label: "" }, { from: "bot", text: response.text, href: response.href, label: response.label }]);
  }

  return (
    <aside className={`ai-assistant ${open ? "open" : ""}`}>
      <button className="ai-toggle" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        IA
      </button>
      <section className="ai-panel" aria-label="Assistente de navegação">
        <header>
          <div>
            <strong>Assistente Focinhos</strong>
            <span>Encontre rapidamente o que precisa</span>
          </div>
          <button className="ai-close" type="button" onClick={() => setOpen(false)} aria-label="Fechar assistente">
            ×
          </button>
        </header>
        <div className="ai-messages">
          {messages.map((message, index) => (
            <div key={`${message.from}-${index}`}>
              <div className={`ai-message ${message.from}`}>{message.text}</div>
              {message.href ? (
                message.href.startsWith("http") ? (
                  <a className="ai-action" href={message.href} target="_blank" rel="noopener noreferrer">{message.label}</a>
                ) : (
                  <Link className="ai-action" href={message.href}>{message.label}</Link>
                )
              ) : null}
            </div>
          ))}
        </div>
        <div className="ai-suggestions">
          {suggestions.map((item) => (
            <button key={item.label} type="button" onClick={() => handle(item.label)}>{item.label}</button>
          ))}
        </div>
      </section>
    </aside>
  );
}
