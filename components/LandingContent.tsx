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
        className="inline-flex items-center gap-3 px-5 py-2 border border-white/20 mb-8 tech-glass tech-border"
      >
        <span className="w-2 h-2 bg-white animate-pulse" />
        <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white">Exploring Beyond Boundaries</span>
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

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 font-mono">
        <Link
          href="/join"
          className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-gray-200"
        >
          <span className="absolute inset-0 border border-black/20 m-1 pointer-events-none" />
          Join The Mission
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/events"
          className="group tech-border relative inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/50 transition-colors uppercase tracking-widest text-sm font-bold"
        >
          Explore Events
          <Globe className="w-4 h-4 text-white transition-colors" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
