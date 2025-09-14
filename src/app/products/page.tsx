import Link from 'next/link';
import { products } from './data';

export default function ProductsPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Danh sách sản phẩm</h1>
      <ul className="space-y-2">
        {products.map(product => (
          <li key={product.id} className="border p-4 rounded">
            <Link href={`/products/${product.id}`}>
              <h2 className="text-xl">{product.name}</h2>
              <p>{product.price.toLocaleString('vi-VN')}₫</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
