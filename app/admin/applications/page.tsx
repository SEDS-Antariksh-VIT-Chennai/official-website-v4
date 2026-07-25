import { ExternalLink, CheckCircle, XCircle, Search, ChevronDown } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getApplications, updateApplicationStatus } from "@/src/actions/admin";
import ExportButtons from "./ExportButtons";
import ApplicationRow from "./ApplicationRow";

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
        <ExportButtons applications={applications} />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-none tech-glass overflow-hidden font-mono">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              className="w-full bg-black/50 border border-white/10 rounded-none px-10 py-2 text-sm text-white focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50">
              <tr>
                <th className="px-6 py-4 font-bold w-[30%]">Applicant</th>
                <th className="px-6 py-4 font-bold w-[30%]">Links</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {applications.map((app) => (
                <ApplicationRow key={app.id} app={app} />
              ))}
            </tbody>
          </table>
        </div>
        
        {applications.length === 0 && (
          <div className="p-12 text-center text-white/30 uppercase tracking-widest text-xs font-bold">
            No applications found.
          </div>
        )}
      </div>
    </div>
  );
}
