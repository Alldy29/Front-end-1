"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Menggunakan URL API kampus yang sudah Anda tes di Thunder Client
      const res = await fetch("/api/proxy-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: "admin", // Menambahkan role sesuai format di Thunder Client
        }),
      });

      // Cek jika response bukan JSON (mencegah error 'Unexpected token <')
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server tidak memberikan respon JSON. Pastikan API aktif.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      alert("Registrasi berhasil! Silakan login.");
      router.push("/sign-in"); // Otomatis pindah ke login setelah sukses
    } catch (err: any) {
      // Menangani error 'Failed to fetch' atau error lainnya
      setError(err.message === "Failed to fetch" 
        ? "Gagal terhubung ke server API. Periksa koneksi internet atau masalah CORS." 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md p-8  mt-16">
        <h1 className="text-center text-2xl font-bold mb-6">Sign Up</h1>
        
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            Full Name
            <input
              type="text"
              placeholder="nama lengkap"
              className="rounded-md border border-gray-400 px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            Email
            <input
              type="email"
              placeholder="admin@gmail.com"
              className="rounded-md border border-gray-400 px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            Password
            <input
              type="password"
              placeholder="******"
              className="rounded-md border border-gray-400 px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-4 py-2 text-white font-bold disabled:opacity-50 mt-2"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <button 
              type="button" 
              onClick={() => router.push("/sign-in")}
              className="font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}