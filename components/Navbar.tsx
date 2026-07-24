"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "glass shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter uppercase z-50">
          SEDS<span className="text-muted ml-1">ANTARIKSH</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-200 relative",
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-foreground w-1/2 mx-auto" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
