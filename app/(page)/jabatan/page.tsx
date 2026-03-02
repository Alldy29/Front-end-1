"use client";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function KaryawanPage() {
  const divisiOptions = ["Teknologi Informasi", "Sumber Daya Manusia", "Keuangan"];

  // Data awal
  const [karyawanList, setKaryawanList] = useState([
    { jabatan: "Staff", divisi: "Teknologi Informasi", gajiPokok: 3000000 },
    { jabatan: "Manager", divisi: "Keuangan", gajiPokok: 8000000 },
    { jabatan: "HR Officer", divisi: "Sumber Daya Manusia", gajiPokok: 4500000 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jabatan: "",
    divisi: "",
    gajiPokok: "",
  });

  const handleTambahClick = () => {
    setShowForm(true);
    setFormData({ jabatan: "", divisi: "", gajiPokok: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSimpan = () => {
    if (!formData.jabatan.trim() || !formData.divisi || !formData.gajiPokok) return;

    setKaryawanList([
      ...karyawanList,
      {
        jabatan: formData.jabatan.trim(),
        divisi: formData.divisi,
        gajiPokok: Number(formData.gajiPokok),
      },
    ]);

    setShowForm(false);
    setFormData({ jabatan: "", divisi: "", gajiPokok: "" });
  };

  const handleBatal = () => {
    setShowForm(false);
    setFormData({ jabatan: "", divisi: "", gajiPokok: "" });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="flex-1 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Data Jabatan</h2>
            <p className="text-gray-600 mt-1">Daftar Jabatan perusahaan</p>
          </div>
          <button
            onClick={handleTambahClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            + Tambah Jabatan
          </button>
        </div>

        {/* FORM TAMBAH */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Jabatan</label>
                <input
                  type="text"
                  name="jabatan"
                  placeholder="Masukkan Jabatan"
                  value={formData.jabatan}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Pilih Divisi</label>
                <select
                  name="divisi"
                  value={formData.divisi}
                  onChange={handleInputChange}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-emerald-500 bg-white"
                >
                  <option value="">Pilih Divisi</option>
                  {divisiOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Gaji Pokok</label>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:outline-emerald-500">
                  <span className="text-gray-500 mr-2">Rp</span>
                  <input
                    type="number"
                    name="gajiPokok"
                    placeholder="0"
                    value={formData.gajiPokok}
                    onChange={handleInputChange}
                    min={0}
                    className="flex-grow outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-4">
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

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-4 border-b font-semibold text-gray-700 text-lg">Daftar Jabatan</div>
          <table className="w-full text-left table-auto">
            <thead className="bg-emerald-600 text-white text-sm uppercase">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Jabatan</th>
                <th className="p-4">Divisi</th>
                <th className="p-4 text-right">Gaji Pokok</th>
                <th className="p-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {karyawanList.map((item, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-emerald-50 transition">
                  <td className="p-4 font-medium text-gray-800">{index + 1}</td>
                  <td className="p-4 text-gray-900">{item.jabatan}</td>
                  <td className="p-4 text-gray-900">{item.divisi}</td>
                  <td className="p-4 text-right font-semibold text-green-700">
                    Rp {item.gajiPokok.toLocaleString("id-ID")}
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