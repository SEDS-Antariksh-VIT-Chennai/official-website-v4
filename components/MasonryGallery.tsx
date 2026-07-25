"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function MasonryGallery({ images }: { images: { url: string, caption?: string }[] }) {
  const [selectedImage, setSelectedImage] = useState<{ url: string, caption?: string } | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            className="relative w-full break-inside-avoid overflow-hidden rounded-none border border-white/20 tech-glass group cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm z-0" />
            <img 
              src={img.url} 
              alt={`Gallery Image ${idx + 1}`} 
              className="relative z-10 w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
              <span className="text-white text-xs font-mono font-bold uppercase tracking-widest bg-black/50 px-4 py-2 rounded-none border border-white/20 backdrop-blur-md tech-glass tech-border">
                [View Full]
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-none border border-white/20 tech-glass tech-border transition-colors z-[10000]"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-6 h-6" />
          </button>
          
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            src={selectedImage.url} 
            alt="Full size gallery image" 
            className="max-w-full max-h-[90vh] object-contain rounded-none border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          />
          
          {selectedImage.caption && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-none text-xs font-mono font-bold tracking-widest uppercase shadow-2xl tech-glass tech-border"
            >
              {selectedImage.caption}
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}
