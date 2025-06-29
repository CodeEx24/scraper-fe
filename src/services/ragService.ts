import type { ApiResponse } from '../types/product';

export async function fetchRagProducts(query: string): Promise<ApiResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/rag/retrieve-rag`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    }
  );
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}
