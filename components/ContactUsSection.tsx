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
      <div id="contact" style={{ height: footerHeight }} className="w-full" />
      
      {/* The actual footer, fixed at the bottom behind the main content */}
      <section 
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full py-16 bg-white text-black border-t border-black/10 overflow-hidden z-0"
      >
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-black/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-[0.3em] text-black/50 mb-4"
          >
            Get in Touch
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-black leading-tight mb-6"
          >
            Contact Us
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-black/60 leading-relaxed mb-10"
          >
            Have a question about our projects, partnerships, or events? Reach out to us through any of the channels below.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-10"
          >
            <div className="flex items-center gap-4 text-black/70">
              <div className="w-12 h-12 flex items-center justify-center border border-black/10 bg-black/5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-black/40 mb-1">Email</p>
                <p className="text-base font-medium">contact@antariksh.edu</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-black/70">
              <div className="w-12 h-12 flex items-center justify-center border border-black/10 bg-black/5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-black/40 mb-1">Location</p>
                <p className="text-base font-medium">VIT Chennai Campus, India</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4 pt-8 border-t border-black/10 w-full justify-center"
          >
            <a href="#" className="w-12 h-12 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-black/50 hover:text-black hover:bg-black/10 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-black/50 hover:text-black hover:bg-black/10 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-black/50 hover:text-black hover:bg-black/10 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </motion.div>

        </div>
      </div>
      </section>
    </>
  );
}
