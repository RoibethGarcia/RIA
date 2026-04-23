"use client";

import { memo } from "react";
import { List, type RowComponentProps } from "react-window";

import type { Product } from "@/types/product";

import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
  virtualized: boolean;
};

type ProductRowProps = {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (productId: string) => void;
};

function ProductRow({
  index,
  style,
  products,
  selectedProductId,
  onSelectProduct,
}: RowComponentProps<ProductRowProps>) {
  const product = products[index];

  return (
    <div className="virtualized-row" style={style}>
      <ProductCard
        product={product}
        isSelected={selectedProductId === product.id}
        onSelect={onSelectProduct}
      />
    </div>
  );
}

function ProductListComponent({
  products,
  selectedProductId,
  onSelectProduct,
  virtualized,
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

  if (virtualized && products.length > 40) {
    return (
      <section className="virtualized-shell">
        <List
          defaultHeight={620}
          overscanCount={6}
          rowComponent={ProductRow}
          rowCount={products.length}
          rowHeight={228}
          rowProps={{
            products,
            selectedProductId,
            onSelectProduct,
          }}
          style={{ height: 620 }}
        />
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
