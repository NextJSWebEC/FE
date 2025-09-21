"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { fetchProducts } from "../../lib/api/product";
import { Product } from "../../types/product";
import { mockProducts } from "../../MockData/products";
export const ProductSlider = ({ categoryId }: { categoryId?: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchProducts({ keyword: "", category_id: categoryId, page: 0, limit: 12 }) // lấy 12 sản phẩm đầu
  //     .then((data) => setProducts(data))
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));

  // }, [categoryId]);
  useEffect(() => {
    // Sử dụng mock data thay vì fetch từ API
    setProducts(mockProducts);
    console.log("Using mock products:", mockProducts);
    setLoading(false);
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (!products) return <p className="text-center">No products found.</p>;

  return (
    <div className="w-full px-4">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="rounded-xl shadow hover:shadow-lg transition bg-white p-4 mt-8">
              <img
                // src={`${process.env.NEXT_PUBLIC_API_URL}/products/images/${p.thumbnail}`}
                src={p.thumbnail}
                alt={p.name}
                className="w-full h-40 object-cover rounded-lg cursor-pointer"
              />
              <h3 className="text-lg font-semibold mt-3 line-clamp-2 h-24 text-black">{p.name}</h3>
              <p className="text-gray-600">{p.price.toLocaleString()} ₫</p>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
