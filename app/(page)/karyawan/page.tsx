"use client";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function KaryawanPage() {
  const jabatanOptions = ["Staff", "Manager", "HR Officer", "IT Support"];
  const statusOptions = ["Aktif", "Cuti", "Nonaktif"];

  // Data awal karyawan
  const [karyawanList, setKaryawanList] = useState([
    { nik: "001", nama: "Aldyana", email: "aldyana@mail.com", ttl: "Bandung, 01-01-1995", alamat: "Jl. Merdeka 1", jabatan: "Staff", status: "Aktif" },
    { nik: "002", nama: "Budi", email: "budi@mail.com", ttl: "Jakarta, 15-05-1990", alamat: "Jl. Sudirman 2", jabatan: "Manager", status: "Cuti" },
    { nik: "003", nama: "Citra", email: "citra@mail.com", ttl: "Surabaya, 10-08-1992", alamat: "Jl. Pemuda 3", jabatan: "HR Officer", status: "Aktif" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    email: "",
    ttl: "",
    alamat: "",
    jabatan: "",
    status: "",
  });

  const handleTambahClick = () => {
    setShowForm(true);
    setFormData({ nik: "", nama: "", email: "", ttl: "", alamat: "", jabatan: "", status: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimpan = () => {
    // validasi sederhana
    if (!formData.nik || !formData.nama || !formData.jabatan || !formData.status) return;

    setKaryawanList([...karyawanList, formData]);
    setShowForm(false);
    setFormData({ nik: "", nama: "", email: "", ttl: "", alamat: "", jabatan: "", status: "" });
  };

  const handleBatal = () => {
    setShowForm(false);
    setFormData({ nik: "", nama: "", email: "", ttl: "", alamat: "", jabatan: "", status: "" });
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
            onClick={handleTambahClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            + Tambah Karyawan
          </button>
        </div>

        {/* FORM TAMBAH */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">NIK</label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Tempat & Tanggal Lahir</label>
                <input
                  type="text"
                  name="ttl"
                  placeholder="Contoh: Bandung, 01-01-1995"
                  value={formData.ttl}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-1">Alamat</label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Jabatan</label>
                <select
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 bg-white"
                >
                  <option value="">Pilih Jabatan</option>
                  {jabatanOptions.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 bg-white"
                >
                  <option value="">Pilih Status</option>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={handleBatal} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                Batal
              </button>
              <button onClick={handleSimpan} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                Simpan
              </button>
            </div>
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
            <tbody>
              {karyawanList.map((item, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-emerald-50 transition">
                  <td className="p-4 font-medium text-gray-800">{index + 1}</td>
                  <td className="p-4 text-gray-900">{item.nama}</td>
                  <td className="p-4 text-gray-900">{item.jabatan}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-semibold text-xs ${
                      item.status === "Aktif"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Cuti"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>{item.status}</span>
                  </td>
                  <td className="p-4 text-right space-x-4">
                    <button className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800 font-semibold transition">
                      <PencilIcon className="w-5 h-5" /> Edit
                    </button>
                    <button className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold transition">
                      <TrashIcon className="w-5 h-5" /> Hapus
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