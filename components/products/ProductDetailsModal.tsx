"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { Product } from "@/types/product";

type ProductDetailsModalProps = {
  product: Product;
  onClose: () => void;
};

function ProductDiagnostics({
  product,
  shouldCrash,
}: {
  product: Product;
  shouldCrash: boolean;
}) {
  if (shouldCrash) {
    throw new Error(`Falló el panel técnico de ${product.title}`);
  }

  return (
    <section className="product-modal__section">
      <h3>Detalles del producto</h3>
      <ul className="detail-list">
        <li>
          <span>Precio</span>
          <strong>${product.price}</strong>
        </li>
        <li>
          <span>Rating</span>
          <strong>{product.rating}</strong>
        </li>
        <li>
          <span>Stock</span>
          <strong>{product.stock}</strong>
        </li>
      </ul>
    </section>
  );
}

export default function ProductDetailsModal({
  product,
  onClose,
}: ProductDetailsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldCrashDiagnostics, setShouldCrashDiagnostics] = useState(false);

  useEffect(() => {
    setMounted(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const target = useMemo(() => {
    if (typeof document === "undefined") {
      return null;
    }

    return document.getElementById("modal-root") ?? document.body;
  }, [mounted]);

  if (!mounted || !target) {
    return null;
  }

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        aria-modal="true"
        className="product-modal"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="product-modal__header">
          <div>
            <p className="eyebrow">{product.category.label}</p>
            <h2>
              {product.icon} {product.title}
            </h2>
            <p>{product.description}</p>
          </div>
          <button aria-label="Cerrar modal" className="modal-close" type="button" onClick={onClose}>
            ✕
          </button>
        </header>

        <div className="product-modal__grid">
          <ProductDiagnostics product={product} shouldCrash={shouldCrashDiagnostics} />
        </div>

        <footer className="product-modal__footer">
          <button className="ghost-button" type="button" onClick={() => setShouldCrashDiagnostics(true)}>
            Simular fallo del widget
          </button>
          <button className="primary-button" type="button" onClick={onClose}>
            Cerrar
          </button>
        </footer>
      </div>
    </div>,
    target,
  );
}
