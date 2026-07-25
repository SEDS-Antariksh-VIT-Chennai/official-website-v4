"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

export default function EventsSection({ events = [], showViewAll = false, noTopPadding = false, showTabs = false }: { events?: any[], showViewAll?: boolean, noTopPadding?: boolean, showTabs?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [isHoveringUpcoming, setIsHoveringUpcoming] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pastEvents = events.filter(e => {
    const d = new Date(e.date);
    d.setHours(0,0,0,0);
    return d.getTime() < today.getTime() && e.isPinned;
  });

  const upcomingEventsList = events.filter(e => {
    const d = new Date(e.date);
    d.setHours(0,0,0,0);
    return d.getTime() >= today.getTime();
  });
  
  useEffect(() => {
    if (activeTab !== "upcoming" || upcomingEventsList.length <= 1) return;
    if (isHoveringUpcoming || !isAutoScrolling) return;

    const interval = setInterval(() => {
      setUpcomingIndex(prev => (prev + 1) % upcomingEventsList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab, isHoveringUpcoming, upcomingEventsList.length, isAutoScrolling]);

  const handleScrollClick = (direction: 'left' | 'right') => {
    if (activeTab === "upcoming") {
      setIsAutoScrolling(false);
      if (upcomingEventsList.length <= 1) return;
      if (direction === 'left') {
        setUpcomingIndex(prev => prev === 0 ? upcomingEventsList.length - 1 : prev - 1);
      } else {
        setUpcomingIndex(prev => (prev + 1) % upcomingEventsList.length);
      }
    } else {
      if (containerRef.current) {
        const { current } = containerRef;
        const scrollAmount = direction === 'left' ? -current.offsetWidth + 100 : current.offsetWidth - 100;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const upcomingEvent = upcomingEventsList.length > 0 ? upcomingEventsList[upcomingIndex] : null;

  // Grid view (for /events page)
  if (!showTabs) {
    return (
      <section id="events" className={`relative w-full ${noTopPadding ? 'pb-32' : 'py-32'} bg-background border-t border-white/5 overflow-hidden`}>
        <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div className="mb-8 md:mb-0">
            {!noTopPadding && (
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4"
              >
                Missions & Gatherings
              </motion.h2>
            )}
            
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {noTopPadding ? "Missions & Gatherings" : "Events"}
              </h3>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                
                let status = 'Upcoming';
                if (eventDate.getTime() < today.getTime()) {
                  status = 'Completed';
                } else if (eventDate.getTime() === today.getTime()) {
                  status = 'Ongoing';
                }

                return (
                  <Link href={`/events/${event.id}`} key={event.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col group cursor-pointer relative overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] rounded-2xl bg-white/[0.02] h-full"
                    >
                      <div className="relative w-full overflow-hidden z-10 border-b border-white/10 bg-white/5 flex items-center justify-center shrink-0 aspect-video">
                        {event.coverImage ? (
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${event.coverImage})` }}
                          />
                        ) : (
                          <Calendar className="w-16 h-16 text-white/20" />
                        )}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                        <div className={`absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] ${status === 'Completed' ? '' : 'bg-white text-black'}`}>
                          {status}
                        </div>
                      </div>

                      <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1">
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-white/90 transition-colors line-clamp-2">
                          {event.title}
                        </h4>
                        
                        <div className="flex flex-col sm:flex-row gap-6 mb-6 shrink-0 bg-black/30 p-4 rounded-xl border border-white/5">
                          <div className="flex items-center gap-3 text-white/70">
                            <Calendar className="w-5 h-5 text-white/40" />
                            <span className="text-sm font-medium">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-3 text-white/70">
                            <MapPin className="w-5 h-5 text-white/40" />
                            <span className="text-sm font-medium line-clamp-1">{event.location}</span>
                          </div>
                        </div>

                        <p className="text-white/60 text-base leading-relaxed line-clamp-4 mb-8">
                          {event.description}
                        </p>
                        
                        <div className="mt-auto pt-2 flex items-center justify-center gap-3 bg-white text-black px-6 py-4 font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors rounded">
                          <span>Event Details</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-6 h-6 text-white/30" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Events</h3>
              <p className="text-white/50">Check back later for new missions and gatherings.</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Original Home Page Layout
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
          
          <div className="flex items-center gap-4">
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

            {((activeTab === 'upcoming' && upcomingEventsList.length > 1) || (activeTab === 'past' && pastEvents.length > 1)) && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleScrollClick('left')}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleScrollClick('right')}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" && (
            <motion.div 
              key={`upcoming-${upcomingEvent?.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-6 md:px-12"
              onMouseEnter={() => setIsHoveringUpcoming(true)}
              onMouseLeave={() => setIsHoveringUpcoming(false)}
            >
              {upcomingEvent ? (
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                  {/* Poster Image */}
                  <div className="w-full lg:w-1/3 relative group">
                    <Link href={`/events/${upcomingEvent.id}`} className="block relative h-full">
                      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 z-0" />
                      <div className="relative aspect-[1/1.414] md:aspect-[1/1.414] overflow-hidden z-10 border border-white/10 flex items-center justify-center bg-white/5">
                        {upcomingEvent.coverImage ? (
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                            style={{ backgroundImage: `url(${upcomingEvent.coverImage})` }}
                          />
                        ) : (
                          <Calendar className="w-16 h-16 text-white/20" />
                        )}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </Link>
                  </div>

                  {/* Details */}
                  <div className="w-full lg:w-2/3 flex flex-col">
                    <div className="flex items-center gap-3 mb-8 self-start">
                      <div className="inline-block bg-white text-black text-xs font-bold px-4 py-2 uppercase tracking-widest">
                        Upcoming
                      </div>
                      {upcomingEventsList.length > 1 && (
                        <div className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-[0.2em]">
                          {upcomingIndex + 1} / {upcomingEventsList.length}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                      {upcomingEvent.title}
                    </h3>
                    
                    <div className="flex flex-col gap-6 mb-10">
                      <div className="flex items-center gap-4 text-white/70">
                        <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Date</p>
                          <p className="text-lg font-medium">{new Date(upcomingEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-white/70">
                        <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Location</p>
                          <p className="text-lg font-medium">{upcomingEvent.location}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl line-clamp-4">
                      {upcomingEvent.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {upcomingEvent.buttons && Array.isArray(upcomingEvent.buttons) && upcomingEvent.buttons.length > 0 && (
                        (upcomingEvent.buttons as any[]).map((btn, i) => (
                          <a 
                            key={i}
                            href={btn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full sm:w-auto bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
                          >
                            {btn.label} <ArrowRight className="w-5 h-5" />
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-6 h-6 text-white/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Upcoming Events</h3>
                  <p className="text-white/50">Check back later for new missions and gatherings.</p>
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
              className="container mx-auto px-6 md:px-12 pb-12"
            >
              <div 
                ref={containerRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {pastEvents.length > 0 ? (
                  pastEvents.map((event, index) => (
                    <Link href={`/events/${event.id}`} key={event.id} className="min-w-[320px] md:min-w-[450px] w-[85vw] md:w-[450px] snap-center">
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex flex-col group cursor-pointer relative overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                      >
                        {/* Background layers */}
                        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl group-hover:bg-white/[0.05] transition-colors duration-500 z-0" />
                        
                        {/* Image Header */}
                        <div className="relative w-full aspect-[21/9] overflow-hidden z-10 border-b border-white/10 flex items-center justify-center bg-white/5">
                          {event.coverImage ? (
                            <div 
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{ backgroundImage: `url(${event.coverImage})` }}
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
                            {event.title}
                          </h4>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs text-white/50 mb-6 font-medium tracking-wide uppercase">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                          </div>

                          <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                            {event.description}
                          </p>
                          
                          {/* Arrow indicator on hover */}
                          <div className="mt-8 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Event Details</span>
                            <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))
                ) : (
                  <div className="w-full py-20 text-center">
                    <p className="text-white/50">No past events found.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showViewAll && (
        <div className="container mx-auto px-6 md:px-12 mt-16 flex justify-center">
          <Link 
            href="/events"
            className="group relative flex items-center justify-center gap-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 font-bold uppercase tracking-widest transition-all duration-300 rounded-full"
          >
            View All Events <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </section>
  );
}
