"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, ArrowLeft, CheckCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { submitApplication } from "@/src/actions/public";

type FormField = { id: string; type: string; label: string; required: boolean; options?: string[] };
type FormPage = { id: string; title: string; description: string; fields: FormField[]; targetDepartment?: string; };

export default function JoinUsSection({ config }: { config?: any }) {
  const isOpen = config ? config.isOpen : true;
  const requireResume = config ? config.requireResume : true;
  const requirePortfolio = config ? config.requirePortfolio : false;
  
  let pages: FormPage[] = config?.customFields && Array.isArray(config.customFields) 
    ? config.customFields 
    : [];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => setPopupMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  useEffect(() => {
    const saved = localStorage.getItem("recruitment_form_data");
    const currentConfigTime = config?.updatedAt ? new Date(config.updatedAt).getTime() : null;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        
        // If config has been updated since last save, clear everything
        if (currentConfigTime && parsed.configTime && parsed.configTime !== currentConfigTime) {
          localStorage.removeItem("recruitment_form_data");
          setFormData({});
          setCurrentPageIndex(0);
          setPopupMessage("Form was updated by admin. Your progress was reset.");
          return;
        }

        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.currentPageIndex !== undefined) setCurrentPageIndex(parsed.currentPageIndex);
      } catch (e) {
        // Ignore
      }
    }
  }, [config]);

  useEffect(() => {
    if (Object.keys(formData).length > 0 || currentPageIndex > 0) {
      const currentConfigTime = config?.updatedAt ? new Date(config.updatedAt).getTime() : null;
      localStorage.setItem("recruitment_form_data", JSON.stringify({ 
        formData, 
        currentPageIndex,
        configTime: currentConfigTime
      }));
    }
  }, [formData, currentPageIndex, config]);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }));
  };

  const visiblePages = pages.filter((page) => {
    if (!page.targetDepartment || page.targetDepartment === "Always Show") return true;
    return formData.pref1 === page.targetDepartment || formData.pref2 === page.targetDepartment;
  });

  const validateCurrentPage = () => {
    // If it's the first page, check base fields
    if (currentPageIndex === 0) {
      if (!formData.name || !formData.emailPrefix || !formData.phone) return false;
    }
    
    // Clamp index to prevent out-of-bounds if visibility changes
    const safeIndex = Math.min(currentPageIndex, Math.max(0, visiblePages.length - 1));
    const currentPage = visiblePages[safeIndex];
    if (currentPage && currentPage.fields) {
      for (const field of currentPage.fields) {
        if (field.required && (!formData[field.id] || formData[field.id].trim() === '')) {
          return false;
        }
      }
    }
    
    // Check fixed config fields on last page
    if (currentPageIndex === visiblePages.length - 1) {
      if (requirePortfolio && !formData.portfolio) return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateCurrentPage()) {
      if (formData.pref1 && formData.pref2 && formData.pref1 === formData.pref2) {
        setPopupMessage("Department preferences cannot be the same.");
        return;
      }
      setCurrentPageIndex(prev => prev + 1);
    } else {
      setPopupMessage("Please fill in all required fields.");
    }
  };

  const handlePrev = () => {
    setCurrentPageIndex(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentPage()) {
      setPopupMessage("Please fill in all required fields before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    const submissionData = {
      ...formData,
      email: formData.emailPrefix ? `${formData.emailPrefix}@vitstudent.ac.in` : formData.email
    };
    const result = await submitApplication(submissionData);
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitStatus('success');
      localStorage.removeItem("recruitment_form_data");
    } else {
      setSubmitStatus('error');
      setErrorMessage(result.error || "Something went wrong.");
    }
  };

  if (submitStatus === 'success') {
    return (
      <section id="join" className="relative w-full py-32 bg-background border-t border-white/5 overflow-hidden flex items-center justify-center min-h-[70vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center justify-center text-center tech-glass tech-border p-12 max-w-lg mx-auto font-mono"
        >
          <CheckCircle className="w-16 h-16 text-white mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Application Received!</h2>
          <p className="text-white/60 mb-8">We have successfully received your application. Keep an eye on your inbox for next steps.</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
          >
            Return to Home
          </button>
        </motion.div>
      </section>
    );
  }

  const safePageIndex = Math.min(currentPageIndex, Math.max(0, visiblePages.length - 1));
  
  // Auto-correct state if it went out of bounds (e.g. from local storage)
  useEffect(() => {
    if (currentPageIndex > safePageIndex) {
      setCurrentPageIndex(safePageIndex);
    }
  }, [currentPageIndex, safePageIndex]);

  const currentPage = visiblePages[safePageIndex];

  if (!currentPage) return null;

  return (
    <section id="join" className="relative w-full py-20 bg-background border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          
          <div className="w-full md:w-5/12 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6 }}
              className="text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-4"
            >
              Recruitment
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6"
            >
              Ready to push boundaries?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 leading-relaxed mb-12"
            >
              We are always looking for passionate engineers, designers, and visionaries to join our ranks. Apply now to become part of the next generation of space exploration.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-6 font-mono"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white mb-1">2027</span>
                <span className="text-xs uppercase tracking-widest text-white/40">Next Cohort</span>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white mb-1">{visiblePages.length || pages.length}</span>
                <span className="text-xs uppercase tracking-widest text-white/40">Steps</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12"
          >
            <div className="tech-glass border border-white/20 p-8 md:p-12 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
              
              {!isOpen ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-8 text-center font-mono text-sm uppercase tracking-widest">
                    Recruitment is currently closed. Check back later!
                  </div>
                </div>
              ) : pages.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-white/50 text-center font-mono">
                    Form configuration is missing.
                  </div>
                </div>
              ) : (
                <form className="flex flex-col gap-6 font-mono flex-1" onSubmit={handleSubmit}>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-white/10 mb-6">
                    <motion.div 
                      className="h-full bg-white" 
                      initial={{ width: 0 }}
                      animate={{ width: `${((safePageIndex + 1) / visiblePages.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-white mb-2">{currentPage.title}</h4>
                    {currentPage.description && <p className="text-sm text-white/50">{currentPage.description}</p>}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentPageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6 flex-1"
                    >
                      {/* Fixed Base Fields on Page 0 */}
                      {currentPageIndex === 0 && (
                        <>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Full Name *</label>
                            <input 
                              type="text" 
                              required
                              value={formData.name || ""}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="John Doe" 
                              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/50 transition-all duration-300"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50">VIT Email Address *</label>
                            <div className="flex bg-white/5 border border-white/10 text-white focus-within:border-white/50 transition-all duration-300">
                              <input 
                                type="text" 
                                required
                                value={formData.emailPrefix || ""}
                                onChange={(e) => handleInputChange('emailPrefix', e.target.value)}
                                placeholder="john.doe2023" 
                                className="w-full bg-transparent px-4 py-3 focus:outline-none"
                              />
                              <span className="px-4 py-3 text-white/50 bg-black/20 border-l border-white/10 select-none">
                                @vitstudent.ac.in
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Mobile Number *</label>
                            <input 
                              type="tel" 
                              required
                              value={formData.phone || ""}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+91 9876543210" 
                              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/50 transition-all duration-300"
                            />
                          </div>
                        </>
                      )}

                      {/* Dynamic Fields */}
                      {(currentPage.fields || []).map((field: FormField) => (
                        <div key={field.id} className="flex flex-col gap-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                            {field.label} {field.required && "*"}
                          </label>
                          
                          {field.type === 'textarea' ? (
                            <textarea 
                              required={field.required}
                              value={formData[field.id] || ""}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              rows={3}
                              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/50 transition-all duration-300 resize-none"
                            />
                          ) : field.type === 'dropdown' ? (
                            <select 
                              required={field.required}
                              value={formData[field.id] || ""}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              className="w-full bg-[#111] border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/50 transition-all duration-300 appearance-none"
                            >
                              <option value="" disabled className="bg-[#111] text-white">Select an option</option>
                              {(field.options || []).map(opt => (
                                <option key={opt} value={opt} className="bg-[#111] text-white">{opt}</option>
                              ))}
                            </select>
                          ) : field.type === 'radio' ? (
                            <div className="flex flex-col gap-2">
                              {(field.options || []).map(opt => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name={field.id}
                                    value={opt}
                                    checked={formData[field.id] === opt}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    className="w-4 h-4 accent-white"
                                    required={field.required}
                                  />
                                  <span className="text-white/80">{opt}</span>
                                </label>
                              ))}
                            </div>
                          ) : (
                            <input 
                              type={field.type === 'url' ? 'url' : field.type === 'email' ? 'email' : 'text'}
                              required={field.required}
                              value={formData[field.id] || ""}
                              onChange={(e) => handleInputChange(field.id, e.target.value)}
                              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/50 transition-all duration-300"
                            />
                          )}
                        </div>
                      ))}

                      {/* Fixed Config Fields on Last Page */}
                      {currentPageIndex === visiblePages.length - 1 && (
                        <>
                          <div className="bg-black/50 border border-white/10 p-6 mb-6 mt-2 overflow-x-auto">
                            <h5 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Review Your Answers</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/50 uppercase tracking-widest">Name</span>
                                <span className="text-sm text-white/90">{formData.name}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/50 uppercase tracking-widest">VIT Email</span>
                                <span className="text-sm text-white/90">{formData.emailPrefix ? `${formData.emailPrefix}@vitstudent.ac.in` : ''}</span>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/50 uppercase tracking-widest">Mobile Number</span>
                                <span className="text-sm text-white/90">{formData.phone}</span>
                              </div>
                              {Object.entries(formData).filter(([k]) => !['name', 'emailPrefix', 'email', 'phone', 'resumeUrl', 'portfolio'].includes(k)).map(([key, value]) => {
                                let label = key;
                                for (const p of visiblePages) {
                                  const field = p.fields?.find(f => f.id === key);
                                  if (field) {
                                    label = field.label;
                                    break;
                                  }
                                }
                                return (
                                  <div key={key} className="flex flex-col gap-1">
                                    <span className="text-[10px] text-white/50 uppercase tracking-widest">{label}</span>
                                    <span className="text-sm text-white/90">{String(value)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {requirePortfolio && (
                            <div className="flex flex-col gap-2">
                              <label className="text-xs font-bold uppercase tracking-widest text-white/50">Portfolio URL *</label>
                              <input 
                                type="url" 
                                required
                                value={formData.portfolio || ""}
                                onChange={(e) => handleInputChange('portfolio', e.target.value)}
                                placeholder="Link to your projects" 
                                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-white/50 transition-all duration-300"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-xs font-bold uppercase tracking-widest mt-4">
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                    {currentPageIndex > 0 && (
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        className="group flex items-center justify-center gap-2 px-6 py-4 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 font-bold uppercase tracking-widest transition-colors duration-300 text-sm"
                      >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                      </button>
                    )}
                    
                    {currentPageIndex < visiblePages.length - 1 ? (
                      <button 
                        type="button" 
                        onClick={handleNext}
                        className="group flex-1 flex tech-border items-center justify-center gap-2 bg-white text-black px-6 py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300 text-sm relative"
                      >
                        <span className="absolute inset-0 border border-black/20 m-1 pointer-events-none" />
                        Next <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="group flex-1 flex tech-border items-center justify-center gap-2 bg-white text-black px-6 py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300 text-sm relative disabled:opacity-50"
                      >
                        <span className="absolute inset-0 border border-black/20 m-1 pointer-events-none" />
                        {isSubmitting ? "Submitting..." : "Submit Application"} <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Toast Popup */}
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 tech-glass tech-border px-6 py-4 flex items-center gap-4 bg-red-500/10 border-red-500/20"
          >
            <span className="text-red-400 font-mono text-sm uppercase tracking-widest">{popupMessage}</span>
            <button onClick={() => setPopupMessage("")} className="text-white/50 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
