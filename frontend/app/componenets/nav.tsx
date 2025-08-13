"use client"; // Needed if using Next.js App Router

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userservice } from "../services/userservice";
import Image from "next/image";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLogged(userservice.tokenExists());
  }, []);

  const handleSignOut = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.clear();
    router.push("/login");
  };

  return (
    <nav className="w-full bg-[#0a0a0a] backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/apple-touch-icon.png"
                alt="logo"
                width={40}
                height={40}
                priority
              />
              <span className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200">
                phrasevault
              </span>
            </Link>{" "}
          </div>
          {/* Center Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                href="/phrases"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                Phrases
              </Link>
              <Link
                href="/phrasalverbs"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                Phrasal Verbs
              </Link>
              <Link
                href="/idioms"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10"
              >
                Idioms
              </Link>
            </div>
          </div>

          {/* Sign In + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2"
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
            {logged ? (
              // Sign Out button
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign Out
              </button>
            ) : (
              // Sign In link
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign In
              </Link>
            )}{" "}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 rounded-lg mt-2 border border-white/10">
              <Link
                href="/phrases"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Phrases
              </Link>
              <Link
                href="/phrasal-verbs"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Phrasal Verbs
              </Link>
              <Link
                href="/idioms"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Idioms
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
