import { ExternalLink, CheckCircle, XCircle, Search } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getApplications, updateApplicationStatus } from "@/src/actions/admin";

export default async function ApplicationsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const applications = await getApplications();

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Form Submissions</h1>
          <p className="text-white/50 text-sm">Review and manage recruitment applications.</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              className="w-full bg-black/50 border border-white/10 rounded px-10 py-2 text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <select className="bg-black/50 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none">
            <option value="all">All Departments</option>
            <option value="robotics">Space Robotics</option>
            <option value="aerospace">Aerospace</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50">
            <tr>
              <th className="px-6 py-4 font-bold">Applicant</th>
              <th className="px-6 py-4 font-bold">Department</th>
              <th className="px-6 py-4 font-bold">Date</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-white">{app.name}</p>
                  <p className="text-white/50 text-xs">{app.email}</p>
                </td>
                <td className="px-6 py-4 text-white/70">{app.department}</td>
                <td className="px-6 py-4 text-white/50 text-xs">{app.createdAt.toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${
                    app.status === 'ACCEPTED' ? 'bg-green-500/20 text-green-400' :
                    app.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <form action={async () => {
                      "use server";
                      await updateApplicationStatus(app.id, 'ACCEPTED');
                    }}>
                      <button type="submit" className="p-2 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-green-400" title="Accept">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </form>
                    <form action={async () => {
                      "use server";
                      await updateApplicationStatus(app.id, 'REJECTED');
                    }}>
                      <button type="submit" className="p-2 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-red-400" title="Reject">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {applications.length === 0 && (
          <div className="p-12 text-center text-white/30">
            No applications found.
          </div>
        )}
      </div>
    </div>
  );
}
