"use client";

import { Play } from "lucide-react";

const dataGaji = [
  {
    nama: "Ahmad Fauzi",
    id: "EMP001",
    jabatan: "Manager IT",
    gaji: 15000000,
    cuti: 500000,
    potongan: 200000,
  },
  {
    nama: "Siti Aminah",
    id: "EMP002",
    jabatan: "HR Specialist",
    gaji: 8000000,
    cuti: 0,
    potongan: 100000,
  },
  {
    nama: "Budi Santoso",
    id: "EMP003",
    jabatan: "Frontend Developer",
    gaji: 10000000,
    cuti: 200000,
    potongan: 0,
  },
];

export default function ProsesGaji() {

  const totalPengeluaran = dataGaji.reduce(
    (acc, item) => acc + item.gaji + item.cuti - item.potongan,
    0
  );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold">Proses Gaji Bulanan</h1>
          <p className="text-gray-500">
            Generate dan hitung gaji seluruh karyawan dalam satu klik.
          </p>
        </div>

        <div className="flex gap-3">

          <input
            type="month"
            className="border rounded-lg px-3 py-2"
          />

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Play size={18} />
            Proses Gaji
          </button>

        </div>

      </div>

      {/* Summary Card */}

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">TOTAL PENGELUARAN GAJI</p>
          <h2 className="text-2xl font-bold">
            Rp {totalPengeluaran.toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">TOTAL KARYAWAN</p>
          <h2 className="text-2xl font-bold">{dataGaji.length} Orang</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">STATUS PERIODE</p>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            DRAFT
          </span>
        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="border-b text-gray-500 text-sm">
            <tr>
              <th className="p-4 text-left">Karyawan</th>
              <th className="p-4 text-center">Gaji Pokok</th>
              <th className="p-4 text-center">Uang Cuti</th>
              <th className="p-4 text-center">Potongan</th>
              <th className="p-4 text-center">Total Diterima</th>
            </tr>
          </thead>

          <tbody>

            {dataGaji.map((item, index) => {

              const total = item.gaji + item.cuti - item.potongan;

              return (
                <tr key={index} className="border-b hover:bg-gray-50">

                  <td className="p-4">
                    <p className="font-semibold">{item.nama}</p>
                    <p className="text-xs text-gray-400">
                      {item.id} • {item.jabatan}
                    </p>
                  </td>

                  <td className="p-4 text-center">
                    Rp {item.gaji.toLocaleString("id-ID")}
                  </td>

                  <td className="p-4 text-center text-green-600">
                    +Rp {item.cuti.toLocaleString("id-ID")}
                  </td>

                  <td className="p-4 text-center text-red-500">
                    -Rp {item.potongan.toLocaleString("id-ID")}
                  </td>

                  <td className="p-4 text-center font-bold">
                    Rp {total.toLocaleString("id-ID")}
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