"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function DivisiPage() {
  const [divisi, setDivisi] = useState([
    "Teknologi Informasi",
    "Sumber Daya Manusia",
    "Keuangan",
  ]);
  const [showForm, setShowForm] = useState(false);
  const [namaBaru, setNamaBaru] = useState("");

  const handleTambahClick = () => {
    setShowForm(true);
    setNamaBaru("");
  };

  const handleSimpan = () => {
    if (namaBaru.trim() === "") return;
    setDivisi([...divisi, namaBaru.trim()]);
    setShowForm(false);
    setNamaBaru("");
  };

  const handleBatal = () => {
    setShowForm(false);
    setNamaBaru("");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      {/* MAIN CONTENT */}
      <div className="flex-1 max-w-5xl mx-auto">
        {/* HEADER CARD */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Data Divisi</h2>
            <p className="text-gray-600 mt-1">Kelola daftar divisi perusahaan Anda</p>
          </div>

          <button
            onClick={handleTambahClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            + Tambah Divisi
          </button>
        </div>

        {/* FORM TAMBAH (muncul saat showForm = true) */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <input
              type="text"
              placeholder="Masukkan nama divisi baru"
              className="border rounded-lg px-4 py-2 w-full mb-4"
              value={namaBaru}
              onChange={(e) => setNamaBaru(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleBatal}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                onClick={handleSimpan}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                Simpan
              </button>
            </div>
          </div>
        )}

        {/* TABLE CARD */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-4 border-b font-semibold text-gray-700 text-lg">Daftar Divisi</div>

          <table className="w-full text-left table-auto">
            <thead className="bg-emerald-600 text-white text-sm uppercase">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Nama Divisi</th>
                <th className="p-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {divisi.map((item, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-emerald-50 transition">
                  <td className="p-4 font-medium text-gray-800">{index + 1}</td>
                  <td className="p-4 text-gray-900">{item}</td>
                  <td className="p-4 text-right space-x-4">
                    <button
                      className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800 font-semibold transition"
                      aria-label={`Edit ${item}`}
                    >
                      <PencilIcon className="w-5 h-5" />
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold transition"
                      aria-label={`Hapus ${item}`}
                    >
                      <TrashIcon className="w-5 h-5" />
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}