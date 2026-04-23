import type { CategorySlug, Product, ProductCategoryOption } from "@/types/product";

const categoryLabels = {
  audio: "Audio",
  workspace: "Workspace",
  wearables: "Wearables",
  fitness: "Fitness",
  gaming: "Gaming",
  home: "Home",
} as const;

const productSeeds: Omit<Product, "id">[] = [
  {
    title: "Aurora Headphones",
    description: "Auriculares inalámbricos con cancelación activa y perfil sonoro balanceado.",
    highlight: "Ideal para demostrar memoización en listas densas.",
    price: 189,
    rating: 4.7,
    stock: 42,
    icon: "🎧",
    accent: "#7c3aed",
    tags: ["noise-cancelling", "wireless", "react-demo"],
    category: { slug: "audio", label: categoryLabels.audio },
  },
  {
    title: "Nebula Speaker",
    description: "Parlante compacto multiroom con batería extendida y bluetooth LE.",
    highlight: "Buen caso para mostrar estado loading + retry.",
    price: 129,
    rating: 4.5,
    stock: 18,
    icon: "🔊",
    accent: "#2563eb",
    tags: ["bluetooth", "multiroom", "portable"],
    category: { slug: "audio", label: categoryLabels.audio },
  },
  {
    title: "Atlas Desk Hub",
    description: "Dock USB-C con múltiples puertos para estaciones de trabajo híbridas.",
    highlight: "Útil para ejemplos de callbacks hacia hijos memoizados.",
    price: 149,
    rating: 4.6,
    stock: 36,
    icon: "🧩",
    accent: "#0891b2",
    tags: ["usb-c", "workspace", "docking"],
    category: { slug: "workspace", label: categoryLabels.workspace },
  },
  {
    title: "Focus Lamp",
    description: "Lámpara regulable con temperatura adaptable para escritorios de alto rendimiento.",
    highlight: "Perfecta para comparar render normal vs lista virtualizada.",
    price: 94,
    rating: 4.4,
    stock: 24,
    icon: "💡",
    accent: "#f59e0b",
    tags: ["desk", "lighting", "focus"],
    category: { slug: "workspace", label: categoryLabels.workspace },
  },
  {
    title: "Pulse Watch",
    description: "Reloj deportivo con métricas de recuperación, sueño y frecuencia cardíaca.",
    highlight: "Es el ejemplo central para useAsyncSearch por categoría y query.",
    price: 239,
    rating: 4.8,
    stock: 27,
    icon: "⌚",
    accent: "#10b981",
    tags: ["health", "wearable", "tracking"],
    category: { slug: "wearables", label: categoryLabels.wearables },
  },
  {
    title: "Motion Band",
    description: "Pulsera liviana para seguimiento diario con sincronización instantánea.",
    highlight: "Aporta volumen al catálogo sin agregar complejidad conceptual.",
    price: 89,
    rating: 4.2,
    stock: 58,
    icon: "📶",
    accent: "#14b8a6",
    tags: ["activity", "wearable", "sync"],
    category: { slug: "wearables", label: categoryLabels.wearables },
  },
  {
    title: "Stride Tread",
    description: "Caminadora plegable pensada para entrenamientos cortos en espacios reducidos.",
    highlight: "Sirve para hablar de costos reales de render y no de optimización placebo.",
    price: 599,
    rating: 4.3,
    stock: 11,
    icon: "🏃",
    accent: "#ef4444",
    tags: ["cardio", "home-gym", "fitness"],
    category: { slug: "fitness", label: categoryLabels.fitness },
  },
  {
    title: "Core Mat",
    description: "Colchoneta premium con guía visual de ejercicios y materiales reciclados.",
    highlight: "Suma un dominio fitness sin meter reglas de negocio complicadas.",
    price: 59,
    rating: 4.1,
    stock: 72,
    icon: "🧘",
    accent: "#f97316",
    tags: ["mobility", "fitness", "recovery"],
    category: { slug: "fitness", label: categoryLabels.fitness },
  },
  {
    title: "Vertex Controller",
    description: "Control inalámbrico con gatillos adaptativos y perfiles configurables.",
    highlight: "Permite contrastar props estables vs funciones inline.",
    price: 99,
    rating: 4.6,
    stock: 31,
    icon: "🎮",
    accent: "#ec4899",
    tags: ["gaming", "wireless", "latency"],
    category: { slug: "gaming", label: categoryLabels.gaming },
  },
  {
    title: "Nova Monitor",
    description: "Monitor ultrawide con alta tasa de refresco para multitarea y demos visuales.",
    highlight: "Buena pieza para mostrar modal lazy + portal.",
    price: 429,
    rating: 4.9,
    stock: 16,
    icon: "🖥️",
    accent: "#6366f1",
    tags: ["display", "workspace", "gaming"],
    category: { slug: "gaming", label: categoryLabels.gaming },
  },
  {
    title: "Calm Diffuser",
    description: "Difusor inteligente con escenas automáticas y control por horarios.",
    highlight: "Aporta una categoría home para hablar de filtros compuestos.",
    price: 74,
    rating: 4,
    stock: 47,
    icon: "🌿",
    accent: "#84cc16",
    tags: ["home", "air", "automation"],
    category: { slug: "home", label: categoryLabels.home },
  },
  {
    title: "Orbit Purifier",
    description: "Purificador de aire con sensores y panel de calidad ambiental en tiempo real.",
    highlight: "Sirve para reforzar el mensaje de arquitectura: server para datos, client para interacción.",
    price: 279,
    rating: 4.7,
    stock: 22,
    icon: "🌀",
    accent: "#0ea5e9",
    tags: ["home", "air", "sensors"],
    category: { slug: "home", label: categoryLabels.home },
  },
];

