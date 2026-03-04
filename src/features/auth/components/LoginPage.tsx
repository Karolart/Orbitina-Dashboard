"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Sparkles, CircleDot, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Login failed");
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      alert("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#F5F9FF] via-[#E0F2FE] to-[#F0F4FF] flex items-center justify-center p-6">

      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#00D9FF]/20 to-[#7FE9DE]/20 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#C77DFF]/20 to-[#9D4EDD]/20 blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-[#FF9F1C]/15 to-[#FF6B35]/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Decorative icons */}
      <motion.div
        className="absolute top-32 right-1/4"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <CircleDot className="w-12 h-12 text-[#00D9FF]/40" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-1/4"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Sparkles className="w-16 h-16 text-[#C77DFF]/40" />
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/70 rounded-[2rem] p-10 shadow-[0_8px_32px_rgba(0,217,255,0.15)] border border-white/40">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              className="relative mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#7FE9DE] shadow-lg shadow-[#00D9FF]/30 overflow-hidden">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#7FE9DE] shadow-lg shadow-[#00D9FF]/30 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="Orbitina Logo"
                    width={80}
                    height={80}
                    className="scale-150 object-contain"
                  />
                </div>
              </div>

              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-6 h-6 text-[#FF9F1C]" fill="#FF9F1C" />
              </motion.div>
            </motion.div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] bg-clip-text text-transparent mb-2">
              ORBITINA AGENTS
            </h1>

            <p className="text-gray-600 text-center">
              Welcome to the future of friendly robotics
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">

            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-full bg-white border border-[#00D9FF]/30 focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/20 px-5 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-full bg-white border border-[#00D9FF]/30 focus:border-[#00D9FF] focus:ring-2 focus:ring-[#00D9FF]/20 px-5 outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7FE9DE] hover:from-[#00C4EA] hover:to-[#6DD4C9] text-[#0F172A] font-semibold shadow-lg shadow-[#00D9FF]/30 hover:shadow-xl hover:shadow-[#00D9FF]/40 transition-all duration-300"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Your friendly AI companions await ✨
            </p>
          </div>
        </div>

        {/* Glow behind card */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00D9FF]/20 via-[#C77DFF]/20 to-[#FF9F1C]/20 rounded-[2rem] blur-2xl" />
      </motion.div>
    </div>
  );
}