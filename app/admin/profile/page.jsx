"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters long"),
  }).refine(data => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current password.",
    path: ["newPassword"],
  });

export default function ProfilePage() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/users/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 403) { // Forbidden
            setError("currentPassword", { type: "manual", message: result.message });
        } else {
            throw new Error(result.message || "Failed to change password");
        }
      } else {
        alert("Password changed successfully!");
        reset();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--primary-color)" }}>
        My Profile
      </h1>
      <div className="p-8 rounded-lg shadow-lg max-w-lg mb-10" style={{ backgroundColor: "var(--background-color)" }}>
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="space-y-4">
            <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p style={{ color: "var(--text-color)" }}>{session?.user?.name}</p>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p style={{ color: "var(--text-color)" }}>{session?.user?.email}</p>
            </div>
        </div>
      </div>
      
      <div className="p-8 rounded-lg shadow-lg max-w-lg" style={{ backgroundColor: "var(--background-color)" }}>
        <h2 className="text-xl font-semibold mb-6">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium"
              style={{ color: "var(--text-color)" }}
            >
              Current Password
            </label>
            <input {...register("currentPassword")} id="currentPassword" type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium"
              style={{ color: "var(--text-color)" }}
            >
              New Password
            </label>
            <input {...register("newPassword")} id="newPassword" type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              {isSubmitting ? "Saving..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
