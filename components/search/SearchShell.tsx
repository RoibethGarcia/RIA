"use client";

import { lazy, Suspense, useCallback, useEffect, useMemo, useState, useTransition } from "react";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import ProductList from "@/components/products/ProductList";
import { CategoryTabs } from "@/components/search/CategoryTabs";
import SearchInput from "@/components/search/SearchInput";
import { useAsyncSearch } from "@/hooks/useAsyncSearch";
import type { CategorySlug, Product, ProductCategoryOption } from "@/types/product";

const ProductDetailsModal = lazy(() => import("@/components/products/ProductDetailsModal"));

type SearchShellProps = {
  initialProducts: Product[];
  categories: ProductCategoryOption[];
};

export default function SearchShell({
  initialProducts,
  categories,
}: SearchShellProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug>("all");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [virtualized, setVirtualized] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts);
  const [isTransitionPending, startTransition] = useTransition();

  const { products, status, error, retry } = useAsyncSearch({
    query,
    category,
    initialData: initialProducts,
  });

  useEffect(() => {
    startTransition(() => {
      setDisplayedProducts(products);
    });
  }, [products]);

  useEffect(() => {
    if (
      selectedProductId &&
      !displayedProducts.some((product) => product.id === selectedProductId)
    ) {
      setSelectedProductId(null);
    }
  }, [displayedProducts, selectedProductId]);

  const selectedProduct = useMemo(
    () => displayedProducts.find((product) => product.id === selectedProductId) ?? null,
    [displayedProducts, selectedProductId],
  );

  const summary = useMemo(() => {
    const totalValue = displayedProducts.reduce((accumulator, product) => accumulator + product.price, 0);
    const averageRating =
      displayedProducts.length === 0
        ? 0
        : displayedProducts.reduce((accumulator, product) => accumulator + product.rating, 0) /
          displayedProducts.length;

    return {
      total: displayedProducts.length,
      totalValue: Math.round(totalValue),
      averageRating: averageRating.toFixed(1),
    };
  }, [displayedProducts]);

  const handleSelectProduct = useCallback((productId: string) => {
    setSelectedProductId(productId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProductId(null);
  }, []);

  const handleRetry = useCallback(() => {
    retry();
  }, [retry]);

  const handleResetFilters = useCallback(() => {
    setQuery("");
    setCategory("all");
  }, []);

  const handleSimulateError = useCallback(() => {
    setQuery("__error__");
    setCategory("all");
  }, []);

  return (
    <div className="search-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">React avanzado · demo unificado</p>
          <h1>Catálogo de productos con frontera server/client REAL</h1>
          <p>
            `app/products/page.tsx` entrega los datos iniciales desde servidor. `SearchShell`
            toma la interactividad, el debounce, la transición no urgente y el modal lazy.
          </p>
        </div>

        <div className="hero__badges">
          <span className="badge">Server Component</span>
          <span className="badge">Client Shell</span>
          <span className="badge">useAsyncSearch</span>
          <span className="badge">React.memo</span>
          <span className="badge">lazy + Suspense</span>
          <span className="badge">Portal + ErrorBoundary</span>
        </div>
      </section>

      <SearchInput
        query={query}
        onQueryChange={setQuery}
        onResetFilters={handleResetFilters}
        onSimulateError={handleSimulateError}
        isLoading={status === "loading"}
        isTransitionPending={isTransitionPending}
      />

      <CategoryTabs.Root value={category} onValueChange={setCategory}>
        <div className="tabs-header">
          <div>
            <p className="eyebrow">Slide 4</p>
            <h2>Compound components para categorías</h2>
          </div>
          <label className="toggle-card">
            <span>Virtualizar lista</span>
            <input
              checked={virtualized}
              type="checkbox"
              onChange={(event) => setVirtualized(event.target.checked)}
            />
          </label>
        </div>

        <CategoryTabs.List>
          {categories.map((option) => (
            <CategoryTabs.Trigger key={option.slug} count={option.count} value={option.slug}>
              {option.label}
            </CategoryTabs.Trigger>
          ))}
        </CategoryTabs.List>
      </CategoryTabs.Root>

      <section className="summary-grid">
        <article className="summary-card">
          <p>Resultados visibles</p>
          <strong>{summary.total}</strong>
        </article>
        <article className="summary-card">
          <p>Valor agregado</p>
          <strong>${summary.totalValue}</strong>
        </article>
        <article className="summary-card">
          <p>Rating promedio</p>
          <strong>{summary.averageRating}</strong>
        </article>
      </section>

      {error ? (
        <section className="error-banner" role="alert">
          <div>
            <strong>La búsqueda falló, pero la interfaz no colapsó.</strong>
            <p>Eso es exactamente lo que debes enseñar: resiliencia antes que humo.</p>
          </div>
          <button className="primary-button" type="button" onClick={handleRetry}>
            Reintentar
          </button>
        </section>
      ) : null}

      <section className="results-header">
        <div>
          <p className="eyebrow">Slides 6 a 11</p>
          <h2>Lista memoizada y lista virtualizada sobre el mismo dominio</h2>
        </div>
        <div className="results-header__meta">
          <span className={`status-pill ${status === "loading" ? "is-active" : ""}`}>
            {status === "loading" ? "Loading" : "Stable"}
          </span>
          <span className={`status-pill ${virtualized ? "is-active" : ""}`}>
            {virtualized ? "Virtualizada" : "Render completo"}
          </span>
        </div>
      </section>

      <ProductList
        products={displayedProducts}
        selectedProductId={selectedProductId}
        onSelectProduct={handleSelectProduct}
        virtualized={virtualized}
      />

      {selectedProduct ? (
        <ErrorBoundary
          resetKeys={[selectedProduct.id]}
          fallback={({ reset }) => (
            <section className="error-card" role="alert">
              <h3>Solo falló el panel de detalle</h3>
              <p>
                El catálogo principal sigue operativo. ESA es la gracia de un Error Boundary bien
                ubicado.
              </p>
              <div className="button-row">
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => {
                    reset();
                    handleCloseModal();
                  }}
                >
                  Cerrar fallback
                </button>
              </div>
            </section>
          )}
        >
          <Suspense fallback={<section className="error-card">Cargando modal diferido...</section>}>
            <ProductDetailsModal product={selectedProduct} onClose={handleCloseModal} />
          </Suspense>
        </ErrorBoundary>
      ) : null}
    </div>
  );
}
