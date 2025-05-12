import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { Product, Variant } from "../features/products/types";
import { generateId } from "../features/products/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Edit,
  Trash2,
  Plus,
  Check,
  X,
  Tag,
  CircleDollarSign,
  PaintBucket,
  Ruler,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const variantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
});

type VariantFormData = z.infer<typeof variantSchema>;

const sizes = ["S", "M", "L", "XL"];
const colors = [
  "Red",
  "Blue",
  "Black",
  "White",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
];

// Color map for displaying color badges
const colorMap: Record<string, string> = {
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Black: "bg-black",
  White: "bg-white border border-gray-300",
  Green: "bg-green-500",
  Yellow: "bg-yellow-400",
  Purple: "bg-purple-500",
  Orange: "bg-orange-500",
};

export function ProductCard({ product, onUpdate, onDelete }: ProductCardProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VariantFormData>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      size: "M",
      color: "Red",
      price: undefined,
    },
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Variant>>({});
  const [isAddingVariant, setIsAddingVariant] = useState(false);

  const removeVariant = (id: string) => {
    const updatedProduct: Product = {
      ...product,
      variants: product.variants.filter((v) => v.id !== id),
    };
    onUpdate(updatedProduct);
  };

  const startEdit = (variant: Variant) => {
    setEditId(variant.id);
    setEditValues({ ...variant });
  };

  const saveEdit = () => {
    if (
      !editId ||
      !editValues.size ||
      !editValues.color ||
      editValues.price === undefined
    )
      return;
    const updatedVariants = product.variants.map((v) =>
      v.id === editId ? { ...v, ...editValues } : v
    );
    onUpdate({ ...product, variants: updatedVariants });
    setEditId(null);
    setEditValues({});
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValues({});
  };

  const addVariant = (data: VariantFormData) => {
    const newVariant: Variant = {
      id: generateId(),
      size: data.size,
      color: data.color,
      price: data.price,
    };
    const updatedProduct: Product = {
      ...product,
      variants: [...product.variants, newVariant],
    };
    onUpdate(updatedProduct);
    reset();
    setIsAddingVariant(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-4 text-white flex justify-between items-center">
        <h2 className="font-medium text-lg">{product.name}</h2>
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-indigo-700 hover:text-white text-indigo-100"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>

      {/* Variants Count */}
      <div className="px-4 py-2 bg-gray-50 border-b flex items-center gap-2">
        <Tag size={16} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-600">
          {product.variants.length}{" "}
          {product.variants.length === 1 ? "variant" : "variants"}
        </span>
      </div>

      {/* Variants List */}
      <div className="divide-y divide-gray-100">
        {product.variants.map((v) => (
          <div key={v.id} className="p-4 text-sm text-gray-800">
            {editId === v.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block flex items-center gap-1">
                      <Ruler size={14} />
                      Size
                    </label>
                    <Select
                      value={editValues.size || ""}
                      onValueChange={(val) =>
                        setEditValues((prev) => ({ ...prev, size: val }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block flex items-center gap-1">
                      <PaintBucket size={14} />
                      Color
                    </label>
                    <Select
                      value={editValues.color || ""}
                      onValueChange={(val) =>
                        setEditValues((prev) => ({ ...prev, color: val }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((c) => (
                          <SelectItem key={c} value={c}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  colorMap[c] || "bg-gray-300"
                                }`}
                              ></div>
                              {c}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1 block flex items-center gap-1">
                    <CircleDollarSign size={14} />
                    Price
                  </label>
                  <Input
                    placeholder="Price"
                    type="number"
                    value={editValues.price?.toString() || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value),
                      }))
                    }
                    className="w-full"
                  />
                </div>

                <div className="flex gap-2 justify-end mt-2">
                  <Button
                    size="sm"
                    onClick={saveEdit}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    <Check size={16} className="mr-1" /> Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    <X size={16} className="mr-1" /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 font-normal"
                    >
                      <Ruler size={12} /> {v.size}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 font-normal"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          colorMap[v.color] || "bg-gray-300"
                        }`}
                      ></div>
                      {v.color}
                    </Badge>
                    <span className="font-medium text-indigo-600">
                      ₦{v.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(v)}
                    className="h-8 border-gray-200 hover:border-indigo-600 hover:text-indigo-600"
                  >
                    <Edit size={14} className="mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeVariant(v.id)}
                    className="h-8 border-gray-200 hover:border-red-500 hover:text-red-500"
                  >
                    <Trash2 size={14} className="mr-1" /> Remove
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Variant Form */}
      <div className="border-t border-gray-100 p-4">
        {isAddingVariant ? (
          <form onSubmit={handleSubmit(addVariant)} className="space-y-4">
            <h3 className="font-medium text-sm text-gray-700 flex items-center gap-1">
              <Plus size={16} className="text-indigo-600" /> Add New Variant
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Size</label>
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.size && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.size.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Color
                </label>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((c) => (
                          <SelectItem key={c} value={c}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  colorMap[c] || "bg-gray-300"
                                }`}
                              ></div>
                              {c}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.color && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.color.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Price (₦)
              </label>
              <Input
                placeholder="Enter price"
                type="number"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Check size={16} className="mr-1" /> Add Variant
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setIsAddingVariant(false);
                }}
              >
                <X size={16} className="mr-1" /> Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            onClick={() => setIsAddingVariant(true)}
            variant="outline"
            className="w-full border-dashed border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
          >
            <Plus size={16} className="mr-1" /> Add Variant
          </Button>
        )}
      </div>
    </div>
  );
}
