"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Instagram, Linkedin, Youtube, BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Active Members", value: "200+" },
  { label: "Events", value: "60+" },
  { label: "Years Active", value: "5" },
];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const numMatch = value.match(/\d+/);
  const numericValue = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, '');

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      animate(count, numericValue, { duration: 2.5, ease: [0.16, 1, 0.3, 1] });
    }
  }, [isInView, numericValue, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-20 bg-background border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Header & Title */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-4"
            >
              Who We Are
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Pushing the boundaries of student space exploration.
            </motion.h3>
          </div>

          {/* Description & Stats */}
          <div className="md:col-span-7 md:col-start-6 flex flex-col justify-start mt-8 md:mt-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/70 leading-relaxed mb-12 max-w-2xl"
            >
              SEDS Antariksh is a premier student organization dedicated to fostering passion and innovation in space technology. From designing sounding rockets and lunar rovers to hosting astronomical observation nights, we are cultivating the next generation of space pioneers.
            </motion.p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-b border-white/10 py-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col group cursor-default font-mono"
                >
                  <span className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-white/90 group-hover:scale-105 transition-all duration-500 origin-left">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white/70 transition-colors duration-500">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 flex flex-wrap gap-4"
            >
              <a href="https://www.instagram.com/seds_antariksh/" target="_blank" rel="noopener noreferrer" className="group flex tech-border items-center justify-center gap-2 px-6 py-3 border border-white/20 tech-glass text-white hover:bg-white/10 hover:border-white/50 transition-colors font-mono uppercase tracking-widest text-xs font-bold">
                <Instagram className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" /> Instagram
              </a>
              <a href="https://www.linkedin.com/company/seds-antariksh-vitc/" target="_blank" rel="noopener noreferrer" className="group flex tech-border items-center justify-center gap-2 px-6 py-3 border border-white/20 tech-glass text-white hover:bg-white/10 hover:border-white/50 transition-colors font-mono uppercase tracking-widest text-xs font-bold">
                <Linkedin className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" /> LinkedIn
              </a>
              <a href="https://www.youtube.com/@seds_antariksh" target="_blank" rel="noopener noreferrer" className="group flex tech-border items-center justify-center gap-2 px-6 py-3 border border-white/20 tech-glass text-white hover:bg-white/10 hover:border-white/50 transition-colors font-mono uppercase tracking-widest text-xs font-bold">
                <Youtube className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" /> YouTube
              </a>
              <a href="https://medium.com/@sedsantariksh" target="_blank" rel="noopener noreferrer" className="group flex tech-border items-center justify-center gap-2 px-6 py-3 border border-white/20 tech-glass text-white hover:bg-white/10 hover:border-white/50 transition-colors font-mono uppercase tracking-widest text-xs font-bold">
                <BookOpen className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" /> Medium
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
