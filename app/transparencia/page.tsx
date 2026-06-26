export const metadata = {
  title: "Transparência",
  description: "Prestação de contas, receitas, despesas e projetos realizados pela Focinhos Felizes."
};

export default function TransparencyPage() {
  return (
    <main className="page-main">
      <section className="section transparency">
        <div><p className="eyebrow">Transparência</p><h1 className="page-title">Confiança se constrói com dados abertos.</h1><p>Relatórios, prestação de contas, receitas, despesas, projetos realizados e parceiros devem ficar disponíveis para consulta.</p></div>
        <div className="report-table">
          <div><strong>Mês</strong><strong>Receitas</strong><strong>Despesas</strong><strong>Projetos</strong></div>
          <div><span>Abril</span><span>R$ 18.420</span><span>R$ 16.980</span><span>Castração Solidária</span></div>
          <div><span>Maio</span><span>R$ 21.100</span><span>R$ 19.760</span><span>Feira de Adoção</span></div>
          <div><span>Junho</span><span>R$ 17.890</span><span>R$ 18.130</span><span>Resgates emergenciais</span></div>
        </div>
      </section>
    </main>
  );
}
