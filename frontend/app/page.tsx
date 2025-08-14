"use client";

import { useEffect, useState } from "react";
import Nav from "./components/nav";
import { useRouter } from "next/navigation";
import { userservice } from "./services/userservice";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const getData = async () => {
    const userData = await userservice.getUserData();
    setUsername(userData?.name || "Friend");
  };

  useEffect(() => {
    getData();
    if (!localStorage.getItem("token")) {
      router.push("/signup");
    }
  }, [router]);

  return (
    <>
      <Nav />
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-6 text-center">
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl shadow-xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome, {username} 👋
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            PhraseVault is your personal English learning companion. Save
            idioms, expressions, and unique phrases you encounter in daily life.
            Organize them, review them anytime, and watch your vocabulary grow
            naturally.
          </p>
          <p className="text-gray-400 mt-4 text-sm">
            Think of it as your very own treasure chest of language gems ✨.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-900 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Your English, Your Style ✨
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            You don’t need to know every English word to speak with confidence.
            Instead, focus on the words, idioms, and phrasal verbs that feel
            natural to you. Collect them here, review them often, and make them
            part of your everyday conversations.
          </p>
          <p className="text-gray-400 mt-4">
            Over time, your personal collection becomes your unique voice —
            authentic, expressive, and entirely yours.
          </p>
          <button
            onClick={() => router.push("/phrases")}
            className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg transition"
          >
            Start Building Your Collection
          </button>
        </div>
      </section>
    </>
  );
}
