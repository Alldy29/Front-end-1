"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, Settings2 } from "lucide-react";

export default function KonfigurasiPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tahun: "",
    jatahCuti: "",
    nilaiUang: "",
    status: "",
  });

  const [dataKonfigurasi, setDataKonfigurasi] = useState([
    { id: 1, tahun: "2024", jatahCuti: "12", nilaiUang: "150000", status: "aktif" },
    { id: 2, tahun: "2023", jatahCuti: "12", nilaiUang: "125000", status: "nonaktif" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTambahData = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = {
      id: dataKonfigurasi.length + 1,
      ...formData,
    };
    setDataKonfigurasi([...dataKonfigurasi, newData]);
    setFormData({ tahun: "", jatahCuti: "", nilaiUang: "", status: "" });
    setShowForm(false);
    alert("Konfigurasi tahunan berhasil disimpan!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 gap-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Konfigurasi Sistem</h1>
          <p className="text-gray-500 text-sm">Atur parameter jatah cuti tahunan</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${
            showForm
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : "bg-teal-600 text-white hover:bg-teal-700 shadow-md"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Konfigurasi</>}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-teal-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Settings2 className="text-teal-500" size={20} /> Pengaturan Parameter Baru
          </h2>
          <form onSubmit={handleTambahData} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">Tahun</label>
              <input
                name="tahun"
                type="number"
                placeholder="Contoh: 2024"
                value={formData.tahun}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">Jatah Cuti (Hari)</label>
              <input
                name="jatahCuti"
                type="number"
                placeholder="Contoh: 12"
                value={formData.jatahCuti}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">Nilai Uang Per Cuti (Rp)</label>
              <input
                name="nilaiUang"
                type="number"
                placeholder="Potongan per hari"
                value={formData.nilaiUang}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500 transition-all bg-white"
                required
              >
                <option value="">Pilih Status</option>
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>

            <button
              type="submit"
              className="lg:col-span-4 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 shadow-md flex items-center justify-center gap-2 transition-all mt-2"
            >
              <Save size={18} /> Simpan Konfigurasi
            </button>
          </form>
        </div>
      )}

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-4 border-b font-semibold text-gray-700 text-lg flex items-center gap-2">
          <List size={18} className="text-gray-400" /> Riwayat Pengaturan Tahunan
        </div>

        <table className="w-full text-left table-auto">
          <thead className="bg-teal-600 text-white text-sm uppercase">
            <tr>
              <th className="p-4 text-center">No</th>
              <th className="p-4">Tahun</th>
              <th className="p-4">Jatah Cuti</th>
              <th className="p-4">Nilai Uang</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataKonfigurasi.map((config, index) => (
              <tr key={config.id} className="border-b last:border-0 hover:bg-teal-50 transition">
                <td className="p-4 text-center font-medium text-gray-800">{index + 1}</td>
                <td className="p-4 font-semibold text-gray-900">{config.tahun}</td>
                <td className="p-4 text-gray-900">{config.jatahCuti} Hari</td>
                <td className="p-4 text-gray-900">Rp {Number(config.nilaiUang).toLocaleString("id-ID")}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      config.status === "aktif"
                        ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                        : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                  >
                    {config.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}