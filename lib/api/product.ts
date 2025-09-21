import axios from "axios";
import { Product } from "../../types/product";
const API_URL = process.env.NEXT_PUBLIC_API_URL;



// Params cho fetchProducts
interface FetchProductParams {
  keyword?: string;
  category_id?: string | number;
  page?: number;
  limit?: number;
}

export const fetchProducts = async (
  params: FetchProductParams = { keyword: "", category_id: "", page: 0, limit: 40 }
): Promise<Product[]> => {
  try {
    const res = await axios.get(`${API_URL}/products`, { params });
    console.log("Fetching products with params:", res.data.data.products);

    return res.data.data.products; // 👈 đúng mảng BE trả về
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to fetch products");
  }
};
