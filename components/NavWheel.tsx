"use client";

import { useEffect, useState } from "react";
import OptionWheel from "@/src/component/OptionWheel";
import { useRouter, usePathname } from "next/navigation";

const sections = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/" },
  { id: "projects", label: "Projects", path: "/" },
  { id: "events", label: "Events", path: "/" },
  { id: "departments", label: "Divisions", path: "/" },
  { id: "join", label: "Join Us", path: "/join" },
  { id: "contact", label: "Contact", path: "/" },
];

export default function NavWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Determine active index based on path if not on home
    if (pathname !== "/") {
      const idx = sections.findIndex(s => s.path === pathname);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Show wheel when scrolling starts
      setIsVisible(true);
      
      // Clear existing timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Hide wheel after 1.5s of no scrolling (unless hovered)
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 1500);

      if (isScrolling) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].path === "/") {
          const section = document.getElementById(sections[i].id);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check but don't show it just for loading
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isScrolling, pathname]);

  // Keep it visible if hovered
  useEffect(() => {
    if (isHovered) {
      setIsVisible(true);
    } else {
      // If we stop hovering, hide it after a delay
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [isHovered]);

  const handleChange = (index: number, item: string) => {
    setActiveIndex(index);
    setIsScrolling(true);
    setIsVisible(true);
    
    const targetSectionDef = sections[index];

    if (pathname !== targetSectionDef.path) {
      router.push(targetSectionDef.path + (targetSectionDef.path === "/" && targetSectionDef.id !== "home" ? `#${targetSectionDef.id}` : ""));
      setTimeout(() => setIsScrolling(false), 1000);
      return;
    }

    const targetSection = document.getElementById(targetSectionDef.id);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth"
      });
      setTimeout(() => setIsScrolling(false), 1000);
    } else {
      setIsScrolling(false);
    }
  };

  return (
    <div 
      data-lenis-prevent="true" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed right-0 top-1/2 -translate-y-1/2 h-[800px] w-[300px] z-[200] pointer-events-auto transition-all duration-700 ease-in-out origin-right [mask-image:radial-gradient(ellipse_at_right_center,black_30%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_right_center,black_30%,transparent_80%)] ${
        isVisible || isHovered ? 'translate-x-0 opacity-100' : 'translate-x-[200px] opacity-0'
      } hover:scale-110`}
    >
      <OptionWheel
        items={sections.map(s => s.label)}
        defaultSelected={activeIndex}
        onChange={handleChange}
        side="right"
        activeColor="#ffffff"
        textColor="#888888"
        spacing={2.5}
        fontSize={1.4}
        tilt={0}
        // loop={true}
        blur={.5}
        fade={0}
        inset={30}
      />
    </div>
  );
}
