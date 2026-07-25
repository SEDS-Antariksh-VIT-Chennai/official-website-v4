"use client";

import { useState } from "react";
import { ExternalLink, XCircle, ChevronDown } from "lucide-react";
import { updateApplicationStatus } from "@/src/actions/admin";
import { motion, AnimatePresence } from "framer-motion";

export default function ApplicationRow({ app }: { app: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr 
        onClick={() => setIsExpanded(!isExpanded)}
        className="hover:bg-white/[0.05] transition-colors cursor-pointer group"
      >
        <td className="px-6 py-4 align-top">
          <p className="font-bold text-white">{app.name}</p>
          <p className="text-white/50 text-xs">{app.email}</p>
          {app.phone && <p className="text-white/50 text-xs mt-1">{app.phone}</p>}
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-4">
            {app.resumeUrl && (
              <a 
                href={app.resumeUrl} 
                target="_blank" 
                rel="noreferrer" 
                onClick={(e) => e.stopPropagation()} 
                className="flex items-center gap-1 text-xs text-blue-400 hover:underline uppercase tracking-widest font-bold"
              >
                Resume <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {app.portfolio && (
              <a 
                href={app.portfolio} 
                target="_blank" 
                rel="noreferrer" 
                onClick={(e) => e.stopPropagation()} 
                className="flex items-center gap-1 text-xs text-purple-400 hover:underline uppercase tracking-widest font-bold"
              >
                Portfolio <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {!app.resumeUrl && !app.portfolio && (
              <span className="text-xs text-white/30 italic">No external links</span>
            )}
          </div>
        </td>
        <td className="px-6 py-4 text-white/50 text-xs align-top">
          {new Date(app.createdAt).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 align-top">
          <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-none border ${
            app.status === 'ACCEPTED' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
            app.status === 'REJECTED' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
            'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
          }`}>
            {app.status}
          </span>
        </td>
        <td className="px-6 py-4 text-right align-top">
          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
            <form action={async () => {
              await updateApplicationStatus(app.id, 'REJECTED');
            }}>
              <button type="submit" className="p-2 border border-white/5 hover:bg-white/10 hover:border-red-400/50 transition-colors text-white/50 hover:text-red-400" title="Reject">
                <XCircle className="w-4 h-4" />
              </button>
            </form>
          </div>
        </td>
      </tr>
      
      <AnimatePresence>
        {isExpanded && (
          <tr className="bg-white/[0.02] border-b border-white/5">
            <td colSpan={5} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 py-6 w-full">
                  <h4 className="text-[10px] uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                    <ChevronDown className="w-3 h-3" /> Custom Answers
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {app.customAnswers && typeof app.customAnswers === 'object' && Object.keys(app.customAnswers).length > 0 ? (
                      Object.entries(app.customAnswers as Record<string, any>).map(([key, value]) => (
                        <div key={key} className="bg-black/40 border border-white/5 p-4 rounded-none">
                          <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">{key}</span>
                          <span className="block text-sm text-white/90 whitespace-pre-wrap">{value}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-white/30 italic">No custom answers provided.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}
