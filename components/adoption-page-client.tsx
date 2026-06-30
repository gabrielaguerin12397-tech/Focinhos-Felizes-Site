"use client";

import { useMemo, useState } from "react";
import { animals } from "@/lib/data";
import { AnimalCard } from "@/components/animal-card";
import { AdoptionMatch } from "@/components/adoption-match";

export function AdoptionPageClient() {
  const [showAnimals, setShowAnimals] = useState(false);
  const [filters, setFilters] = useState({
    cor: "",
    sexo: "",
    castrado: "",
    idade: "",
    porte: ""
  });

  const filteredAnimals = useMemo(() => {
    return animals.filter((animal) => {
      const ageTag = animal.tags.find((tag) => ["filhote", "adulto", "idoso"].includes(tag)) || "";
      const colorMatches = !filters.cor || animal.cor.toLowerCase().includes(filters.cor.toLowerCase());
      const sexMatches = !filters.sexo || animal.sexo === filters.sexo;
      const neuteredMatches = !filters.castrado || String(animal.castrado) === filters.castrado;
      const ageMatches = !filters.idade || ageTag === filters.idade;
      const sizeMatches = !filters.porte || animal.porte === filters.porte;

      return colorMatches && sexMatches && neuteredMatches && ageMatches && sizeMatches;
    });
  }, [filters]);

  function updateFilter(name: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    setFilters({ cor: "", sexo: "", castrado: "", idade: "", porte: "" });
  }

  return (
    <>
      <AdoptionMatch onShowAll={() => setShowAnimals(true)} />

      {showAnimals ? (
        <section className="adoption-browser" aria-label="Todos os animais disponíveis para adoção">
          <div className="admin-toolbar">
            <div>
              <p className="eyebrow">Busca de animais</p>
              <h2>Todos os animais disponíveis</h2>
            </div>
            <button className="button neutral" type="button" onClick={clearFilters}>Limpar filtros</button>
          </div>

          <div className="adoption-filters">
            <label>Cor do pelo<input value={filters.cor} onChange={(event) => updateFilter("cor", event.target.value)} placeholder="Caramelo, preto, branco..." /></label>
            <label>Sexo<select value={filters.sexo} onChange={(event) => updateFilter("sexo", event.target.value)}><option value="">Todos</option><option>Macho</option><option>Fêmea</option></select></label>
            <label>Castração<select value={filters.castrado} onChange={(event) => updateFilter("castrado", event.target.value)}><option value="">Todos</option><option value="true">Castrado</option><option value="false">Não castrado</option></select></label>
            <label>Idade<select value={filters.idade} onChange={(event) => updateFilter("idade", event.target.value)}><option value="">Todas</option><option value="filhote">Filhote</option><option value="adulto">Adulto</option><option value="idoso">Idoso</option></select></label>
            <label>Porte<select value={filters.porte} onChange={(event) => updateFilter("porte", event.target.value)}><option value="">Todos</option><option>Pequeno</option><option>Médio</option><option>Grande</option></select></label>
          </div>

          <div className="animal-grid">
            {filteredAnimals.map((animal) => <AnimalCard key={animal.id} animal={animal} />)}
          </div>

          {!filteredAnimals.length ? <p className="empty-state">Nenhum animal encontrado com esses filtros.</p> : null}
        </section>
      ) : null}
    </>
  );
}
