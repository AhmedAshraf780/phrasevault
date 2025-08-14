"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userservice } from "../services/userservice";
import Image from "next/image";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetched = async () => {
      const data = await userservice.getUserData();
      if (data.success) {
        setLogged(true);
      } else {
        setLogged(false);
      }
      setLoading(false);
    };
    fetched();
  }, []);

  const handleSignOut = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const logout = async () => {
      const data = await userservice.loggingOut();
      if (data.success) {
        router.push("/login");
      }
    };
    logout();
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="w-full bg-[#0a0a0a] backdrop-blur-md border-b border-white/10 sticky top-0 z-50 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/apple-touch-icon.png"
              alt="logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
              phrasevault
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/phrases"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
            >
              Phrases
            </Link>
            <Link
              href="/phrasalverbs"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
            >
              Phrasal Verbs
            </Link>
            <Link
              href="/idioms"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
            >
              Idioms
            </Link>
            {logged ? (
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/90 border-t border-white/10 px-4 py-3 space-y-2">
          <Link
            href="/phrases"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
          >
            Phrases
          </Link>
          <Link
            href="/phrasalverbs"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
          >
            Phrasal Verbs
          </Link>
          <Link
            href="/idioms"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/10"
          >
            Idioms
          </Link>
          {logged ? (
            <button
              onClick={handleSignOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
