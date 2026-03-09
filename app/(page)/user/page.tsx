"use client";

import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function UserPage() {
  const [users, setUsers] = useState([
    { nama: "Andi Saputra", email: "andi@email.com", role: "Admin" },
    { nama: "Budi Santoso", email: "budi@email.com", role: "Staff" },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    role: "",
  });

  const handleTambahClick = () => {
    setShowForm(true);
    setForm({
      nama: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSimpan = () => {
    if (!form.nama || !form.email || !form.password || !form.role) return;

    const newUser = {
      nama: form.nama,
      email: form.email,
      role: form.role,
    };

    setUsers([...users, newUser]);

    setShowForm(false);

    setForm({
      nama: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleBatal = () => {
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="flex-1 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Data User</h2>
            <p className="text-gray-600 mt-1">Kelola data pengguna sistem</p>
          </div>

          <button
            onClick={handleTambahClick}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            + Tambah User
          </button>
        </div>

        {/* FORM TAMBAH USER */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="grid grid-cols-4 gap-4">

              <input
                type="text"
                name="nama"
                placeholder="Nama User"
                className="border rounded-lg px-4 py-2"
                value={form.nama}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border rounded-lg px-4 py-2"
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border rounded-lg px-4 py-2"
                value={form.password}
                onChange={handleChange}
              />

              <select
                name="role"
                className="border rounded-lg px-4 py-2"
                value={form.role}
                onChange={handleChange}
              >
                <option value="">Pilih Role</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Manager">Manager</option>
              </select>

            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleBatal}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                onClick={handleSimpan}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
              >
                Simpan
              </button>
            </div>
          </div>
        )}

        {/* TABLE USER */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-4 border-b font-semibold text-gray-700 text-lg">
            Daftar User
          </div>

          <table className="w-full text-left table-auto">
            <thead className="bg-emerald-600 text-white text-sm uppercase">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-emerald-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{user.nama}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>

                  <td className="p-4 text-right space-x-4">
                    <button className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800 font-semibold">
                      <PencilIcon className="w-5 h-5" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(index)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold"
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