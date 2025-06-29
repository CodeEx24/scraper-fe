import type { FC } from 'react';
import type { ApiProduct } from '../../types/product';
import { ProductCard } from './ProductCard';

export const ProductList: FC<{ products: ApiProduct[] }> = ({ products }) => (
  <div className="space-y-4">
    {products.map((product, index) => (
      <ProductCard
        key={product.title + index}
        product={product}
        index={index}
      />
    ))}
  </div>
);
