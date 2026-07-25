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
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 md:h-screen md:sticky top-0 border-b md:border-b-0 md:border-r border-white/10 bg-black flex flex-col pt-24 pb-4 md:pb-8 px-4 md:px-6 z-40">
        <div className="mb-4 md:mb-12 flex items-center justify-end md:block">
          
          <div className="md:hidden">
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin" });
              }}
            >
              <button type="submit" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest text-white/50">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
        
        <nav className="flex overflow-x-auto md:flex-col gap-2 pb-2 md:pb-0 scrollbar-hide">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 md:py-3 rounded-none tech-glass tech-border transition-colors text-sm font-mono font-bold uppercase tracking-widest text-white/80 hover:text-white whitespace-nowrap"
            >
              <link.icon className="w-4 h-4 shrink-0" />
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="mt-auto hidden md:block">
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
      <main className="flex-1 overflow-auto md:h-screen pt-8 md:pt-24 px-4 md:px-8 pb-12 w-full">
        <div className="max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
