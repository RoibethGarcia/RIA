"use client";

type SearchInputProps = {
  query: string;
  onQueryChange: (nextQuery: string) => void;
  onResetFilters: () => void;
  onSimulateError: () => void;
  isLoading: boolean;
  isTransitionPending: boolean;
};

export default function SearchInput({
  query,
  onQueryChange,
  onResetFilters,
  onSimulateError,
  isLoading,
  isTransitionPending,
}: SearchInputProps) {
  return (
    <section className="search-card">
      <div className="search-card__header">
        <div>
          <p className="eyebrow">Slide 5 + 10</p>
          <h2>Búsqueda asíncrona con prioridad correcta</h2>
        </div>
        <div className="status-row" aria-live="polite">
          <span className={`status-pill ${isLoading ? "is-active" : ""}`}>
            {isLoading ? "Buscando..." : "Datos estables"}
          </span>
          <span className={`status-pill ${isTransitionPending ? "is-active" : ""}`}>
            {isTransitionPending ? "Transition en curso" : "UI responsiva"}
          </span>
        </div>
      </div>

      <label className="search-input" htmlFor="product-search">
        <span className="search-input__label">Buscar productos</span>
        <input
          id="product-search"
          name="product-search"
          type="search"
          value={query}
          placeholder="Ej.: aurora, pulse, monitor, bluetooth..."
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>

      <div className="search-toolbar">
        <p className="helper-text">
          El input se actualiza de inmediato; los resultados pueden reconciliarse en segundo plano.
        </p>
        <div className="button-row">
          <button className="ghost-button" type="button" onClick={onResetFilters}>
            Limpiar filtros
          </button>
          <button className="ghost-button" type="button" onClick={onSimulateError}>
            Simular error
          </button>
        </div>
      </div>
    </section>
  );
}
