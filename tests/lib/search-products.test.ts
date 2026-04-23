import { describe, expect, it } from "vitest";

import { buildMockProducts, searchProductsSync } from "../../lib/products";

describe("searchProductsSync", () => {
  const products = buildMockProducts(24);

  it("filtra por texto sin distinguir mayúsculas", () => {
    const results = searchProductsSync(products, {
      query: "AURORA",
      category: "all",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((product) => product.title.toLowerCase().includes("aurora"))).toBe(true);
  });

  it("combina query y categoría", () => {
    const results = searchProductsSync(products, {
      query: "pulse",
      category: "wearables",
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((product) => product.category.slug === "wearables")).toBe(true);
  });

  it("devuelve todo cuando no hay filtros", () => {
    const results = searchProductsSync(products, {
      query: "",
      category: "all",
    });

    expect(results).toHaveLength(products.length);
  });
});
