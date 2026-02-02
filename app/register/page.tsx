import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-900">
        
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/next.svg"
            alt="Logo"
            width={80}
            height={20}
            className="dark:invert"
          />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Register
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Buat akun baru
        </p>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan username"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Konfirmasi Password
            </label>
            <input
              type="password"
              placeholder="Ulangi password"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2 text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Daftar
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Sudah punya akun?{" "}
          <a href="/login" className="font-medium text-black dark:text-white">
            Login
          </a>
        </p>
      </main>
    </div>
  );
}
