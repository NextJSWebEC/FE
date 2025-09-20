"use client";

import { useEffect, useState, useCallback } from "react";
import { signIn, signUp, signOut, AuthCredentials, AuthResponse } from "../../lib/api/auth";
export function useAuth() {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [loading, setLoading] = useState(true);

  // Lấy user từ localStorage khi load trang
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      localStorage.removeItem("user"); // tránh JSON lỗi
    } finally {
      setLoading(false);
    }
  }, []);

  // Đăng nhập
  const login = useCallback(async (credentials: Pick<AuthCredentials, "phone_number" | "password">) => {
    const data = await signIn(credentials);
    setUser(data.user);
    return data;
  }, []);

  // Đăng ký
  const register = useCallback(async (credentials: AuthCredentials) => {
    const data = await signUp(credentials);
    setUser(data.user);
    return data;
  }, []);

  // Đăng xuất
  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
  }, []);

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
