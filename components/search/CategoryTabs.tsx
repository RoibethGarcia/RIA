"use client";

import { createContext, useContext } from "react";

import type { CategorySlug } from "@/types/product";

type CategoryTabsContextValue = {
  value: CategorySlug;
  onValueChange: (nextValue: CategorySlug) => void;
};

type CategoryTabsRootProps = {
  value: CategorySlug;
  onValueChange: (nextValue: CategorySlug) => void;
  children: React.ReactNode;
};

type CategoryTabsListProps = {
  children: React.ReactNode;
};

type CategoryTabsTriggerProps = {
  value: CategorySlug;
  count?: number;
  children: React.ReactNode;
};

const CategoryTabsContext = createContext<CategoryTabsContextValue | null>(null);

const useCategoryTabs = () => {
  const context = useContext(CategoryTabsContext);

  if (!context) {
    throw new Error("CategoryTabs debe usarse dentro de CategoryTabs.Root");
  }

  return context;
};

function Root({ value, onValueChange, children }: CategoryTabsRootProps) {
  return (
    <CategoryTabsContext.Provider value={{ value, onValueChange }}>
      <section className="tabs-shell">{children}</section>
    </CategoryTabsContext.Provider>
  );
}

function List({ children }: CategoryTabsListProps) {
  return (
    <div aria-label="Categorías de producto" className="category-tabs__list" role="tablist">
      {children}
    </div>
  );
}

function Trigger({ value, count, children }: CategoryTabsTriggerProps) {
  const context = useCategoryTabs();
  const isActive = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={`category-tabs__trigger ${isActive ? "is-active" : ""}`}
      onClick={() => context.onValueChange(value)}
    >
      <span>{children}</span>
      {typeof count === "number" ? <span className="chip">{count}</span> : null}
    </button>
  );
}

export const CategoryTabs = {
  Root,
  List,
  Trigger,
};
