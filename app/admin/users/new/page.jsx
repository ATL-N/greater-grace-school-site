"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function NewUserPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) { // Conflict - user exists
            setError("email", { type: "manual", message: result.message });
        } else {
            throw new Error(result.message || "Failed to create user");
        }
      } else {
        alert("User created successfully!");
        router.push("/admin/users");
        router.refresh();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--primary-color)" }}>
        Add New User
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 rounded-lg shadow-lg max-w-lg" style={{ backgroundColor: "var(--background-color)" }}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>Full Name</label>
          <input {...register("name")} id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>Email Address</label>
          <input {...register("email")} id="email" type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium" style={{ color: "var(--text-color)" }}>Password</label>
          <input {...register("password")} id="password" type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }} />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-gray-100 hover:bg-gray-200">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}
