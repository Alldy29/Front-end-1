"use client";
import { useEffect, useState, useRef } from "react";

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

export default function JabatanPage() {
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [namaJabatan, setNamaJabatan] = useState("");
  const [idDivisi, setIdDivisi] = useState<string>("");
  const [gajiPokok, setGajiPokok] = useState("");

  // Searchable Select states
  const [searchDivisi, setSearchDivisi] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Cleanup searchable select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchDivisi = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setDivisiList(data.data || data);
      }
    } catch (err: unknown) {
      console.error("Fetch Divisi Error:", err);
    }
  };

  const fetchJabatan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data jabatan");
      setJabatanList(data.data || data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDivisi();
      fetchJabatan();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";
    
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
          jabatan: namaJabatan,
          id_divisi: parseInt(idDivisi),
          gaji_pokok: parseInt(gajiPokok),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Gagal ${editingId ? 'mengupdate' : 'menambahkan'} jabatan`);
      }

      setNamaJabatan("");
      setIdDivisi("");
      setGajiPokok("");
      setEditingId(null);
      fetchJabatan();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Jabatan) => {
    setEditingId(item.id);
    setNamaJabatan(item.jabatan);
    setIdDivisi(item.id_divisi.toString());
    setGajiPokok(item.gaji_pokok.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus jabatan");
      }
      fetchJabatan();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const filteredDivisi = divisiList.filter(d => 
    d.divisi.toLowerCase().includes(searchDivisi.toLowerCase())
  );

  const selectedDivisiLabel = divisiList.find(d => d.id.toString() === idDivisi)?.divisi || "Pilih Divisi";

  const getDivisiName = (id: number) => {
    return divisiList.find(d => d.id === id)?.divisi || "N/A";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };



  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Data Jabatan</h2>
          <p className="text-slate-500 mt-1">Daftar Jabatan perusahaan</p>
        </div>

        {/* FORM (Selalu Tampil) */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
          <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#10b981] rounded-full"></span>
            {editingId ? "Edit Jabatan" : "Tambah Jabatan Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Nama Jabatan"
              value={namaJabatan}
              onChange={(e) => setNamaJabatan(e.target.value)}
              className=" text-black border border-slate-400 rounded-xl px-4 py-3 outline-none focus:border-[#10b981]"
              required
            />
            <select
              value={idDivisi}
              onChange={(e) => setIdDivisi(e.target.value)}
              className="text-black border border-slate-400 rounded-xl px-4 py-3 outline-none focus:border-[#10b981] bg-white"
              required
            >
              <option value="">Pilih Divisi</option>
              {divisiList.map((d) => (
                <option key={d.id} value={d.id}>{d.divisi}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Gaji Pokok"
              value={gajiPokok}
              onChange={(e) => setGajiPokok(e.target.value)}
              className="text-black border border-slate-400 rounded-xl px-4 py-3 outline-none focus:border-[#10b981]"
              required
            />
            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#10b981] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#059669] transition disabled:opacity-50"
              >
                {loading ? "Proses..." : editingId ? "Update Jabatan" : "Simpan Jabatan"}
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#10b981] text-white text-[11px] font-bold uppercase tracking-widest">
              <tr>
                <th className="p-5">NO</th>
                <th className="p-5">JABATAN</th>
                <th className="p-5">DIVISI</th>
                <th className="p-5">GAJI POKOK</th>
                <th className="p-5 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jabatanList.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 text-slate-400">{index + 1}</td>
                  <td className="p-5 font-bold text-slate-700">{item.jabatan}</td>
                  <td className="p-5 text-slate-600">
                    {divisiList.find(d => d.id === item.id_divisi)?.divisi || "N/A"}
                  </td>
                  <td className="p-5 font-bold text-[#10b981] text-lg">
                    Rp {Number(item.gaji_pokok).toLocaleString("id-ID")}
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => {
                        setEditingId(item.id);
                        setNamaJabatan(item.jabatan);
                        setIdDivisi(item.id_divisi.toString());
                        setGajiPokok(item.gaji_pokok.toString());
                      }}
                      className="text-[#10b981] font-bold mr-4"
                    >
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-rose-500 font-bold">
                      🗑️ Hapus
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