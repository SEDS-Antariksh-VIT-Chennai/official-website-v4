"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

export default function LandingContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl text-center flex flex-col items-center relative z-10"
    >
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">Exploring Beyond Boundaries</span>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-6xl md:text-8xl lg:text-[8rem] font-extrabold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-none"
      >
        SEDS ANTARIKSH
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-white/50 leading-relaxed mb-12 max-w-2xl font-light"
      >
        We are a premier student organization dedicated to fostering passion and innovation in space technology. 
        Join us as we build experimental rovers, launch sounding rockets, and reach for the stars.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center gap-6">
        <Link
          href="/join"
          className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
        >
          Join The Mission
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/events"
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 uppercase tracking-widest text-sm font-bold"
        >
          Explore Events
          <Globe className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
