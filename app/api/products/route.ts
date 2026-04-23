import type { NextRequest } from "next/server";

import { getProducts, searchProductsSync } from "@/lib/products";
import type { CategorySlug, SearchResponse } from "@/types/product";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") ?? "";
  const category = (searchParams.get("category") ?? "all") as CategorySlug;

  if (query.trim().toLowerCase() === "__error__") {
    return Response.json(
      {
        message: "Error demo intencional para mostrar loading, error y retry.",
      },
      { status: 500 },
    );
  }

  const products = await getProducts(350);
  const filteredProducts = searchProductsSync(products, { query, category });

  const payload: SearchResponse = {
    products: filteredProducts,
    total: filteredProducts.length,
    query,
    category,
  };

  return Response.json(payload);
}
