"use client";

import { motion } from "framer-motion";
import { Rocket, PenTool, CalendarRange, Globe } from "lucide-react";

const departments = [
  {
    id: "projects",
    title: "Projects",
    icon: <Rocket className="w-8 h-8 text-white/80" />,
    description:
      "The engineering core. We design, simulate, and build everything from experimental sounding rockets to autonomous lunar rovers.",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "design",
    title: "Design and Content",
    icon: <PenTool className="w-8 h-8 text-white/80" />,
    description:
      "The creative visionaries. We craft the visual identity, 3D assets, UI/UX, and technical documentation that brings our missions to life.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "events",
    title: "Events",
    icon: <CalendarRange className="w-8 h-8 text-white/80" />,
    description:
      "The operational backbone. We organize workshops, industry panels, and massive symposiums to connect students with aerospace leaders.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "outreach",
    title: "Outreach",
    icon: <Globe className="w-8 h-8 text-white/80" />,
    description:
      "The global communicators. We handle public relations, secure industry sponsorships, and run educational programs for local schools.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  },
];

export default function DepartmentsSection() {
  return (
    <section id="departments" className="relative w-full py-20 bg-background border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-4"
        >
          Divisions
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-2xl"
        >
          Four specialized teams. One unified mission.
        </motion.h3>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div 
                className="relative h-96 w-full rounded-none overflow-hidden group cursor-pointer border border-white/20 tech-glass tech-border transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-10 transition-all duration-700 ease-[0.16,1,0.3,1] z-0 scale-100 group-hover:scale-105"
                  style={{ backgroundImage: `url(${dept.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 ease-[0.16,1,0.3,1] z-0" />
                
                {/* Icon */}
                <div className="absolute top-8 right-8 z-10 opacity-50 group-hover:opacity-100 transition-all duration-700 ease-[0.16,1,0.3,1] transform group-hover:scale-110">
                  {dept.icon}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col justify-end">
                  <div className="relative z-10 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-700">
                      {dept.title}
                    </h4>
                    <p className="text-white/50 leading-relaxed group-hover:text-white/80 transition-colors duration-700 max-w-md font-mono text-sm">
                      {dept.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