const normalize = (value: string) => value.trim().toLowerCase();

const slugify = (value: string) =>
  normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function buildMockProducts(total = 1200): Product[] {
  return Array.from({ length: total }, (_, index) => {
    const seed = productSeeds[index % productSeeds.length];
    const variant = Math.floor(index / productSeeds.length) + 1;
    const variationOffset = index % 7;

    return {
      ...seed,
      id: `${seed.category.slug}-${slugify(seed.title)}-${variant}`,
      title: `${seed.title} ${variant}`,
      description: `${seed.description} Serie demo ${variant}.`,
      highlight: `${seed.highlight} Variante ${variant}.`,
      price: Number((seed.price + variationOffset * 2.75).toFixed(2)),
      rating: Number(Math.min(5, seed.rating + ((variationOffset % 3) - 1) * 0.1).toFixed(1)),
      stock: Math.max(0, seed.stock + ((variationOffset % 5) - 2) * 4),
      tags: [...seed.tags, variant % 2 === 0 ? "server-components" : "client-shell"],
    };
  });
}

export function searchProductsSync(
  products: Product[],
  filters: { query: string; category: CategorySlug },
): Product[] {
  const normalizedQuery = normalize(filters.query);

  return products.filter((product) => {
    const matchesCategory = filters.category === "all" || product.category.slug === filters.category;
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      product.title,
      product.description,
      product.highlight,
      product.category.label,
      ...product.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getCategoryOptions(products: Product[]): ProductCategoryOption[] {
  const counts = products.reduce<Record<string, number>>((accumulator, product) => {
    accumulator[product.category.slug] = (accumulator[product.category.slug] ?? 0) + 1;
    return accumulator;
  }, {});

  return [
    { slug: "all", label: "Todas", count: products.length },
    ...Object.entries(categoryLabels).map(([slug, label]) => ({
      slug: slug as Exclude<CategorySlug, "all">,
      label,
      count: counts[slug] ?? 0,
    })),
  ];
}

export async function getProducts(delayMs = 0): Promise<Product[]> {
  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return buildMockProducts();
}
