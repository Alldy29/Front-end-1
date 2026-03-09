"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  Database,
  Building2,
  Briefcase,
  Users,
  UserSquare2,
  Settings,
  CalendarCheck,
  CalendarDays,
  Wallet,
  ChevronDown,
  LogOut,
  FileText,
  TimerIcon,
  History,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("Master");
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },

    {
      name: "Master",
      icon: <Database size={18} />,
      subMenu: [
        { name: "Divisi", href: "/divisi", icon: <Building2 size={16} /> },
        { name: "Jabatan", href: "/jabatan", icon: <Briefcase size={16} /> },
        { name: "Karyawan", href: "/karyawan", icon: <Users size={16} /> },
        { name: "User", href: "/user", icon: <UserSquare2 size={16} /> },
        { name: "Konfigurasi", href: "/konfigurasi", icon: <Settings size={16} /> },
      ],
    },

    {
      name: "Presensi",
      icon: <CalendarCheck size={18} />,
      subMenu:
        user?.role === "admin"
          ? [
              {
                name: "Report Presensi",
                href: "/presensi",
                icon: <FileText size={16} />,
              },
            ]
          : [
              {
                name: "Kehadiran",
                href: "/presensi",
                icon: <CalendarCheck size={16} />,
              },
            ],
    },

    {
      name: "Cuti",
      icon: <CalendarDays size={18} />,
      subMenu:
        user?.role === "admin"
          ? [
              {
                name: "Report Cuti",
                href: "/cuti",
                icon: <FileText size={16} />,
              },
            ]
          : [
              {
                name: "Pengajuan Cuti",
                href: "/cuti",
                icon: <CalendarDays size={16} />,
              },
              {
                name: "Riwayat Cuti",
                href: "/cuti",
                icon: <History size={16} />,
              },
            ],
    },

    {
      name: "Gaji",
      icon: <Wallet size={18} />,
      subMenu:
        user?.role === "admin"
          ? [
              {
                name: "Proses Gaji",
                href: "/gaji/prosesgaji",
                icon: <TimerIcon size={16} />,
              },
              {
                name: "Report Gaji",
                href: "/gaji/reportgaji",
                icon: <FileText size={16} />,
              },
            ]
          : [
              {
                name: "Slip Gaji",
                href: "/gaji",
                icon: <Wallet size={16} />,
              },
            ],
    },
  ];

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/sign-in";
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0D4C73] text-white p-6 overflow-y-auto shadow-xl">

      {/* Logo */}
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

      {/* Menu */}
      <nav className="space-y-2 text-sm">

        {menuItems.map((menu) => (
          <div key={menu.name}>
            {!menu.subMenu ? (
              <Link
                href={menu.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                  isActive(menu.href)
                    ? "bg-[#2A628F]"
                    : "hover:bg-[#1B5E8C]"
                }`}
              >
                {menu.icon}
                {menu.name}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-[#1B5E8C]"
                >
                  <span className="flex items-center gap-3">
                    {menu.icon}
                    {menu.name}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openMenu === menu.name ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMenu === menu.name && (
                  <div className="ml-5 mt-2 space-y-2 border-l border-white/20 pl-4">
                    {menu.subMenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={`flex items-center gap-2 py-2 text-sm ${
                          isActive(sub.href)
                            ? "text-teal-400 font-semibold"
                            : "hover:text-teal-300"
                        }`}
                      >
                        {sub.icon}
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

      </nav>

      {/* Logout */}
      
    </aside>
  );
}