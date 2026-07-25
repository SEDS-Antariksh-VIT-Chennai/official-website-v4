import { Calendar, Plus, Edit2, Trash2 } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function EventsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  // Mock data for events
  const events = [
    { id: 1, title: "Artemis Rover Challenge 2027", date: "April 12, 2027", location: "Space Robotics Lab", status: "Upcoming" },
    { id: 2, title: "Lunar Rover Workshop", date: "Oct 15, 2026", location: "Main Lab", status: "Completed" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
          <p className="text-white/50 text-sm">Add, edit, or remove missions and gatherings.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-xs rounded hover:bg-gray-200 transition-colors">
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-white/50">
            <tr>
              <th className="px-6 py-4 font-bold">Event Title</th>
              <th className="px-6 py-4 font-bold">Date</th>
              <th className="px-6 py-4 font-bold">Location</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-white">{event.title}</p>
                  <p className="text-white/50 text-xs">{event.status}</p>
                </td>
                <td className="px-6 py-4 text-white/70">{event.date}</td>
                <td className="px-6 py-4 text-white/50 text-xs">{event.location}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-500/10 rounded transition-colors text-white/50 hover:text-red-400" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
