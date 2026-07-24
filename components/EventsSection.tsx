"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { useRef, useState } from "react";

const pastEvents = [
  {
    id: 1,
    title: "Lunar Rover Workshop",
    date: "Oct 15, 2026",
    location: "Main Lab",
    description: "Learn the fundamentals of designing a lunar rover chassis and testing suspension systems in a simulated low-gravity environment.",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=800&auto=format&fit=crop",
    status: "Completed",
  },
  {
    id: 2,
    title: "Stargazing Night: Orion",
    date: "Nov 02, 2026",
    location: "Observatory Hill",
    description: "Join us for a clear night of observing the Orion Nebula. Telescopes and hot cocoa provided.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    status: "Completed",
  },
  {
    id: 3,
    title: "Aerospace Industry Panel",
    date: "Nov 18, 2026",
    location: "Auditorium A",
    description: "Hear from ISRO and private aerospace engineers about the future of commercial spaceflight.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    status: "Completed",
  },
  {
    id: 4,
    title: "Sounding Rocket Launch",
    date: "Dec 10, 2026",
    location: "Test Site Alpha",
    description: "Our semesterly sounding rocket launch event. Watch as we attempt to reach 10,000 feet.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop",
    status: "Completed",
  }
];

const upcomingEvent = {
  id: 101,
  title: "Artemis Rover Challenge 2027",
  date: "April 12, 2027",
  time: "10:00 AM - 4:00 PM",
  location: "Space Robotics Lab",
  description: "Join our flagship event of the semester! We are building a mock lunar landscape to test student-built rovers. Form a team, build a rover, and compete in obstacle navigation and sample collection. Winners get an exclusive tour of the national space center.",
  image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1600&auto=format&fit=crop",
  status: "Register Now",
};

export default function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  
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
          
          <div className="flex items-center gap-6 mt-6">
            <button 
              onClick={() => setActiveTab("upcoming")}
              className={`text-2xl md:text-5xl font-bold tracking-tight transition-colors duration-300 ${activeTab === "upcoming" ? "text-white" : "text-white/20 hover:text-white/50"}`}
            >
              Upcoming
            </button>
            <span className="text-white/20 text-3xl font-light">/</span>
            <button 
              onClick={() => setActiveTab("past")}
              className={`text-2xl md:text-5xl font-bold tracking-tight transition-colors duration-300 ${activeTab === "past" ? "text-white" : "text-white/20 hover:text-white/50"}`}
            >
              Past
            </button>
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
              className="container mx-auto px-6 md:px-12"
            >
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
                {/* Poster Image */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 z-0" />
                  <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden z-10 border border-white/10">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                      style={{ backgroundImage: `url(${upcomingEvent.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                </div>

                {/* Details */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <div className="inline-block bg-white text-black text-xs font-bold px-4 py-2 uppercase tracking-widest self-start mb-8">
                    {upcomingEvent.status}
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
                        <p className="text-lg font-medium">{upcomingEvent.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-white/70">
                      <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Time</p>
                        <p className="text-lg font-medium">{upcomingEvent.time}</p>
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

                  <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl">
                    {upcomingEvent.description}
                  </p>

                  <button className="flex items-center justify-center gap-3 w-full sm:w-auto bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white/90 transition-colors">
                    RSVP to Event <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
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
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pr-6 md:pr-12"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="min-w-[320px] md:min-w-[450px] w-[85vw] md:w-[450px] snap-center flex flex-col group cursor-pointer relative overflow-hidden"
                  >
                    {/* Flat Glass Container */}
                    <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl border border-white/10 group-hover:bg-white/[0.05] transition-colors duration-500 z-0" />
                    
                    {/* Image Header */}
                    <div className="relative w-full aspect-[21/9] overflow-hidden z-10 border-b border-white/10">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${event.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em]">
                        {event.status}
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
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{event.location}</span>
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
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
