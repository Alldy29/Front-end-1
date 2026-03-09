"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutGrid,
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
  ChevronUp,
  LogOut,
  FileText,
  TimerIcon,
  History,
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("Master");
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutGrid size={20} />,
    },

    {
      name: "Master",
      href: "#",
      icon: <Database size={20} />,
      subMenu: [
        { name: "Divisi", href: "/divisi", icon: <Building2 size={18} /> },
        { name: "Jabatan", href: "/jabatan", icon: <Briefcase size={18} /> },
        { name: "Karyawan", href: "/karyawan", icon: <Users size={18} /> },
        { name: "User", href: "/user", icon: <UserSquare2 size={18} /> },
        { name: "Konfigurasi", href: "/konfigurasi", icon: <Settings size={18} /> },
      ],
    },

    {
      name: "Presensi",
      href: "#",
      icon: <CalendarCheck size={20} />,
      subMenu:
        user?.role === "admin"
          ? [
              {
                name: "Report Presensi",
                href: "/presensi",
                icon: <FileText size={18} />,
              },
            ]
          : [
              {
                name: "Kehadiran",
                href: "/presensi",
                icon: <CalendarCheck size={18} />,
              },
            ],
    },

    {
      name: "Cuti",
      href: "#",
      icon: <CalendarDays size={20} />,
      subMenu:
        user?.role === "admin"
          ? [
              {
                name: "Report Cuti",
                href: "/cuti",
                icon: <FileText size={18} />,
              },
            ]
          : [
              {
                name: "Form Pengajuan",
                href: "/cuti",
                icon: <CalendarDays size={18} />,
              },
              {
                name: "Riwayat Cuti",
                href: "/cuti",
                icon: <History size={18} />,
              },
            ],
    },

    {
      name: "Gaji",
      href: "#",
      icon: <Wallet size={20} />,
      subMenu:
        user?.role === "admin"
          ? [
              {
                name: "Proses Gaji",
                href: "/gaji/prosesgaji",
                icon: <TimerIcon size={18} />,
              },
              {
                name: "Report Gaji",
                href: "/gaji/reportgaji",
                icon: <FileText size={18} />,
              },
            ]
          : [
              {
                name: "Slip Gaji",
                href: "/gaji",
                icon: <Wallet size={18} />,
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
    <aside className="w-64 bg-slate-800 min-h-screen text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-white">Salary</span>
            <span className="text-teal-400">App</span>
          </h1>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          if (item.name === "Master" && user?.role !== "admin") return null;

          return (
            <div key={item.name}>
              {item.subMenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.name}
                    </div>

                    {openMenu === item.name ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  {openMenu === item.name && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-slate-600 pl-3">
                      {item.subMenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                            isActive(sub.href)
                              ? "bg-teal-600"
                              : "hover:bg-slate-700"
                          }`}
                        >
                          {sub.icon}
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive(item.href)
                      ? "bg-teal-600"
                      : "hover:bg-slate-700"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700/50">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
            <span className="font-semibold">
              {user?.name?.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>

          <button onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}