import Link from "next/link";
import { LayoutDashboard, Calendar, Users, Settings, LogOut, Rocket } from "lucide-react";
import { auth, signOut } from "@/auth";
import AdminLoginPage from "./login/page";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Rocket },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Applications", href: "/admin/applications", icon: Users },
  { name: "Form Config", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // If no session, do not wrap with the sidebar layout.
  // This allows full-screen pages like /admin/login and /admin/error to render.
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-white/5 flex flex-col pt-24 pb-8 px-6">
        <div className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-white/50 font-bold mb-4">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium text-white/80 hover:text-white"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin" });
            }}
          >
            <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium text-white/50 w-full">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto pt-24 px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
