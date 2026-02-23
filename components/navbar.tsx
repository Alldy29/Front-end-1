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
    router.push("/sign-in");
  };

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6 relative">
      {/* Left Section */}
      <h1 className="text-lg font-semibold text-gray-800">
        Salary Management System
      </h1>

      {/* Right Section */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <div className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-full">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.name || "Admin"}
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-md py-2 z-50">
            <div className="px-4 py-2 text-sm text-gray-600 border-b">
              {user?.email || "admin@email.com"}
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}