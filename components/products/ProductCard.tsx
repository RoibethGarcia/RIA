"use client";

import { memo, type CSSProperties } from "react";

import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  onSelect: (productId: string) => void;
  style?: CSSProperties;
};

function ProductCardComponent({ product, isSelected, onSelect, style }: ProductCardProps) {
  return (
    <article
      className={`product-card ${isSelected ? "is-selected" : ""}`}
      style={
        {
          ...style,
          "--product-accent": product.accent,
        } as CSSProperties
      }
    >
      <div className="product-card__top">
        <span className="product-card__icon" aria-hidden="true">
          {product.icon}
        </span>
        <div className="product-card__meta">
          <p>{product.category.label}</p>
          <strong>{product.title}</strong>
        </div>
      </div>

      <p className="product-card__description">{product.description}</p>
      <p className="product-card__highlight">{product.highlight}</p>

      <div className="product-card__tags">
        {product.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="chip">
            #{tag}
          </span>
        ))}
      </div>

      <div className="product-card__footer">
        <div>
          <strong>${product.price}</strong>
          <p>
            ⭐ {product.rating} · Stock {product.stock}
          </p>
        </div>
        <button className="primary-button" type="button" onClick={() => onSelect(product.id)}>
          Ver detalle
        </button>
      </div>
    </article>
  );
}

const ProductCard = memo(ProductCardComponent);

export default ProductCard;
