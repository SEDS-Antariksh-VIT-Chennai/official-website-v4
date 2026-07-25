"use client";

import { Trash2, AlertTriangle, X } from "lucide-react";
import { useTransition, useState, useEffect } from "react";
import { deleteProject } from "@/src/actions/admin";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const confirmDelete = () => {
    startTransition(() => {
      deleteProject(id);
      setShowModal(false);
    });
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        disabled={isPending}
        className="p-2 border border-white/5 hover:bg-red-500/10 hover:border-red-500/50 rounded-none transition-colors text-white/50 hover:text-red-400 disabled:opacity-50" 
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {showModal && (
            <div 
              className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="tech-glass tech-border p-6 w-full max-w-md shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-4 items-start mb-6">
                  <div className="w-10 h-10 rounded-none bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Delete Project?</h3>
                    <p className="text-white/60 text-sm leading-relaxed text-left">
                      Are you sure you want to delete this project? This action cannot be undone and it will be permanently removed from the database.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-none transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-red-600/80 hover:bg-red-500 rounded-none border border-red-500/50 hover:border-red-500 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
