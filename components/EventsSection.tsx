"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function EventsSection({ events = [] }: { events?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const upcomingCarouselRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Sort and filter events
  const now = new Date();
  
  // Past events (sorted descending by date)
  const pastEvents = events
    .filter(e => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  // Upcoming events (sorted ascending by date)
  const upcomingEvents = events
    .filter(e => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // If there are no upcoming events, default to the past tab
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">(upcomingEvents.length > 0 ? "upcoming" : "past");
  
  // Explicitly format date to prevent server/client hydration mismatch
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Auto-scroll logic for upcoming events
  useEffect(() => {
    if (activeTab !== "upcoming" || upcomingEvents.length <= 1 || isHovering) return;
    
    const interval = setInterval(() => {
      if (upcomingCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = upcomingCarouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const nextScroll = scrollLeft + clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          // Reset to start if at the end
          upcomingCarouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll to next item
          upcomingCarouselRef.current.scrollTo({ left: nextScroll, behavior: "smooth" });
        }
      }
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [activeTab, upcomingEvents.length, isHovering]);

  const scrollPrev = () => {
    const ref = activeTab === "upcoming" ? upcomingCarouselRef : containerRef;
    if (ref.current) {
      ref.current.scrollBy({ left: -ref.current.clientWidth, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    const ref = activeTab === "upcoming" ? upcomingCarouselRef : containerRef;
    if (ref.current) {
      ref.current.scrollBy({ left: ref.current.clientWidth, behavior: "smooth" });
    }
  };

  const showNavigation = activeTab === "upcoming" ? upcomingEvents.length > 1 : pastEvents.length > 1;

  return (
    <section id="events" className="relative w-full py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between">
        <div className="mb-8 md:mb-0">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4"
          >
            Missions & Gatherings
          </motion.h2>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md">
              <div className="relative flex items-center">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`relative z-10 px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-bold tracking-widest uppercase transition-colors duration-500 rounded-full ${activeTab === "upcoming" ? "text-black" : "text-white/50 hover:text-white"}`}
                >
                  Upcoming
                </button>
                {activeTab === "upcoming" && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
              
              <div className="relative flex items-center">
                <button
                  onClick={() => setActiveTab("past")}
                  className={`relative z-10 px-6 md:px-10 py-3 md:py-4 text-sm md:text-base font-bold tracking-widest uppercase transition-colors duration-500 rounded-full ${activeTab === "past" ? "text-black" : "text-white/50 hover:text-white"}`}
                >
                  Past Archive
                </button>
                {activeTab === "past" && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-white rounded-full z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            </div>

            {/* Global Navigation Buttons */}
            <AnimatePresence>
              {showNavigation && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex gap-2"
                >
                  <button 
                    onClick={scrollPrev}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button 
                    onClick={scrollNext}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-all"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" && (
            <motion.div 
              key="upcoming"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {upcomingEvents.length > 0 ? (
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div 
                    ref={upcomingCarouselRef}
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth pb-12"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {upcomingEvents.map((upcomingEvent) => (
                      <div key={upcomingEvent.id} className="min-w-full w-full snap-center flex-shrink-0 flex justify-center">
                        <div onClick={() => window.location.href = `/events/${upcomingEvent.id}`} className="container mx-auto px-6 md:px-12 block group cursor-pointer">
                          <div className="w-full py-10 px-6 md:px-12 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden group-hover:border-white/20 transition-all duration-500">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                            
                            <div className="relative flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
                              {/* Poster Image */}
                          <div className="w-full md:w-1/3 relative group flex-shrink-0">
                            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 z-0 rounded-xl" />
                            <div className="relative aspect-[3/4] overflow-hidden z-10 border border-white/10 flex items-center justify-center bg-white/5 rounded-xl">
                            {upcomingEvent.coverImage ? (
                              <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url(${upcomingEvent.coverImage})` }}
                              />
                            ) : (
                              <Calendar className="w-16 h-16 text-white/20" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="w-full md:w-2/3 flex flex-col">
                          <div className="inline-block bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest self-start mb-6 rounded-sm">
                            Upcoming
                          </div>
                          
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            {upcomingEvent.title}
                          </h3>
                          
                          <div className="flex flex-col gap-4 mb-8">
                            <div className="flex items-center gap-3 text-white/70">
                              <Calendar className="w-5 h-5 text-white/40" />
                              <span className="text-sm font-medium">{new Date(upcomingEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70">
                              <MapPin className="w-5 h-5 text-white/40" />
                              <span className="text-sm font-medium">{upcomingEvent.location}</span>
                            </div>
                            {(upcomingEvent as any).fee && (
                              <div className="flex items-center gap-3 text-white/70">
                                <span className="w-5 h-5 flex items-center justify-center text-white/40 border border-white/20 rounded-full text-[10px] font-bold">$</span>
                                <span className="text-sm font-medium">{(upcomingEvent as any).fee}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-white/60 text-base leading-relaxed max-w-lg mb-12">
                            {upcomingEvent.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-3">
                            {upcomingEvent.buttons && Array.isArray(upcomingEvent.buttons) && upcomingEvent.buttons.length > 0 ? (
                              upcomingEvent.buttons.map((btn: any, i: number) => (
                                <a 
                                  key={i}
                                  href={btn.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors border border-transparent hover:scale-105 transform duration-300 rounded-sm"
                                >
                                  {btn.label} <ArrowRight className="w-4 h-4" />
                                </a>
                              ))
                            ) : null}
                          </div>
                            <div className="mt-8 flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
                              <span className="text-xs font-bold uppercase tracking-widest">View Full Details</span>
                              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    ))}
                  </div>

                      {/* Dots Indicator */}
                      {upcomingEvents.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                          {upcomingEvents.map((_, i) => (
                            <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
                          ))}
                        </div>
                      )}
                </div>
              ) : (
                <div className="container mx-auto px-6 md:px-12">
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="w-6 h-6 text-white/30" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Upcoming Events</h3>
                    <p className="text-white/50">Check back later for new missions and gatherings.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "past" && (
            <motion.div 
              key="past"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full pl-6 md:pl-12 pb-12"
            >
              <div 
                ref={containerRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pr-6 md:pr-12 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {pastEvents.length > 0 ? pastEvents.map((pastEvent, index) => (
                  <Link
                    href={`/events/${pastEvent.id}`}
                    key={pastEvent.id}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="min-w-[320px] md:min-w-[450px] w-[85vw] md:w-[450px] snap-center flex flex-col group cursor-pointer relative overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    >
                      {/* Background layers */}
                    <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl group-hover:bg-white/[0.05] transition-colors duration-500 z-0" />
                    
                    {/* Image Header */}
                    <div className="relative w-full aspect-[21/9] overflow-hidden z-10 border-b border-white/10 bg-white/5 flex items-center justify-center">
                      {pastEvent.coverImage ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${pastEvent.coverImage})` }}
                        />
                      ) : (
                        <Calendar className="w-12 h-12 text-white/20" />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em]">
                        Completed
                      </div>
                    </div>

                    {/* Glass Content Area */}
                    <div className="relative z-10 p-8 flex flex-col flex-1">
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors line-clamp-1">
                        {pastEvent.title}
                      </h4>
                      
                      <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex items-center gap-3 text-white/70">
                      <Calendar className="w-5 h-5 text-white/40" />
                      <span className="text-sm font-medium">{new Date(pastEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <MapPin className="w-5 h-5 text-white/40" />
                      <span className="text-sm font-medium">{pastEvent.location}</span>
                    </div>
                    {(pastEvent as any).fee && (
                      <div className="flex items-center gap-3 text-white/70">
                        <span className="w-5 h-5 flex items-center justify-center text-white/40 border border-white/20 rounded-full text-[10px] font-bold">$</span>
                        <span className="text-sm font-medium">{(pastEvent as any).fee}</span>
                      </div>
                    )}
                  </div>

                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                        {pastEvent.description}
                      </p>
                      
                      {/* Arrow indicator on hover */}
                      <div className="mt-8 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-bold uppercase tracking-widest text-white">Event Details</span>
                        <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )) : (
                  <div className="py-20 w-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl">
                    <Calendar className="w-8 h-8 text-white/30 mb-4" />
                    <p className="text-white/50">No past events yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
