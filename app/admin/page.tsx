import { Users, Calendar, LayoutTemplate, Rocket } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  // Fetch real stats from DB
  const pendingCount = await prisma.application.count({ where: { status: 'PENDING' } });
  const eventsCount = await prisma.event.count();
  const projectsCount = await prisma.project.count();
  const formConfig = await prisma.formConfig.findUnique({ where: { id: 'default' } });
  const customFieldsCount = formConfig?.customFields ? (formConfig.customFields as any[]).length : 0;
  
  const recentApps = await prisma.application.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  const stats = [
    { label: "Pending Applications", value: pendingCount.toString(), icon: Users, href: "/admin/applications", color: "text-blue-400" },
    { label: "Total Projects", value: projectsCount.toString(), icon: Rocket, href: "/admin/projects", color: "text-orange-400" },
    { label: "Total Events", value: eventsCount.toString(), icon: Calendar, href: "/admin/events", color: "text-green-400" },
    { label: "Custom Fields", value: customFieldsCount.toString(), icon: LayoutTemplate, href: "/admin/settings", color: "text-purple-400" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
      <p className="text-white/50 text-sm mb-12">Welcome back. Here's what's happening today.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between hover:bg-white/10 transition-colors group">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">{stat.label}</p>
              <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Recent Applications</h2>
          <div className="flex flex-col gap-4">
            {recentApps.map((app) => (
              <div key={app.id} className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-white text-sm">{app.name}</p>
                  <p className="text-xs text-white/50">{app.department}</p>
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${
                    app.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-400' :
                    app.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                  {app.status}
                </span>
              </div>
            ))}
            {recentApps.length === 0 && (
              <p className="text-white/30 text-sm py-4">No recent applications.</p>
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-6">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Database Connection</span>
              <span className="text-xs uppercase tracking-widest text-green-400">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Google OAuth Setup</span>
              <span className="text-xs uppercase tracking-widest text-green-400">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Form Status</span>
              <span className={`text-xs uppercase tracking-widest ${formConfig?.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                {formConfig?.isOpen ? 'Accepting' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
