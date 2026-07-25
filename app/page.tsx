import LandingContent from "@/components/LandingContent";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import EventsSection from "@/components/EventsSection";
import DepartmentsSection from "@/components/DepartmentsSection";
import ContactUsSection from "@/components/ContactUsSection";
import NavWheel from "@/components/NavWheel";
import Lightfall from "@/src/component/Lightfall";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function Home() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' }
  });

  return (
    <main id="home" className="relative min-h-screen w-full overflow-hidden bg-background">
      <NavWheel />
      <div className="relative min-h-screen w-full">
        {/* Background Particles layer could go here */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none z-0" />

        <div className="absolute inset-0 z-0 opacity-30">
          <Lightfall
            colors={['#111111', '#333333', '#555555']}
            backgroundColor="#000000"
            speed={0.5}
            density={0.8}
            streakCount={60}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 h-screen flex flex-col items-center justify-center relative z-10 pt-20">
          <LandingContent />
        </div>
      </div>

      <AboutSection />
      <ProjectsSection showViewAll={true} />
      <EventsSection events={events} />
      <DepartmentsSection />
      
      {/* Join Us CTA */}
      <section className="relative w-full py-32 bg-background border-t border-white/5 overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10 text-center">
          Ready to push boundaries?
        </h3>
        <Link 
          href="/join"
          className="group relative z-10 flex items-center justify-center gap-3 bg-white text-black px-8 py-5 font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
        >
          Join Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <ContactUsSection />
    </main>
  );
}
