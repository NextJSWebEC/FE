export interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  totalPages: number;
  created_at: string;
  updated_at: string;
  product_images: { id: number; image_url: string }[];
  comments: any[];
  favorites: any[];
  category_id: number;
  color: string;
}