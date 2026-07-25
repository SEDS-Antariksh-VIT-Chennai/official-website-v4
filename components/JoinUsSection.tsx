"use client";

import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";

export default function JoinUsSection({ config }: { config?: any }) {
  const customFields = config?.customFields || [];
  const isOpen = config ? config.isOpen : true;
  const requireResume = config ? config.requireResume : true;
  const requirePortfolio = config ? config.requirePortfolio : false;
  return (
    <section id="join" className="relative w-full py-20 bg-background border-t border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Text */}
          <div className="w-full md:w-5/12 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-4"
            >
              Recruitment
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
            >
              Ready to push boundaries?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed mb-12"
            >
              We are always looking for passionate engineers, designers, and visionaries to join our ranks. Apply now to become part of the next generation of space exploration.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-6 font-mono"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white mb-1">2027</span>
                <span className="text-xs uppercase tracking-widest text-white/40">Next Cohort</span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white mb-1">4</span>
                <span className="text-xs uppercase tracking-widest text-white/40">Open Divisions</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12"
          >
            <div className="tech-glass border border-white/20 p-8 md:p-12">
              <form className="flex flex-col gap-6 font-mono" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">First Name</label>
                    <input 
                      type="text" 
                      placeholder="John" 
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 placeholder:text-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@university.edu" 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 placeholder:text-white/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">Department of Interest</label>
                  <select defaultValue="" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 appearance-none rounded-none">
                    <option value="" disabled className="text-black">Select a department</option>
                    <option value="projects" className="text-black">Projects (Engineering)</option>
                    <option value="design" className="text-black">Design & Content</option>
                    <option value="events" className="text-black">Events & Operations</option>
                    <option value="outreach" className="text-black">Outreach & PR</option>
                  </select>
                </div>

                {/* Dynamic Config Fields */}
                {requireResume && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">Resume URL *</label>
                    <input 
                      type="url" 
                      required
                      placeholder="Link to Google Drive or Dropbox" 
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 placeholder:text-white/20"
                    />
                  </div>
                )}

                {requirePortfolio && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">Portfolio URL *</label>
                    <input 
                      type="url" 
                      required
                      placeholder="Link to your projects" 
                      className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent focus:ring-1 focus:ring-white/50 transition-all duration-300 placeholder:text-white/20"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50">Why do you want to join?</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your passion for space..." 
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all duration-300 placeholder:text-white/20 resize-none"
                  />
                </div>

                {/* Custom User Fields */}
                {customFields.map((field: any) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                      {field.label} {field.required && "*"}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea 
                        required={field.required}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-white/50 transition-all duration-300"
                      />
                    ) : (
                      <input 
                        type={field.type === 'url' ? 'url' : 'text'}
                        required={field.required}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:bg-white/10 focus:border-transparent transition-all duration-300"
                      />
                    )}
                  </div>
                ))}

                {!isOpen ? (
                  <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 p-6 text-center rounded-none font-mono text-sm uppercase tracking-widest">
                    Recruitment is currently closed. Check back later!
                  </div>
                ) : (
                  <button type="submit" className="group mt-4 flex tech-border items-center justify-center gap-3 w-full bg-white text-black px-8 py-5 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-500 text-sm">
                    <span className="absolute inset-0 border border-black/20 m-1 pointer-events-none" />
                    Submit Application <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
