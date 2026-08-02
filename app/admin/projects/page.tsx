import { Plus, Edit2 } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getProjects } from "@/src/actions/admin";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects Management</h1>
          <p className="text-white/50 text-sm">Add, edit, or remove club projects.</p>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-none hover:bg-gray-200 transition-colors">
          <Plus className="w-4 h-4" /> Create Project
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-none tech-glass overflow-x-auto font-mono">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50">
            <tr>
              <th className="px-6 py-4 font-bold">Project Title</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-white">{project.title}</p>
                  <p className="text-white/50 text-xs line-clamp-1">{project.description}</p>
                </td>
                <td className="px-6 py-4 text-white/70">{project.category}</td>
                <td className="px-6 py-4 text-white/50 text-xs uppercase tracking-widest">{project.status}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/projects/${project.id}/edit`} className="p-2 border border-white/5 hover:bg-white/10 hover:border-white/30 rounded-none transition-colors text-white/50 hover:text-white" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={project.id} />
                  </div>
                </td>
              </tr>
            ))}
            
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-white/30">
                  No projects found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
