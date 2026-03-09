"use client";

import { Download } from "lucide-react";

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
  {
    nama: "Rina Wijaya",
    id: "EMP004",
    jabatan: "Marketing",
    gaji: 7500000,
    cuti: 100000,
    potongan: 50000,
  },
];

export default function ReportGaji() {
  
  const totalPayroll = dataGaji.reduce(
    (acc, item) => acc + item.gaji + item.cuti - item.potongan,
    0
  );

  const totalPotongan = dataGaji.reduce(
    (acc, item) => acc + item.potongan,
    0
  );

  const totalCuti = dataGaji.reduce(
    (acc, item) => acc + item.cuti,
    0
  );

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold">
            Laporan Gaji Karyawan
          </h1>
          <p className="text-gray-500">
            Laporan rekapitulasi penggajian seluruh divisi
          </p>
        </div>

        <div className="flex gap-3">

          <input
            type="month"
            className="border px-3 py-2 rounded-lg"
          />

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Download size={18} />
            Export Excel
          </button>

        </div>

      </div>

      {/* Card Statistik */}

      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">TOTAL PAYROLL</p>
          <h2 className="text-xl font-bold">
            Rp {totalPayroll.toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">TOTAL POTONGAN</p>
          <h2 className="text-xl font-bold text-red-500">
            Rp {totalPotongan.toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">UANG CUTI DIBAYAR</p>
          <h2 className="text-xl font-bold text-green-600">
            Rp {totalCuti.toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">JUMLAH KARYAWAN</p>
          <h2 className="text-xl font-bold">
            {dataGaji.length}
          </h2>
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
              <th className="p-4 text-center">Total Netto</th>
              <th className="p-4 text-center">Status</th>
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

                  <td className="p-4 text-center">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                      PAID
                    </span>
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

        {/* Grand Total */}

        <div className="flex justify-end p-4 font-bold border-t">
          GRAND TOTAL : Rp {totalPayroll.toLocaleString("id-ID")}
        </div>

      </div>

    </div>
  );
}