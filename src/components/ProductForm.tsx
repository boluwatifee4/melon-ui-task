import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateId } from "../features/products/utils";
import type { Product } from "../features/products/types";
import { PackageOpen, ShoppingBag, Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  sku: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  onCancel?: () => void;
  initialData?: Partial<Product>;
}

export function ProductForm({
  onSubmit,
  onCancel,
  initialData,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: "",
      sku: "",
    },
  });

  const handleFormSubmit = (data: FormData) => {
    const newProduct: Product = {
      id: initialData?.id || generateId(),
      name: data.name,
      variants: initialData?.variants || [],
    };
    onSubmit(newProduct);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* Product Icon */}
        <div className="flex justify-center mb-2">
          <div className="bg-indigo-100 p-4 rounded-full">
            <ShoppingBag size={32} className="text-indigo-600" />
          </div>
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="flex items-center gap-1 text-sm font-medium text-gray-700"
          >
            <PackageOpen size={16} className="text-indigo-600" />
            Product Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter product name (e.g. Sneakers)"
            className="focus-visible:ring-indigo-600"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="flex items-center gap-1 text-sm font-medium text-gray-700"
          >
            Description{" "}
            <span className="text-xs text-gray-400">(optional)</span>
          </Label>
          <textarea
            id="description"
            placeholder="Enter product description"
            className="min-h-24 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            {...register("description")}
          />
        </div>

        {/* SKU */}
        <div className="space-y-2">
          <Label
            htmlFor="sku"
            className="flex items-center gap-1 text-sm font-medium text-gray-700"
          >
            SKU <span className="text-xs text-gray-400">(optional)</span>
          </Label>
          <Input
            id="sku"
            placeholder="Enter product SKU"
            className="focus-visible:ring-indigo-600"
            {...register("sku")}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1"
        >
          <Check size={18} className="mr-2" />
          {initialData?.id ? "Update Product" : "Add Product"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 hover:bg-gray-50 flex-1"
          >
            <X size={18} className="mr-2" />
            Cancel
          </Button>
        )}
      </div>

      {/* Form Footer */}
      {!initialData?.id && (
        <p className="text-xs text-gray-500 text-center pt-2">
          After adding the product, you can add variants for size, color, and
          price.
        </p>
      )}
    </form>
  );
}
