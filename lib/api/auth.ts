import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Kiểu dữ liệu đăng nhập / đăng ký
export interface AuthCredentials {
  fullname?: string;
  phoneNumber?: string;
  email: string;
  address?: string;
  password: string;
  retypePassword?: string;
  dateOfBirth?: string;
}

// Kiểu dữ liệu trả về từ BE
export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    fullname?: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: string;
  };
}

// Đăng nhập
export async function signIn(credentials: Pick<AuthCredentials, "email" | "password">): Promise<AuthResponse> {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, credentials);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

// Đăng ký (sign up)
export async function signUp(credentials: AuthCredentials): Promise<AuthResponse> {
  const payload = {
    ...credentials,
    name: credentials.fullname, // map fullname → name nếu BE cần
  };
  try {
    const res = await axios.post(`${API_URL}/register`, payload);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
}

// Đăng xuất
export async function signOut(): Promise<void> {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch (error) {
    // Có thể bỏ qua nếu BE không cần gọi logout
  }
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
