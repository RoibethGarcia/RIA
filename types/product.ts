export type CategorySlug =
  | "all"
  | "audio"
  | "workspace"
  | "wearables"
  | "fitness"
  | "gaming"
  | "home";

export type ProductCategory = {
  slug: Exclude<CategorySlug, "all">;
  label: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  highlight: string;
  price: number;
  rating: number;
  stock: number;
  icon: string;
  accent: string;
  tags: string[];
  category: ProductCategory;
};

export type ProductCategoryOption = {
  slug: CategorySlug;
  label: string;
  count: number;
};

export type SearchResponse = {
  products: Product[];
  total: number;
  query: string;
  category: CategorySlug;
};
