import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateId } from "../features/products/utils";
import type { Product } from "../features/products/types";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
});

type FormData = z.infer<typeof formSchema>;

interface ProductFormProps {
  onAdd: (product: Product) => void;
}

export function ProductForm({ onAdd }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: FormData) => {
    const newProduct: Product = {
      id: generateId(),
      name: data.name,
      variants: [],
    };
    onAdd(newProduct);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row gap-4 items-start md:items-end"
    >
      <div className="flex-1 w-full">
        <Input
          placeholder="Product name (e.g. Sneakers)"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <Button type="submit">Add Product</Button>
    </form>
  );
}
