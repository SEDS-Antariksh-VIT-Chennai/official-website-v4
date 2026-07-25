"use client";

import { useState } from "react";
import EventsSection from "@/components/EventsSection";
import MasonryGallery from "@/components/MasonryGallery";
import { motion } from "framer-motion";

export default function EventsPageContent({ events }: { events: any[] }) {
  const [activeTab, setActiveTab] = useState<'events' | 'gallery'>('events');

  // Extract all gallery images from all events
  const allImages = events.flatMap(event => 
    (event.gallery || []).map((url: string) => ({
      url,
      caption: event.title
    }))
  );

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="container mx-auto px-6 md:px-12 flex justify-center mt-8 mb-12">
        <div className="flex items-center gap-2 p-1 border border-white/20 tech-glass">
          <button
            onClick={() => setActiveTab('events')}
            className={`relative z-10 px-8 py-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 rounded-none ${
              activeTab === 'events' 
                ? 'text-black bg-white' 
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`relative z-10 px-8 py-3 text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 rounded-none ${
              activeTab === 'gallery' 
                ? 'text-black bg-white' 
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
          >
            Gallery
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[50vh]">
        {activeTab === 'events' ? (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <EventsSection events={events} noTopPadding={true} />
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 md:px-12 pb-32"
          >
            {allImages.length > 0 ? (
              <MasonryGallery images={allImages} />
            ) : (
              <div className="py-20 w-full flex flex-col items-center justify-center border border-dashed border-white/20 rounded-none tech-glass font-mono">
                <span className="text-4xl mb-4 opacity-50">[GALLERY]</span>
                <p className="text-white/50 uppercase tracking-widest text-xs font-bold">No event photos have been uploaded yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
