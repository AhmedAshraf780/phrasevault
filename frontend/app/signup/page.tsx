"use client";

import { useEffect, useState } from "react";
import { userservice } from "../services/userservice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({ isErr: false, message: "" });
  const router = useRouter();
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await userservice.getUserData();
      if (data.success) {
        setUserData(data);
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await userservice.signUpUser(name, email, password);

    if (!res.success) {
      return setErr({ isErr: true, message: res.message });
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl">
        {/* 🔔 Warning Banner */}
        <div className="mb-6 bg-yellow-500/20 border border-yellow-400 text-yellow-300 p-3 rounded-lg text-sm text-center">
          ⚠ This is a learning project — do <strong>NOT</strong> use your real
          email or password. Your data may not be secure.
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-white/10 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
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
              value={password}
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
            Sign Up
          </button>
        </form>

        {err.isErr && (
          <div className="mt-4 bg-red-500/20 border border-red-500 text-red-400 text-sm p-3 rounded-lg text-center">
            {err.message}
          </div>
        )}

        {/* Footer */}
        <p className="mt-6 text-gray-400 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
