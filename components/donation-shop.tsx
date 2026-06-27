"use client";

import { useMemo, useState } from "react";
import { donationItems, type DonationProduct } from "@/lib/data";

type CartItem = DonationProduct & { qty: number };

export function DonationShop() {
  const [cart, setCart] = useState<CartItem[]>([]);
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
  }

  function updateQty(key: string, qty: number) {
    setCart((current) =>
      current.map((item) => item.key === key ? { ...item, qty: Math.max(1, qty) } : item)
    );
  }

  async function checkout() {
    setMessage("");

    if (!cart.length) {
      setMessage("Escolha pelo menos um item para continuar.");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/asaas/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
            <span className="item-icon">{item.type === "recurring" ? "Mensal" : "Item solidário"}</span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <strong>R$ {item.price},00{item.type === "recurring" ? "/mês" : ""}</strong>
            <button className="button primary" type="button" onClick={() => addItem(item)}>Adicionar ao carrinho</button>
          </article>
        ))}
      </section>
      <aside className="checkout-box">
        <h2>Carrinho solidário</h2>
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
        <button className="button donate" type="button" onClick={checkout} disabled={loading}>
          {loading ? "Abrindo checkout..." : "Pagar no Asaas"}
        </button>
        {message ? <p className="checkout-alert">{message}</p> : null}
        <p className="checkout-note">O pagamento será finalizado no checkout seguro do Asaas.</p>
      </aside>
    </div>
  );
}
