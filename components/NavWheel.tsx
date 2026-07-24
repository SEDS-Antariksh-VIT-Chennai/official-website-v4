"use client";

import { useEffect, useState } from "react";
import OptionWheel from "@/src/component/OptionWheel";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "departments", label: "Divisions" },
  { id: "join", label: "Join Us" },
];

export default function NavWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const handleChange = (index: number, item: string) => {
    setActiveIndex(index);
    setIsScrolling(true);

    const targetSection = document.getElementById(sections[index].id);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth"
      });

      // Wait for scrolling to finish before re-enabling scroll listener
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  return (
    <div data-lenis-prevent="true" className="fixed right-0 top-1/2 -translate-y-1/2 h-[800px] w-[300px] z-[200] pointer-events-auto opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-700 ease-in-out origin-right backdrop-blur-3xl bg-black/0 hover:bg-black/60 [mask-image:radial-gradient(ellipse_at_right_center,black_30%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_right_center,black_30%,transparent_80%)]">
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
