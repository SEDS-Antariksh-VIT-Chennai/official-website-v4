"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ContactUsSection() {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0].target) {
        setFooterHeight(entries[0].target.getBoundingClientRect().height);
      }
    });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Spacer to create scrollable area matching the footer's height */}
      <div id="contact" style={{ height: footerHeight }} className="w-full pointer-events-none" />
      
      {/* The actual footer, fixed at the bottom behind the main content */}
      <section 
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full py-8 bg-neutral-900 text-white border-t border-white/10 overflow-hidden z-[-1]"
      >
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6 }}
            className="text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-4"
          >
            Get in Touch
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-2"
          >
            Contact Us
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-white/60 leading-relaxed mb-6"
          >
            Have a question about our projects, partnerships, or events? Reach out to us through any of the channels below.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-6 font-mono"
          >
            <div className="flex items-center gap-4 text-white/70">
              <div className="w-12 h-12 flex items-center justify-center border border-white/20 tech-glass">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Email</p>
                <p className="text-base font-medium">contact@antariksh.edu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-white/70">
              <div className="w-12 h-12 flex items-center justify-center border border-white/20 tech-glass">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Location</p>
                <p className="text-base font-medium">VIT Chennai Campus, India</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 pt-6 border-t border-white/10 w-full justify-center"
          >
            <a href="#" className="w-12 h-12 border border-white/20 tech-glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 border border-white/20 tech-glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 border border-white/20 tech-glass flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </motion.div>

        </div>
      </div>
      </section>
    </>
  );
}
