"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          MyEC
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700">Hello, {user?.email}</span>
              <button
                onClick={logout}
                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
