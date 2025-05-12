import { useEffect, useState } from "react";
import type { Product } from "../features/products/types";
import { ProductForm } from "./ProductForm";
import { getInitialProducts, saveProducts } from "../lib/storage";

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getInitialProducts());
  }, []);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const handleAdd = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <section className="space-y-6">
      <ProductForm onAdd={handleAdd} />
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm text-muted-foreground">
              {product.variants.length} variant(s)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
