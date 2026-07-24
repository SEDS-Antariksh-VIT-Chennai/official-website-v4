"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active Members", value: "150+" },
  { label: "Space Projects", value: "12" },
  { label: "Workshops", value: "24+" },
  { label: "Years Active", value: "5" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Header & Title */}
          <div className="md:col-span-4 flex flex-col justify-start">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4"
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
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col"
                >
                  <span className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest text-white/50">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16"
            >
              <Link 
                href="#team" 
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition-colors border-b border-white/20 hover:border-white pb-1"
              >
                Meet the Team <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
