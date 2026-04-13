"use client";

import { useEffect, useState } from "react";

interface Jabatan {
  id: number;
  jabatan: string;
}

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number;
  status_aktif: boolean;
  jabatan?: Jabatan;
}

export default function KaryawanPage() {
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form states
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [idJabatan, setIdJabatan] = useState<string>("");
  const [statusAktif, setStatusAktif] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchJabatan = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok) setJabatanList(data.data || data);
    } catch (err) { console.error(err); }
  };

  const fetchKaryawan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      const data = await res.json();
      if (res.ok) setKaryawanList(data.data || data);
    } catch (err) { setError("Gagal mengambil data"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (token) { fetchJabatan(); fetchKaryawan(); }
  }, [token]);

  // --- CRUD FUNCTIONS ---
  const resetForm = () => {
    setNik(""); setNama(""); setEmail(""); setTempatLahir("");
    setTanggalLahir(""); setAlamat(""); setIdJabatan(""); setStatusAktif(true);
    setEditingId(null);
  };

  const handleSimpan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? "PATCH" : "POST";
    const url = editingId 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nik, nama, email, tempat_lahir: tempatLahir,
          tanggal_lahir: tanggalLahir, alamat, id_jabatan: idJabatan,
          status_aktif: statusAktif
        }),
      });

      if (res.ok) {
        resetForm();
        setShowForm(false);
        fetchKaryawan();
      }
    } catch (err) { alert("Gagal menyimpan data"); }
    finally { setLoading(false); }
  };

  const handleEdit = (item: Karyawan) => {
    setEditingId(item.id);
    setNik(item.nik);
    setNama(item.nama);
    setEmail(item.email);
    setTempatLahir(item.tempat_lahir);
    setTanggalLahir(item.tanggal_lahir);
    setAlamat(item.alamat);
    setIdJabatan(item.id_jabatan.toString());
    setStatusAktif(item.status_aktif);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus data karyawan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchKaryawan();
    } catch (err) { alert("Gagal menghapus"); }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="flex-1 max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Data Karyawan</h2>
            <p className="text-gray-600 mt-1">Kelola data karyawan perusahaan</p>
          </div>
          <button
            onClick={() => { 
              if(showForm) resetForm();
              setShowForm(!showForm); 
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            {showForm ? "Tutup Form" : "+ Tambah Karyawan"}
          </button>
        </div>

        {/* FORM TAMBAH / EDIT */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-emerald-700">
              {editingId ? "Edit Karyawan" : "Tambah Karyawan Baru"}
            </h3>
            <form onSubmit={handleSimpan}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">NIK</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan NIK" 
                    value={nik} 
                    onChange={(e) => setNik(e.target.value)} 
                    className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 text-black placeholder-gray-400" 
                    required 
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Nama</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan Nama Lengkap" 
                    value={nama} 
                    onChange={(e) => setNama(e.target.value)} 
                    className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 text-black placeholder-gray-400" 
                    required 
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="contoh@email.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 text-black placeholder-gray-400" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Tempat Lahir</label>
                    <input 
                      type="text" 
                      placeholder="Kota" 
                      value={tempatLahir} 
                      onChange={(e) => setTempatLahir(e.target.value)} 
                      className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 text-black placeholder-gray-400" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                    <input 
                      type="date" 
                      value={tanggalLahir} 
                      onChange={(e) => setTanggalLahir(e.target.value)} 
                      className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 text-black" 
                      required 
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium text-gray-700 mb-1">Alamat</label>
                  <textarea 
                    placeholder="Alamat lengkap..." 
                    value={alamat} 
                    onChange={(e) => setAlamat(e.target.value)} 
                    className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 text-black placeholder-gray-400" 
                    rows={2} 
                    required 
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Jabatan</label>
                  <select 
                    value={idJabatan} 
                    onChange={(e) => setIdJabatan(e.target.value)} 
                    className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 bg-white text-black" 
                    required
                  >
                    <option value="">Pilih Jabatan</option>
                    {jabatanList.map((j) => (
                      <option key={j.id} value={j.id}>{j.jabatan}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={statusAktif ? "1" : "0"} 
                    onChange={(e) => setStatusAktif(e.target.value === "1")} 
                    className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 bg-white text-black"
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button 
                  type="button" 
                  onClick={() => { setShowForm(false); resetForm(); }} 
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-gray-700"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-lg shadow-md transition disabled:opacity-50 font-bold"
                >
                  {loading ? "Proses..." : editingId ? "Update Data" : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE KARYAWAN */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-4 border-b font-semibold text-gray-700 text-lg">Daftar Karyawan</div>
          <table className="w-full text-left table-auto">
            <thead className="bg-emerald-600 text-white text-sm uppercase">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Jabatan</th>
                <th className="p-4">Status</th>
                <th className="p-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {karyawanList.map((item, index) => (
                <tr key={item.id} className="hover:bg-emerald-50 transition">
                  <td className="p-4 font-medium text-gray-800">{index + 1}</td>
                  <td className="p-4">
                    <div className="text-gray-900 font-bold">{item.nama}</div>
                    <div className="text-xs text-gray-500">{item.email}</div>
                  </td>
                  <td className="p-4 text-gray-900">{item.jabatan?.jabatan || 'N/A'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full font-semibold text-xs ${
                      item.status_aktif ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {item.status_aktif ? "Aktif" : "Non-Aktif"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-4">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="text-emerald-600 hover:text-emerald-800 font-semibold transition"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {karyawanList.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-500 italic">Data tidak ditemukan</div>
          )}
        </div>
      </div>
    </div>
  );
}