"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data user");
      setUserList(data.data || data);
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
      fetchUser();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user";
    
    const method = editingId ? "PATCH" : "POST";

    const body: any = {
      name,
      email,
      role,
    };

    if (password || !editingId) {
      body.password = password;
    }

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Gagal ${editingId ? 'mengupdate' : 'menambahkan'} user`);
      }

      resetForm();
      fetchUser();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("user");
    setEditingId(null);
  };

  const handleEdit = (item: User) => {
    setEditingId(item.id);
    setName(item.name);
    setEmail(item.email);
    setRole(item.role);
    setPassword(""); // Clear password during edit
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus data user ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/master-user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus user");
      }
      fetchUser();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  const [showForm, setShowForm] = useState(false);

  const handleTambahClick = () => {
    resetForm();
    setShowForm(true);
  };

  const handleBatal = () => {
    resetForm();
    setShowForm(false);
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

          {!showForm && (
            <button
              onClick={handleTambahClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              + Tambah User
            </button>
          )}
        </div>

        {/* FORM TAMBAH USER */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              {editingId ? "Edit User" : "Tambah User Baru"}
            </h3>
            <form onSubmit={(e) => { handleSubmit(e); setShowForm(false); }}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Nama User"
                  className="border rounded-lg px-4 py-2 focus:outline-emerald-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="border rounded-lg px-4 py-2 focus:outline-emerald-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder={editingId ? "Password (kosongkan jika tidak ubah)" : "Password"}
                  className="border rounded-lg px-4 py-2 focus:outline-emerald-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!editingId}
                />

                <select
                  className="border rounded-lg px-4 py-2 focus:outline-emerald-500 bg-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={handleBatal}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Proses..." : "Simpan"}
                </button>
              </div>
            </form>
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
                <th className="p-4 w-16">No</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {userList.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-emerald-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 text-sm font-semibold text-emerald-700 uppercase">{user.role}</td>

                  <td className="p-4 text-right space-x-4">
                    <button 
                      onClick={() => { handleEdit(user); setShowForm(true); }}
                      className="text-emerald-600 hover:text-emerald-800 font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {userList.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-500">Data tidak ditemukan.</div>
          )}
        </div>

      </div>
    </div>
  );
}