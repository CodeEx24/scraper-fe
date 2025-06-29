import { useEffect, useState } from 'react';
import type { ApiProduct } from './types/product';
import { fetchRagProducts } from './services/ragService';
import { QueryInput } from './components/QueryInput/QueryInput';
import { AIResponse } from './components/AIResponse/AIResponse';
import { ProductList } from './components/ProductList/ProductList';
import { Skeleton } from './components/ui/Skeleton';

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow p-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-5 w-10" />
            </div>
            <div className="flex-1 min-w-0">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-5 w-8" />
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-16" />
            ))}
          </div>
          <Skeleton className="h-4 w-40" />
        </div>
        {/* Middle */}
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="lg:col-span-3 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-10" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-2 w-full" />
          </div>
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('Provide top 3 high ctr products?');
  const [aiMessage, setAiMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ApiProduct[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await fetchRagProducts(query);
      setProducts(data.dataRes.products);
      setAiMessage(data.dataRes.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchRagProducts(query);
        setProducts(data.dataRes.products);
        setAiMessage(data.dataRes.message);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            AI Shopping Assistant
          </h1>
          <p className="text-xl text-muted-foreground">
            Ask questions and get personalized product recommendations powered
            by RAG
          </p>
        </div>
        {/* Chat Input */}
        <QueryInput
          query={query}
          setQuery={setQuery}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onClear={() => setQuery('')}
        />
        {/* AI Message */}
        {isLoading ? (
          <Skeleton className="w-full h-40 mb-4 bg-blue-200 border rounded-lg" />
        ) : (
          <AIResponse message={aiMessage} />
        )}
        {/* Products List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
}
