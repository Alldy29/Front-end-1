"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit, List, Save, X, Settings2 } from "lucide-react";

interface Konfigurasi {
  id: number;
  tahun: string;
  jatah_cuti_tahunan: number;
  nilai_uang_per_cuti: number;
  aktif: boolean;
}

export default function KonfigurasiPage() {
  const [konfigurasiList, setKonfigurasiList] = useState<Konfigurasi[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states untuk logika API
  const [tahun, setTahun] = useState("");
  const [jatahCuti, setJatahCuti] = useState("");
  const [nilaiUang, setNilaiUang] = useState("");
  const [aktif, setAktif] = useState(true);

  // Ambil token dari localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const API_URL = "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/konfigurasi";

  // 1. READ: Mengambil data dari API
  const fetchKonfigurasi = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data konfigurasi");
      setKonfigurasiList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchKonfigurasi();
  }, [token]);

  // 2. CREATE & UPDATE Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          tahun,
          jatah_cuti_tahunan: parseInt(jatahCuti),
          nilai_uang_per_cuti: parseInt(nilaiUang),
          aktif: aktif,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memproses data");

      alert(editingId ? "Konfigurasi berhasil diperbarui!" : "Konfigurasi berhasil disimpan!");
      resetForm();
      fetchKonfigurasi();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTahun("");
    setJatahCuti("");
    setNilaiUang("");
    setAktif(true);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // 3. PREPARE EDIT
  const handleEdit = (item: Konfigurasi) => {
    setEditingId(item.id);
    setTahun(item.tahun);
    setJatahCuti(item.jatah_cuti_tahunan.toString());
    setNilaiUang(item.nilai_uang_per_cuti.toString());
    setAktif(item.aktif);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. DELETE Logic
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus konfigurasi ini?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error("Gagal menghapus data");
      fetchKonfigurasi();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8 gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Konfigurasi Sistem</h1>
          <p className="text-gray-600 text-sm font-medium">Atur parameter jatah cuti tahunan</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${
            showForm ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-teal-600 text-white hover:bg-teal-700 shadow-md"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Data</>}
        </button>
      </div>

      {/* Form Section (Create/Update) */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-teal-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
            <Settings2 className="text-teal-500" size={20} /> 
            {editingId ? "Edit Parameter" : "Pengaturan Parameter Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Tahun</label>
              <input
                type="number"
                placeholder="2000"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 text-black font-medium"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Jatah Cuti (Hari)</label>
              <input
                type="number"
                placeholder="000"
                value={jatahCuti}
                onChange={(e) => setJatahCuti(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 text-black font-medium"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Nilai Uang (Rp)</label>
              <input
                type="number"
                placeholder="000"
                value={nilaiUang}
                onChange={(e) => setNilaiUang(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 text-black font-medium"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase">Status Aktif</label>
              <select
                value={aktif ? "aktif" : "nonaktif"}
                onChange={(e) => setAktif(e.target.value === "aktif")}
                className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 text-black font-medium bg-white"
                required
              >
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>
            <div className="lg:col-span-4 flex flex-col items-end gap-2 mt-4">
              {error && <p className="text-red-500 text-sm font-bold animate-bounce">⚠️ {error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-black hover:bg-teal-700 shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <Save size={18} /> {loading ? "Memproses..." : editingId ? "Update Konfigurasi" : "Simpan Konfigurasi"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section (Read) */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-4 border-b font-bold text-gray-900 text-lg flex items-center gap-2">
          <List size={18} className="text-teal-600" /> Riwayat Pengaturan Tahunan
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead className="bg-teal-600 text-white text-[11px] font-bold uppercase tracking-widest">
              <tr>
                <th className="p-4 text-center w-16">No</th>
                <th className="p-4">Tahun</th>
                <th className="p-4">Jatah Cuti</th>
                <th className="p-4">Nilai Uang</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {loading && konfigurasiList.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center animate-pulse font-bold text-gray-500">Memuat data dari database...</td></tr>
              ) : konfigurasiList.length > 0 ? (
                konfigurasiList.map((config, index) => (
                  <tr key={config.id} className="border-b last:border-0 hover:bg-teal-50 transition-colors font-medium">
                    <td className="p-4 text-center text-gray-500">{index + 1}</td>
                    <td className="p-4 font-black">{config.tahun}</td>
                    <td className="p-4 font-bold">{config.jatah_cuti_tahunan} Hari</td>
                    <td className="p-4 text-teal-700 font-bold">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(config.nilai_uang_per_cuti)}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${config.aktif ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}`}>
                        {config.aktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleEdit(config)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit"><Edit size={18} /></button>
                      <button onClick={() => handleDelete(config.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500 italic font-bold">Database kosong. Silakan tambah data baru.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}