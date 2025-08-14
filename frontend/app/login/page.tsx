"use client";
interface UserError {
  success: boolean;
  message: string;
}
import { userservice } from "../services/userservice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { UserResponse } from "../services/userservice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({ isErr: false, message: "" });
  const [userData, setUserData] = useState<UserResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const existed = await userservice.isUserExisted();
      console.log("existed", existed);
      if (existed) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    fetchData();
    router.push("/signup");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res: UserError | { success: true } = await userservice.logInUser(
      email,
      password
    );
    if (!res.success) {
      return setErr({ isErr: true, message: res.message });
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Sign In
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        {err.isErr && (
          <div className="mt-4 bg-red-500/20 border border-red-500 text-red-400 text-sm p-3 rounded-lg text-center">
            {err.message}
          </div>
        )}

        {/* Footer */}
        <p className="mt-6 text-gray-400 text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
