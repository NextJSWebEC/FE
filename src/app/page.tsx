import { ProductSlider } from "@/components/ProductSlider";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <ProductSlider categoryId="1" />
      <ProductSlider categoryId="2" />
      <ProductSlider categoryId="3" />
      <ProductSlider categoryId="4" />
    </main>
  );
}
