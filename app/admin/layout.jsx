"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, Newspaper, Users, LogOut, Home } from "lucide-react";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { href: "/admin/stories", icon: Newspaper, label: "Stories" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/profile", icon: LayoutDashboard, label: "Profile" },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--accent-color)" }}>
      {/* Sidebar */}
      <aside className="w-64 flex flex-col" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
        <div className="p-6 text-center border-b" style={{ borderColor: "var(--accent-color)"}}>
          <h2 className="text-2xl font-bold" style={{ color: "var(--primary-color)" }}>Admin Panel</h2>
        </div>
        <nav className="flex-grow px-4 py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center p-3 my-2 rounded-lg transition-colors ${
                      pathname.startsWith(item.href)
                        ? "text-white"
                        : "hover:bg-gray-200"
                    }`}
                     style={{
                      backgroundColor: pathname.startsWith(item.href)
                        ? "var(--primary-color)"
                        : "transparent",
                       color: pathname.startsWith(item.href)
                        ? "white"
                        : "var(--text-color)"
                    }}
                  >
                    <item.icon className="mr-3" size={20} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
             <li>
                <Link href="/">
                  <div
                    className="flex items-center p-3 my-2 rounded-lg transition-colors hover:bg-gray-200"
                  >
                    <Home className="mr-3" size={20} />
                    <span>Back to Website</span>
                  </div>
                </Link>
              </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 flex justify-between items-center" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)", borderBottom: '1px solid var(--accent-color)' }}>
          <div>
            <p>Welcome, <span className="font-semibold">{session?.user?.name || session?.user?.email}</span></p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </header>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
