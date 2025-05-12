import { useEffect, useState } from "react";
import type { Product } from "../features/products/types";
import { ProductForm } from "./ProductForm";
import { ProductCard } from "./ProductCard";
import { getInitialProducts, saveProducts } from "../lib/storage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateId } from "@/features/products/utils";
import {
  Search,
  Plus,
  X,
  Package,
  Filter,
  ArrowUpDown,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const FAKE_STORE_URL = "https://dummyjson.com/products?limit=5";

async function fetchFakeProducts(): Promise<Product[]> {
  const res = await fetch(FAKE_STORE_URL);
  const data = await res.json();
  return data.products.map((item: { title: string; price: number }) => ({
    id: generateId(),
    name: item.title,
    variants: [
      {
        id: generateId(),
        size: "M",
        color: "Red",
        price: Math.round(item.price),
      },
    ],
  }));
}

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setProducts(getInitialProducts());
  }, []);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const handleAdd = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    toast.success("Product added successfully");
    setIsFormOpen(false);
  };

  const handleUpdate = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    toast.success("Product updated successfully");
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted successfully");
  };

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();
    const inName = product.name.toLowerCase().includes(query);
    const inVariants = product.variants.some(
      (v) =>
        v.size.toLowerCase().includes(query) ||
        v.color.toLowerCase().includes(query) ||
        v.price.toString().includes(query)
    );
    return inName || inVariants;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  const handleSeed = async () => {
    try {
      const seeded = await fetchFakeProducts();
      setProducts((prev) => [...prev, ...seeded]);
      toast.success("Seeded products from Fake Store");
    } catch (error) {
      console.error("Failed to fetch from Fake Store", error);
      toast.error("Failed to fetch from Fake Store");
    }
  };

  const toggleSort = () => {
    if (sortOrder === null) setSortOrder("asc");
    else if (sortOrder === "asc") setSortOrder("desc");
    else setSortOrder(null);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* App Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-2 rounded-lg shadow-md">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-800">
              Product Manager
            </h1>
          </div>
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="products" className="w-full">
          {/* <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger
              value="products"
              className="text-sm py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-50 data-[state=active]:to-indigo-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-l-md"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-sm py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-50 data-[state=active]:to-indigo-50 data-[state=active]:text-purple-700 data-[state=active]:shadow-sm rounded-r-md"
            >
              Analytics
            </TabsTrigger>
          </TabsList> */}

          <TabsContent value="products" className="mt-2">
            {/* Control Bar */}
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products by name, size, color or price..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-50 border-gray-200 focus-visible:ring-purple-500 focus-visible:ring-opacity-20 rounded-md"
                  />
                </div>
                <div className="flex items-center gap-3 self-end lg:self-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 text-gray-600 hover:text-purple-700 flex gap-2 items-center"
                      >
                        <Filter size={16} />
                        <span className="hidden sm:inline">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 bg-white shadow-lg border-gray-200"
                    >
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 hover:text-purple-700">
                        Show All
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 hover:text-purple-700">
                        With Multiple Variants
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 hover:text-purple-700">
                        Recently Added
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSort}
                    className={`border-gray-200 ${
                      sortOrder
                        ? "text-purple-700 border-purple-200 bg-purple-50"
                        : "text-gray-600 hover:text-purple-700"
                    } flex gap-2 items-center`}
                  >
                    <ArrowUpDown size={16} />
                    <span className="hidden sm:inline">
                      {sortOrder === "asc"
                        ? "A-Z"
                        : sortOrder === "desc"
                        ? "Z-A"
                        : "Sort"}
                    </span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 text-gray-600 hover:text-purple-700"
                      >
                        <Settings size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 bg-white shadow-lg border-gray-200"
                    >
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2"
                        onClick={() => setViewMode("grid")}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            viewMode === "grid"
                              ? "bg-purple-600"
                              : "border border-gray-300"
                          }`}
                        ></div>
                        Grid View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2"
                        onClick={() => setViewMode("list")}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            viewMode === "list"
                              ? "bg-purple-600"
                              : "border border-gray-300"
                          }`}
                        ></div>
                        List View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-purple-50 hover:text-purple-700"
                        onClick={handleSeed}
                      >
                        Import Demo Products
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <Plus size={18} />
                    <span>Add Product</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="mb-8">
              {sortedProducts.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center">
                  <div className="mx-auto w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    {search
                      ? "We couldn't find any products matching your search. Try a different keyword or clear your search."
                      : "Get started by adding your first product or import demo products."}
                  </p>
                  <div className="flex gap-3 justify-center">
                    {search && (
                      <Button
                        variant="outline"
                        className="border-gray-200"
                        onClick={() => setSearch("")}
                      >
                        Clear Search
                      </Button>
                    )}
                    <Button
                      onClick={() => setIsFormOpen(true)}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Product
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-200 text-gray-700"
                      onClick={handleSeed}
                    >
                      Import Demo Products
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-2">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-md">
              <div className="mx-auto w-16 h-16 mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Settings className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Analytics Coming Soon
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                This feature is currently in development. Check back later for
                product performance insights and sales analytics.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto  bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">New Product</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFormOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full h-8 w-8 p-0 flex items-center justify-center"
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="p-6">
                <ProductForm
                  onSubmit={handleAdd}
                  onCancel={() => setIsFormOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {products.length > 0 && (
          <div className="flex justify-between items-center py-4 px-2 text-sm text-gray-500">
            <span>
              {products.length} product{products.length !== 1 && "s"} total
            </span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
