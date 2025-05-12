import { useState } from "react";
import type { Product, Variant } from "../features/products/types";
import { generateId } from "../features/products/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onUpdate: (product: Product) => void;
}

export function ProductCard({ product, onUpdate }: ProductCardProps) {
  const [variant, setVariant] = useState({ size: "", color: "", price: "" });

  const removeVariant = (id: string) => {
    const updatedProduct: Product = {
      ...product,
      variants: product.variants.filter((v) => v.id !== id),
    };
    onUpdate(updatedProduct);
  };

  const addVariant = () => {
    const newVariant: Variant = {
      id: generateId(),
      size: variant.size,
      color: variant.color,
      price: parseFloat(variant.price),
    };
    const updatedProduct: Product = {
      ...product,
      variants: [...product.variants, newVariant],
    };
    onUpdate(updatedProduct);
    setVariant({ size: "", color: "", price: "" });
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
      <p className="text-sm text-muted-foreground mb-2">
        {product.variants.length} variant(s)
      </p>
      <div className="space-y-2">
        {product.variants.map((v) => (
          <div
            key={v.id}
            className="text-sm text-gray-800 flex justify-between"
          >
            <span>
              Size: {v.size}, Color: {v.color}, Price: ₦
              {v.price.toLocaleString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeVariant(v.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="pt-4 grid gap-2 md:grid-cols-4">
        <Input
          placeholder="Size"
          value={variant.size}
          onChange={(e) =>
            setVariant((prev) => ({ ...prev, size: e.target.value }))
          }
        />
        <Input
          placeholder="Color"
          value={variant.color}
          onChange={(e) =>
            setVariant((prev) => ({ ...prev, color: e.target.value }))
          }
        />
        <Input
          placeholder="Price"
          type="number"
          value={variant.price}
          onChange={(e) =>
            setVariant((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <Button onClick={addVariant}>Add Variant</Button>
      </div>
    </div>
  );
}
