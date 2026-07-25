"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin } from "lucide-react";

export default function ContactUsSection() {
  return (
    <section id="contact" className="relative w-full py-32 bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4"
            >
              Get in Touch
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-8"
            >
              Contact Us
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed mb-12"
            >
              Have a question about our projects, partnerships, or events? Drop us a message and we'll get back to you as soon as possible.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-6 mb-12"
            >
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Email</p>
                  <p className="text-base font-medium">contact@antariksh.edu</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Location</p>
                  <p className="text-base font-medium">VIT Chennai Campus, India</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-12">
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 placeholder:text-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com" 
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help you?" 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 placeholder:text-white/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Type your message here..." 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all duration-300 placeholder:text-white/20 resize-none"
                  />
                </div>

                <button type="submit" className="group mt-4 flex items-center justify-center gap-3 w-full bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]">
                  Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
