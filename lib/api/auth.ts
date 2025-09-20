import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Kiểu dữ liệu đăng nhập / đăng ký
export interface AuthCredentials {
  fullname?: string;
  phone_number?: string;
  email: string;
  address?: string;
  password: string;
  retype_password?: string;
  dateOfBirth?: string;
  role_id?: string | number;
}

// Kiểu dữ liệu trả về từ BE
export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    fullname?: string;
    is_active: boolean;
    phone_number?: string;
    address?: string;
    date_of_birth?: string;
    facebook_account_id?: string;
    google_account_id?: string;
    role: {
      id: number;
      name: string;
    };
  };
}

// Đăng nhập
export async function signIn(
  credentials: Pick<AuthCredentials, "phone_number" | "password">
): Promise<AuthResponse> {
  try {
    const res = await axios.post(`${API_URL}/users/login`, credentials);
    const data = res.data;

    // Lưu token và user vào localStorage
    localStorage.setItem("accessToken", data.accessToken);
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
}

// Đăng ký
export async function signUp(credentials: AuthCredentials): Promise<AuthResponse> {
  const payload = {
    ...credentials,
    name: credentials.fullname, // map fullname → name nếu BE yêu cầu
    role_id: 1, // mặc định roleId = 1 (user)
  };
  try {
    const res = await axios.post(`${API_URL}/users/register`, payload);
    const data = res.data;
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
}

// Đăng xuất
export async function signOut(): Promise<void> {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch {
    // Có thể bỏ qua nếu BE không yêu cầu gọi logout
  }

  // Xoá dữ liệu localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}
