"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMaster, setOpenMaster] = useState(false);

  // Auto open master jika salah satu submenu aktif
  useEffect(() => {
    if (
      pathname.startsWith("/divisi") ||
      pathname.startsWith("/jabatan") ||
      pathname.startsWith("/karyawan") ||
      pathname.startsWith("/user") ||
      pathname.startsWith("/konfigurasi")
    ) {
      setOpenMaster(true);
    }
  }, [pathname]);

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0D4C73] text-white p-6 overflow-y-auto shadow-xl">
      
      {/* ===== LOGO ===== */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-14 h-14 bg-gradient-to-tr from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
          💰
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-wide">
            Salary<span className="text-teal-400">App</span>
          </h1>
          <p className="text-xs text-white/60">Management System</p>
        </div>
      </div>

      {/* ===== MENU ===== */}
      <nav className="space-y-2 text-sm">

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            pathname === "/dashboard"
              ? "bg-[#2A628F] shadow-md"
              : "hover:bg-[#1B5E8C]"
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        {/* Master Menu */}
        <div>
          <button
            onClick={() => setOpenMaster(!openMaster)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-[#1B5E8C] transition-all duration-200"
          >
            <span>Master</span>
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                openMaster ? "rotate-180" : ""
              }`}
            />
          </button>

          {openMaster && (
            <div className="ml-5 mt-2 space-y-2 border-l border-white/20 pl-4">

              <SubMenu href="/divisi" label="Divisi" pathname={pathname} />
              <SubMenu href="/jabatan" label="Jabatan" pathname={pathname} />
              <SubMenu href="/karyawan" label="Karyawan" pathname={pathname} />
              <SubMenu href="/user" label="User" pathname={pathname} />
              <SubMenu href="/konfigurasi" label="Konfigurasi" pathname={pathname} />

            </div>
          )}
        </div>

        {/* Menu Lain */}
        <MenuItem href="/presensi" label="Presensi" pathname={pathname} />
        <MenuItem href="/cuti" label="Cuti" pathname={pathname} />
        <MenuItem href="/gaji" label="Gaji" pathname={pathname} />

      </nav>
    </aside>
  );
}

/* ============================= */
/* ===== COMPONENT MENU ======= */
/* ============================= */

function MenuItem({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-xl transition-all duration-200 ${
        pathname.startsWith(href)
          ? "bg-[#2A628F] shadow-md"
          : "hover:bg-[#1B5E8C]"
      }`}
    >
      {label}
    </Link>
  );
}

function SubMenu({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  return (
    <Link
      href={href}
      className={`block py-2 text-sm transition ${
        pathname.startsWith(href)
          ? "text-teal-400 font-semibold"
          : "hover:text-teal-300"
      }`}
    >
      {label}
    </Link>
  );
}