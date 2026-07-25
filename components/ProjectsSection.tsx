"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Wrench, Rocket } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  Rocket,
  Wrench,
  Code,
};

export default function ProjectsSection({ 
  projects,
  showViewAll = false,
  noTopPadding = false 
}: { 
  projects: any[],
  showViewAll?: boolean,
  noTopPadding?: boolean 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="projects" className={`relative w-full ${noTopPadding ? 'pb-20' : 'py-20'} bg-background border-t border-white/5 overflow-hidden`}>
      <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col items-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-4"
        >
          Engineering & Research
        </motion.h2>
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-8"
        >
          Our Projects
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 max-w-2xl text-lg"
        >
          Explore the cutting-edge missions and systems developed by our student teams, pushing the boundaries of collegiate aerospace engineering.
        </motion.p>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link 
                href={`/projects/${project.id}`}
                className="flex flex-col group relative overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] h-full w-full block"
              >
              {/* Background layers */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl group-hover:bg-white/[0.05] transition-colors duration-500 z-0" />
              
              {/* Image Header */}
              <div className="relative w-full aspect-[16/9] overflow-hidden z-10 border-b border-white/10">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/60 transition-colors duration-500" />
                
                <div className="absolute top-4 left-4 tech-glass border border-white/20 text-white text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-[0.2em]">
                  {project.status}
                </div>
                
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 tech-glass border border-white/20 flex items-center justify-center">
                    {(() => {
                      const Icon = iconMap[project.iconName] || Rocket;
                      return <Icon className="w-4 h-4 text-white" />;
                    })()}
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-white uppercase shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Glass Content Area */}
              <div className="relative z-10 p-8 flex flex-col flex-1">
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors">
                  {project.title}
                </h4>

                <p className="text-white/60 text-sm leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>
                
                {/* Arrow indicator on hover */}
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">View Project</span>
                  <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex justify-center"
          >
            <Link 
              href="/projects"
              className="group relative tech-border inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 tech-glass text-white hover:bg-white/10 hover:border-white/50 transition-colors duration-500 font-mono uppercase tracking-widest text-sm font-bold w-fit"
            >
              View All Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
