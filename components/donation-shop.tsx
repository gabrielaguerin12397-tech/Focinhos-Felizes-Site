"use client";

import { FormEvent, useMemo, useState } from "react";
import { donationItems, type DonationProduct } from "@/lib/data";

type CartItem = DonationProduct & { qty: number };
type CheckoutStep = "cart" | "donor";

export function DonationShop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const hasRecurring = cart.some((item) => item.type === "recurring");

  function addItem(item: DonationProduct) {
    setMessage("");
    setCart((current) => {
      const hasDifferentType = current.length > 0 && current.some((cartItem) => cartItem.type !== item.type);
      if (hasDifferentType) {
        setMessage("Finalize a doação mensal separada dos itens avulsos.");
        return current;
      }

      const existing = current.find((cartItem) => cartItem.key === item.key);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.key === item.key ? { ...cartItem, qty: item.type === "recurring" ? 1 : cartItem.qty + 1 } : cartItem
        );
      }

      return [...current, { ...item, qty: 1 }];
    });
  }

  function removeItem(key: string) {
    setCart((current) => current.filter((item) => item.key !== key));
    setStep("cart");
  }

  function updateQty(key: string, qty: number) {
    setCart((current) =>
      current.map((item) => item.key === key ? { ...item, qty: Math.max(1, qty) } : item)
    );
  }

  function beginCheckout() {
    setMessage("");

    if (!cart.length) {
      setMessage("Escolha pelo menos um item para continuar.");
      return;
    }

    setStep("donor");
  }

  async function checkout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!cart.length) {
      setMessage("Escolha pelo menos um item para continuar.");
      setStep("cart");
      return;
    }

    const form = new FormData(event.currentTarget);
    const donor = Object.fromEntries(form.entries());

    setLoading(true);
    const response = await fetch("/api/asaas/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donor,
        items: cart.map((item) => ({
          key: item.key,
          name: item.name,
          price: item.price,
          qty: item.qty,
          type: item.type
        }))
      })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
      return;
    }

    setMessage(data.message || "Não foi possível abrir o checkout agora.");
  }

  return (
    <div className="donation-shop">
      <section className="item-grid" aria-label="Itens de doação">
        {donationItems.map((item) => (
          <article className={`donation-item ${item.type === "recurring" ? "recurring" : ""}`} key={item.key}>
            <img src={item.image} alt={item.name} />
            <div className="donation-item-copy">
              <span className="item-icon">{item.type === "recurring" ? "Mensal" : "Item solidário"}</span>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <strong>R$ {item.price},00{item.type === "recurring" ? "/mês" : ""}</strong>
            </div>
            <button className="button small" type="button" onClick={() => addItem(item)}>Adicionar</button>
          </article>
        ))}
      </section>
      <aside className="checkout-box">
        <h2>Carrinho solidário</h2>
        {step === "cart" ? (
          <>
            <div className="cart-items">
              {cart.length ? cart.map((item) => (
                <div className="cart-line" key={item.key}>
                  <span>{item.name}</span>
                  <div className="cart-controls">
                    {item.type === "item" ? (
                      <input
                        aria-label={`Quantidade de ${item.name}`}
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(event) => updateQty(item.key, Number(event.target.value))}
                      />
                    ) : <small>mensal</small>}
                    <strong>R$ {item.price * item.qty},00</strong>
                    <button type="button" onClick={() => removeItem(item.key)} aria-label={`Remover ${item.name}`}>×</button>
                  </div>
                </div>
              )) : <p>Nenhum item selecionado.</p>}
            </div>
            <div className="cart-total"><span>{hasRecurring ? "Total mensal" : "Total"}</span><strong>R$ {total},00</strong></div>
            <button className="button donate" type="button" onClick={beginCheckout}>Fechar carrinho</button>
          </>
        ) : (
          <form className="checkout-form" onSubmit={checkout}>
            <p className="checkout-note">Antes do Asaas, guarde seus dados para recibo, contato e acompanhamento da doação.</p>
            <label>Nome completo<input name="nome" required autoComplete="name" /></label>
            <label>E-mail<input name="email" required type="email" autoComplete="email" /></label>
            <label>WhatsApp<input name="whatsapp" required autoComplete="tel" placeholder="(92) 99999-9999" /></label>
            <label>CPF/CNPJ<input name="cpfCnpj" required placeholder="Somente números" /></label>
            <div className="form-row">
              <label>CEP<input name="cep" required autoComplete="postal-code" /></label>
              <label>Estado<input name="estado" required maxLength={2} placeholder="AM" /></label>
            </div>
            <label>Cidade<input name="cidade" required autoComplete="address-level2" /></label>
            <label>Bairro<input name="bairro" required /></label>
            <div className="form-row">
              <label>Endereço<input name="endereco" required autoComplete="street-address" /></label>
              <label>Número<input name="numero" required /></label>
            </div>
            <label>Complemento<input name="complemento" placeholder="Apartamento, referência..." /></label>
            <label className="consent-check">
              <input name="consentimento" required type="checkbox" value="true" />
              Aceito que a Focinhos Felizes guarde meus dados para contato sobre esta doação e futuras campanhas.
            </label>
            <div className="checkout-actions">
              <button className="button neutral" type="button" onClick={() => setStep("cart")}>Voltar</button>
              <button className="button donate" type="submit" disabled={loading}>
                {loading ? "Finalizando..." : "Finalizar compra"}
              </button>
            </div>
          </form>
        )}
        {message ? <p className="checkout-alert">{message}</p> : null}
        <p className="checkout-note">O pagamento será finalizado no checkout seguro do Asaas.</p>
      </aside>
    </div>
  );
}
