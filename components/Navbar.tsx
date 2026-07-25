"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Shield } from "lucide-react";
import GradualBlur from "@/src/component/GradualBlur";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Join Us", href: "/join" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
          : "border-transparent py-6"
      )}
    >
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <GradualBlur preset="header" />
      </div>

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
                  "text-xs font-bold uppercase tracking-widest transition-colors duration-300 relative",
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
              "text-xs font-bold uppercase tracking-widest transition-colors duration-300 relative flex items-center gap-2",
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
      </div>
    </header>
  );
}
