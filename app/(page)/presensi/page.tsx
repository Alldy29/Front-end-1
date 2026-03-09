"use client";

import { useState } from "react";

interface PresensiData {
  nik: string;
  nama: string;
  divisi: string;
  jamMasuk: string;
  status: "Hadir" | "Tidak Hadir" | "Izin" | "Sakit";
  tanggal: string; // format yyyy-mm-dd
}

const dataDummy: PresensiData[] = [
  { nik: "EMP001", nama: "Ahmad Fauzi", divisi: "IT", jamMasuk: "08:00", status: "Hadir", tanggal: "2026-03-09" },
  { nik: "EMP002", nama: "Siti Aminah", divisi: "HR", jamMasuk: "08:15", status: "Hadir", tanggal: "2026-03-09" },
  { nik: "EMP003", nama: "Budi Santoso", divisi: "Finance", jamMasuk: "-", status: "Izin", tanggal: "2026-03-09" },
  { nik: "EMP004", nama: "Dewi Lestari", divisi: "IT", jamMasuk: "08:05", status: "Hadir", tanggal: "2026-03-09" },
];

const listDivisi = ["Semua Divisi", "IT", "HR", "Finance"];

export default function ReportPresensi() {
  const [inputNikNama, setInputNikNama] = useState("");
  const [inputTanggal, setInputTanggal] = useState(() => new Date().toISOString().slice(0, 10));
  const [inputDivisi, setInputDivisi] = useState("Semua Divisi");
  const [filteredData, setFilteredData] = useState<PresensiData[]>([]);

  const handleCari = () => {
    const filtered = dataDummy.filter((item) => {
      if (item.tanggal !== inputTanggal) return false;
      if (inputDivisi !== "Semua Divisi" && item.divisi !== inputDivisi) return false;
      if (inputNikNama.trim() !== "" && !(
        item.nik.toLowerCase().includes(inputNikNama.toLowerCase()) ||
        item.nama.toLowerCase().includes(inputNikNama.toLowerCase())
      )) return false;
      return true;
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setInputNikNama("");
    setInputTanggal(new Date().toISOString().slice(0, 10));
    setInputDivisi("Semua Divisi");
    setFilteredData([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 p-8">
      <div className="flex-1 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Report Presensi</h1>
          <p className="text-gray-500 mt-1">Monitoring kehadiran seluruh karyawan secara real-time.</p>
        </div>

        {/* Filter + Button Export */}
        <div className="flex flex-wrap items-center justify-between mb-6 space-y-4 md:space-y-0">

          {/* Filter Inputs */}
          <div className="flex flex-wrap gap-4 flex-1 min-w-[280px]">

            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Cari nama karyawan atau NIK..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={inputNikNama}
                onChange={(e) => setInputNikNama(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1 0 6 6a7.5 7.5 0 0 0 10.65 10.65z" />
              </svg>
            </div>

            <input
              type="date"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={inputTanggal}
              onChange={(e) => setInputTanggal(e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
            />

            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={inputDivisi}
              onChange={(e) => setInputDivisi(e.target.value)}
            >
              {listDivisi.map((divisi) => (
                <option key={divisi} value={divisi}>{divisi}</option>
              ))}
            </select>

            <button
              onClick={handleCari}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-lg shadow-md transition"
            >
              Cari
            </button>

            <button
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 rounded-lg shadow-md transition"
            >
              Reset
            </button>
          </div>

          {/* Export Buttons */}
            {/* <div className="flex gap-3">
                <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-100 flex items-center gap-2 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Export PDF
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8" />
                </svg>
                Cetak Laporan
                </button>
            </div> */}
        </div>

        {/* Data Kehadiran Hari Ini */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6 border-b font-semibold text-gray-900 text-lg">
            Data Kehadiran Hari Ini
          </div>

          <table className="w-full text-left table-auto">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Karyawan</th>
                <th className="p-4">Divisi</th>
                <th className="p-4">Jam Masuk</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {(filteredData.length === 0 ? dataDummy.filter(d => d.tanggal === inputTanggal) : filteredData).map((item, index) => (
                <tr
                  key={item.nik + item.tanggal}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 text-sm font-medium text-gray-700">{index + 1}</td>

                  <td className="p-4 flex flex-col text-gray-900">
                    <span className="font-semibold">{item.nama}</span>
                    <span className="text-xs text-gray-500">{item.nik}</span>
                  </td>

                  <td className="p-4">
                    <span className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full select-none">
                      {item.divisi}
                    </span>
                  </td>

                  <td className="p-4 text-gray-900 font-mono">{item.jamMasuk}</td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        item.status === "Hadir" ? "bg-green-100 text-green-800" :
                        item.status === "Izin" ? "bg-yellow-100 text-yellow-800" :
                        item.status === "Sakit" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => alert(`Detail presensi: ${item.nama}`)}
                      className="text-gray-500 hover:text-gray-700"
                      title="Detail Presensi"
                      aria-label={`Detail presensi ${item.nama}`}
                    >
                      {/* Icon mata (eye) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}

              {/* Jika tidak ada data */}
              {(filteredData.length === 0 && dataDummy.filter(d => d.tanggal === inputTanggal).length === 0) && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">Tidak ada data kehadiran hari ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}