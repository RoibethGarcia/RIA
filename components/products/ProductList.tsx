"use client";

import { memo } from "react";

import type { Product } from "@/types/product";

import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
};

function ProductListComponent({
  products,
  selectedProductId,
  onSelectProduct,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <section className="product-list-empty">
        <h3>Sin resultados</h3>
        <p>
          Ajusta la búsqueda o cambia de categoría. La UI sigue viva: eso es mejor arquitectura, no magia.
        </p>
      </section>
    );
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedProductId === product.id}
          onSelect={onSelectProduct}
        />
      ))}
    </section>
  );
}

const ProductList = memo(ProductListComponent);

export default ProductList;
