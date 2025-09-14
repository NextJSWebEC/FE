import { products } from '../data';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return <div className="p-8">Sản phẩm không tồn tại</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-2 text-lg">{product.price.toLocaleString('vi-VN')}₫</p>
      <p className="mt-4">Mô tả sản phẩm đang được cập nhật...</p>
    </main>
  );
}
