"use client";

import { useEffect, useState } from "react";

interface Divisi {
  id: number;
  divisi: string;
}
interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number;
  gaji_pokok: number;
  divisi?: Divisi; // Populated locally for UI
}


export default function DivisiPage() {
  const [namaDivisi, setNamaDivisi] = useState("");
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  // ===============================
  // GET DATA DIVISI
  // ===============================
  const fetchDivisi = async () => {
    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil data");
      }

      setDivisiList(data.data || data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchDivisi();
  }, [token]);

  // ===============================
  // SIMPAN / UPDATE DIVISI
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          nama_divisi: namaDivisi,
          divisi: namaDivisi,
        }),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response (${res.status}). Check console for details.`);
      }

      if (!res.ok) {
        throw new Error(data.message || `Gagal ${editingId ? 'mengupdate' : 'menambahkan'} divisi`);
      }

      setNamaDivisi("");
      setEditingId(null);
      fetchDivisi(); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // EDIT DIVISI
  // ===============================
  const handleEdit = (divisi: Divisi) => {
    setEditingId(divisi.id);
    setNamaDivisi(divisi.divisi);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ===============================
  // DELETE DIVISI
  // ===============================
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus divisi ini?")) return;

    try {
      const res = await fetch(
        `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus divisi");
      }

      fetchDivisi();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNamaDivisi("");
  };


// ... tetap gunakan import dan logic yang sama di atas ...

  return (
    <div className="space-y-6 p-4">
      {/* ================= HEADER CARD ================= */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-slate-800 tracking-tight">Data Divisi</h2>
          <p className="text-slate-500 mt-2 text-lg">Kelola daftar divisi perusahaan Anda</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setNamaDivisi("");
            // Scroll ke form jika perlu
          }}
          className="bg-[#10b981] hover:bg-[#059669] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-200"
        >
          <span className="text-xl">+</span> Tambah Divisi
        </button>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-6">
          <h3 className="font-bold text-slate-700 text-xl tracking-wide">Daftar Divisi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#10b981] text-white">
              <tr>
                <th className="px-8 py-5 font-bold text-sm uppercase tracking-widest w-20">NO</th>
                <th className="px-8 py-5 font-bold text-sm uppercase tracking-widest">NAMA DIVISI</th>
                <th className="px-8 py-5 font-bold text-sm uppercase tracking-widest text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {divisiList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center text-slate-400 italic">
                    {loading ? "Memuat data..." : "Belum ada data divisi tersedia."}
                  </td>
                </tr>
              ) : (
                divisiList.map((divisi, index) => (
                  <tr key={divisi.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6 text-slate-500 font-medium">{index + 1}</td>
                    <td className="px-8 py-6 font-semibold text-slate-700 text-lg">{divisi.divisi}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-6">
                        <button
                          onClick={() => handleEdit(divisi)}
                          className="flex items-center gap-2 text-[#10b981] hover:text-[#059669] font-bold transition-all"
                        >
                          <span className="text-xl">✏️</span> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(divisi.id)}
                          className="flex items-center gap-2 text-rose-500 hover:text-rose-700 font-bold transition-all"
                        >
                          <span className="text-xl">🗑️</span> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= FORM SECTION (Muncul saat tambah/edit) ================= */}
      <div className="text-black bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-2xl">
            {editingId ? "📝" : "📂"}
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {editingId ? "Edit Data Divisi" : "Tambah Divisi Baru"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider">Nama Divisi</label>
            <input
              type="text"
              placeholder="Masukkan nama divisi..."
              value={namaDivisi}
              onChange={(e) => setNamaDivisi(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#10b981] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#059669] transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
            >
              {loading ? "Memproses..." : editingId ? "Perbarui Data" : "Simpan Divisi"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-8 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}