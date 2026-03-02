"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  name?: string;
  email?: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    // Tambahkan z-40 dan w-full agar memenuhi layar ke kanan
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-end px-8 sticky top-0 z-40 w-full">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 focus:outline-none hover:bg-gray-50 p-2 rounded-lg transition"
          aria-haspopup="true"
          aria-expanded={open}
          type="button"
        >
          <div className="w-9 h-9 bg-zinc-800 text-white flex items-center justify-center rounded-full font-bold shadow-sm">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-700 leading-none">
              {user?.name || "Admin"}
            </p>
          </div>
        </button>

        {/* Dropdown Menu */}
        {open && (
          <>
            {/* Overlay untuk menutup dropdown saat klik di luar */}
            <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)}></div>
            
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email</p>
                <p className="text-sm text-gray-600 truncate">{user?.email || "admin@email.com"}</p>
              </div>

              <div className="p-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition rounded-lg font-medium"
                  type="button"
                >
                  Keluar / Logout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}