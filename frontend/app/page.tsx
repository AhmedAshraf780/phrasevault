"use client";

import { useEffect, useState } from "react";
import Nav from "./componenets/nav";
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
    </>
  );
}
