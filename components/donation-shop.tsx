"use client";

import { useMemo, useState } from "react";
import { donationItems } from "@/lib/data";

type CartItem = (typeof donationItems)[number] & { qty: number };

export function DonationShop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  function addItem(item: (typeof donationItems)[number]) {
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.key === item.key);
      if (existing) return current.map((cartItem) => cartItem.key === item.key ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem);
      return [...current, { ...item, qty: 1 }];
    });
  }

  function checkout() {
    alert("Configure os links/API do Asaas no painel Admin antes de publicar.");
  }

  return (
    <div className="donation-shop">
      <section className="item-grid" aria-label="Itens de doação">
        {donationItems.map((item) => (
          <article className="donation-item" key={item.key}>
            <img src={item.image} alt={item.name} />
            <span className="item-icon">Doação</span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <strong>R$ {item.price},00</strong>
            <button className="button primary" type="button" onClick={() => addItem(item)}>Adicionar</button>
          </article>
        ))}
      </section>
      <aside className="checkout-box">
        <h2>Seu carrinho solidário</h2>
        <div className="cart-items">
          {cart.length ? cart.map((item) => (
            <div className="cart-line" key={item.key}><span>{item.qty}x {item.name}</span><strong>R$ {item.price * item.qty},00</strong></div>
          )) : <p>Nenhum item selecionado.</p>}
        </div>
        <div className="cart-total"><span>Total</span><strong>R$ {total},00</strong></div>
        <button className="button donate" type="button" onClick={checkout}>Pagar no Asaas</button>
        <p className="checkout-note">Na versão final, o checkout será criado por API segura no backend.</p>
      </aside>
    </div>
  );
}
