"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function UsersDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-8 rounded-lg shadow-lg" style={{ backgroundColor: "var(--background-color)" }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--primary-color)" }}>
          Manage Users
        </h1>
        <Link href="/admin/users/new">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <PlusCircle size={20} />
            Add New User
          </div>
        </Link>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Name</th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
           {users.length === 0 && <p className="text-center py-8 text-gray-500">No users found.</p>}
        </div>
      )}
    </div>
  );
}
