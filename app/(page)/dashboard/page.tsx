"use client";

import React from "react";
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  UserCheck, 
  Clock 
} from "lucide-react";

// Komponen Stat Card untuk bagian atas dashboard
const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center gap-4">
    <div className={`p-4 rounded-lg ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black text-gray-900">{value}</h3>
    </div>
  </div>
);

export default function DashboardPage() {
  // Data Dumi untuk Statistik
  const stats = [
    { title: "Total Karyawan", value: "124", icon: Users, color: "bg-blue-500" },
    { title: "Total Jabatan", value: "12", icon: Briefcase, color: "bg-teal-500" },
    { title: "Pengeluaran Gaji", value: "Rp 450.000.000", icon: DollarSign, color: "bg-emerald-500" },
    { title: "Kehadiran Hari Ini", value: "95%", icon: UserCheck, color: "bg-orange-500" },
  ];

  // Data Dumi untuk Aktivitas Terbaru
  const recentActivities = [
    { id: 1, user: "Rayi Dwika", action: "Melakukan Presensi Masuk", time: "08:00 AM" },
    { id: 2, user: "Agung S", action: "Mengajukan Cuti Tahunan", time: "09:15 AM" },
    { id: 3, user: "Hidayat", action: "Update Data Jabatan: Manager", time: "10:30 AM" },
    { id: 4, user: "Rangga", action: "Melakukan Presensi Masuk", time: "08:05 AM" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 gap-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h1 className="text-2xl font-black text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 text-sm font-medium">Selamat datang kembali di SalaryApp Management System</p>
      </div>

      {/* Grid Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tabel Aktivitas Terbaru (Desain mirip tabel Master) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-4 border-b font-bold text-gray-900 text-lg flex items-center gap-2">
            <TrendingUp size={20} className="text-teal-600" /> Aktivitas Karyawan Terbaru
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead className="bg-teal-600 text-white text-[11px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="p-4">Karyawan</th>
                  <th className="p-4">Aktivitas</th>
                  <th className="p-4">Waktu</th>
                </tr>
              </thead>
              <tbody className="text-black font-medium">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="border-b last:border-0 hover:bg-teal-50 transition-colors">
                    <td className="p-4 font-black text-gray-900">{activity.user}</td>
                    <td className="p-4 text-gray-600">{activity.action}</td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                        <Clock size={14} /> {activity.time}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box Tambahan */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col gap-4">
          <h3 className="font-black text-gray-900 border-b pb-2">Catatan Sistem</h3>
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-xs font-bold text-blue-700 uppercase">Pengumuman</p>
            <p className="text-sm text-blue-900 font-medium mt-1">
              Payroll periode April 2026 akan diproses pada tanggal 25. Pastikan semua data presensi sudah valid.
            </p>
          </div>
          <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
            <p className="text-xs font-bold text-orange-700 uppercase">Peringatan</p>
            <p className="text-sm text-orange-900 font-medium mt-1">
              Ada 3 pengajuan cuti yang belum disetujui. Mohon segera cek menu Cuti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}