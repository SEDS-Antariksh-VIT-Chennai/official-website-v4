"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Shield, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradualBlur from "@/src/component/GradualBlur";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Events", href: "/events" },
  { name: "Join Us", href: "/join" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[150] transition-all duration-300 border-b",
        isScrolled
          ? "border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-4"
          : "border-transparent py-6",
        pathname.startsWith("/admin") ? "bg-black" : ""
      )}
    >
      {!pathname.startsWith("/admin") && (
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          <GradualBlur preset="header" />
        </div>
      )}

      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter uppercase z-50 text-white flex items-center gap-1 group">
          <span className="group-hover:text-white/80 transition-colors">SEDS</span>
          <span className="text-white/50 group-hover:text-white/80 transition-colors">ANTARIKSH</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 relative",
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white w-1/2 mx-auto" />
                )}
              </Link>
            );
          })}
          
          <div className="w-px h-4 bg-white/20 mx-2" />
          
          <Link
            href="/admin"
            className={cn(
              "text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 relative flex items-center gap-2",
              pathname === "/admin" ? "text-white" : "text-white/30 hover:text-white/80"
            )}
            title="Admin Dashboard"
          >
            <Shield className="w-4 h-4" />
            <span>Admin</span>
            {pathname === "/admin" && (
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white w-1/2 mx-auto" />
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[73px] z-[140] bg-black/95 backdrop-blur-xl md:hidden flex flex-col border-t border-white/10"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8 p-6">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-2xl font-mono font-bold uppercase tracking-widest transition-colors duration-300 relative",
                        isActive ? "text-white" : "text-white/50 hover:text-white"
                      )}
                    >
                      {isActive && <span className="text-white/50 mr-2">[</span>}
                      {link.name}
                      {isActive && <span className="text-white/50 ml-2">]</span>}
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="w-full h-px bg-white/10 my-4" />
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: NAV_LINKS.length * 0.1 }}
              >
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-mono font-bold uppercase tracking-widest transition-colors duration-300 flex items-center gap-2",
                    pathname === "/admin" ? "text-white" : "text-white/30 hover:text-white/80"
                  )}
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
