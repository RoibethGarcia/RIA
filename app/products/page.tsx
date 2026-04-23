import SearchShell from "@/components/search/SearchShell";
import { getCategoryOptions, getProducts } from "@/lib/products";

export default async function ProductsPage() {
  const initialProducts = await getProducts();
  const categories = getCategoryOptions(initialProducts);

  return (
    <main className="page-shell">
      <SearchShell initialProducts={initialProducts} categories={categories} />
    </main>
  );
}
