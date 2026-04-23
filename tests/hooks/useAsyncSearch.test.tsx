import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useAsyncSearch } from "../../hooks/useAsyncSearch";
import { buildMockProducts } from "../../lib/products";
import type { Product } from "../../types/product";

const createResponse = (products: Product[], ok = true) =>
  Promise.resolve({
    ok,
    json: () => Promise.resolve({ products }),
  } as Response);

describe("useAsyncSearch", () => {
  const initialProducts = buildMockProducts(12);

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mantiene los datos iniciales sin disparar fetch si los filtros están limpios", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() =>
      useAsyncSearch({
        query: "",
        category: "all",
        initialData: initialProducts,
        debounceMs: 1,
      }),
    );

    expect(result.current.products).toEqual(initialProducts);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("hace la búsqueda después del debounce y arma la URL esperada", async () => {
    const filtered = initialProducts.filter((product) => product.title.toLowerCase().includes("aurora"));
    const fetchMock = vi.fn((input: RequestInfo | URL, _init?: RequestInit) => {
      return createResponse(filtered);
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() =>
      useAsyncSearch({
        query: "aurora",
        category: "audio",
        initialData: initialProducts,
        debounceMs: 1,
      }),
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(result.current.products).toEqual(filtered);
    });

    expect(fetchMock.mock.calls[0]?.[0]).toContain("/api/products");
    expect(fetchMock.mock.calls[0]?.[0]).toContain("query=aurora");
    expect(fetchMock.mock.calls[0]?.[0]).toContain("category=audio");
    expect(result.current.status).toBe("success");
  });

  it("aborta la request anterior cuando cambia la query", async () => {
    const signals: AbortSignal[] = [];
    const fetchMock = vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
      signals.push(init?.signal as AbortSignal);
      return createResponse(initialProducts);
    });
    vi.stubGlobal("fetch", fetchMock);

    const { rerender } = renderHook(
      ({ query }) =>
        useAsyncSearch({
          query,
          category: "all",
          initialData: initialProducts,
          debounceMs: 1,
        }),
      {
        initialProps: { query: "aur" },
      },
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    await act(async () => {
      rerender({ query: "aurora" });
    });

    expect(signals[0]?.aborted).toBe(true);
  });

  it("permite retry después de un error", async () => {
    const successPayload = initialProducts.slice(0, 3);
    const fetchMock = vi
      .fn()
      .mockImplementationOnce(() => createResponse([], false))
      .mockImplementationOnce(() => createResponse(successPayload));
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() =>
      useAsyncSearch({
        query: "pulse",
        category: "wearables",
        initialData: initialProducts,
        debounceMs: 1,
      }),
    );

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    act(() => {
      result.current.retry();
    });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.products).toEqual(successPayload);
  });
});
