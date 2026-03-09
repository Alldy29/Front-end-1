"use client";

import { useState } from "react";
import { Search, Download } from "lucide-react";

const dataCuti = [
  {
    nama: "Ahmad Fauzi",
    id: "EMP001",
    divisi: "IT",
    total: 12,
    terpakai: 4,
  },
  {
    nama: "Siti Aminah",
    id: "EMP002",
    divisi: "HR",
    total: 12,
    terpakai: 2,
  },
  {
    nama: "Budi Santoso",
    id: "EMP003",
    divisi: "Finance",
    total: 12,
    terpakai: 12,
  },
  {
    nama: "Rina Wijaya",
    id: "EMP004",
    divisi: "Marketing",
    total: 15,
    terpakai: 5,
  },
];

export default function ReportCuti() {
  const [search, setSearch] = useState("");

  const filtered = dataCuti.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const totalSaldo = dataCuti.reduce((a, b) => a + b.total, 0);
  const totalTerpakai = dataCuti.reduce((a, b) => a + b.terpakai, 0);

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Report Saldo Cuti</h1>
          <p className="text-gray-500">
            Monitor saldo dan penggunaan cuti seluruh karyawan
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
          <Download size={18} />
          Download Report
        </button>
      </div>

      {/* Search + Summary */}
      <div className="flex gap-4 mb-6">

        {/* Search */}
        <div className="flex items-center border rounded-lg px-3 w-full">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama karyawan..."
            className="p-2 w-full outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Total Saldo */}
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
          <p className="text-sm">TOTAL SALDO</p>
          <h2 className="text-xl font-bold">{totalSaldo} Hari</h2>
        </div>

        {/* Total Terpakai */}
        <div className="bg-red-100 text-red-600 px-6 py-3 rounded-lg">
          <p className="text-sm">TERPAKAI</p>
          <h2 className="text-xl font-bold">{totalTerpakai} Hari</h2>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow">

        <table className="w-full">
          <thead className="border-b text-gray-500 text-sm">
            <tr>
              <th className="p-4 text-left">Karyawan</th>
              <th className="p-4 text-left">Divisi</th>
              <th className="p-4 text-center">Total</th>
              <th className="p-4 text-center">Terpakai</th>
              <th className="p-4 text-center">Sisa Saldo</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item, index) => {
              const sisa = item.total - item.terpakai;

              return (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-semibold">{item.nama}</p>
                    <p className="text-xs text-gray-400">{item.id}</p>
                  </td>

                  <td className="p-4">{item.divisi}</td>

                  <td className="p-4 text-center">{item.total}</td>

                  <td className="p-4 text-center text-red-500 font-semibold">
                    {item.terpakai}
                  </td>

                  <td className="p-4 text-center text-green-600 font-semibold">
                    {sisa}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </div>
  );
}