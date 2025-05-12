// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen p-4 md:p-8 bg-white max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🛍 Product Variant Manager</h1>
        {/* ProductManager component will go here */}
        <Toaster richColors position="bottom-right" />
      </main>
    </QueryClientProvider>
  );
}

export default App;
