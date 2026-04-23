"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { CategorySlug, Product, SearchResponse } from "@/types/product";

type SearchStatus = "success" | "loading" | "error";

type UseAsyncSearchOptions = {
  query: string;
  category: CategorySlug;
  initialData: Product[];
  debounceMs?: number;
};

type UseAsyncSearchResult = {
  products: Product[];
  status: SearchStatus;
  error: string | null;
  retry: () => void;
};

const extractErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return "No pudimos completar la búsqueda.";
};

export function useAsyncSearch({
  query,
  category,
  initialData,
  debounceMs = 350,
}: UseAsyncSearchOptions): UseAsyncSearchResult {
  const [products, setProducts] = useState(initialData);
  const [status, setStatus] = useState<SearchStatus>("success");
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  const normalizedQuery = useMemo(() => query.trim(), [query]);
  const isPristineState = normalizedQuery.length === 0 && category === "all";

  useEffect(() => {
    if (isPristineState) {
      setProducts(initialData);
      setStatus("success");
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setStatus("loading");
      setError(null);

      try {
        const params = new URLSearchParams();
        params.set("query", normalizedQuery);
        params.set("category", category);

        const response = await fetch(`/api/products?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("La búsqueda falló. Reintenta la consulta.");
        }

        const payload = (await response.json()) as SearchResponse;

        if (!controller.signal.aborted) {
          setProducts(payload.products);
          setStatus("success");
        }
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        setStatus("error");
        setError(extractErrorMessage(requestError));
      }
    }, debounceMs);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [category, debounceMs, initialData, isPristineState, normalizedQuery, retryToken]);

  const retry = useCallback(() => {
    setRetryToken((current) => current + 1);
  }, []);

  return {
    products,
    status,
    error,
    retry,
  };
}
