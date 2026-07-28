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
  const projects = await prisma.project.findMany({
    where: { isPinned: true },
    orderBy: { createdAt: 'desc' }
  });
  const formConfig = await prisma.formConfig.findUnique({
    where: { id: "default" }
  });

  return (
    <main id="home" className="relative min-h-screen w-full">
      <NavWheel />

      {/* Wrapper for all main content to properly occlude the z-[-1] ContactUsSection */}
      <div className="relative z-10 w-full">

        {/* Sticky Hero Section */}
        <div className="sticky top-0 left-0 w-full h-screen z-0 bg-background overflow-hidden">
          {/* Background Particles layer could go here */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none z-0" />

          <div
            className="md:hidden absolute inset-0 z-0 opacity-30 bg-cover bg-center"
            style={{ backgroundImage: "url('/bg2.jpg')" }}
          />

          <div className="hidden md:block absolute inset-0 z-0 opacity-30">
            <Lightfall
              colors={['#ffffff', '#cccccc', '#888888']}
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



        {/* The actual solid content that slides over the hero section */}
        <div className="relative z-10 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col">

          <AboutSection />
          <ProjectsSection projects={projects} showViewAll={true} />
          <EventsSection events={events} showViewAll={true} showTabs={true} />
          <DepartmentsSection />

          {/* Join Us CTA */}
          <section id="join" className="relative w-full py-20 bg-background border-t border-white/5 overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

            {formConfig?.isOpen ? (
              <>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10 text-center">
                  Ready to push boundaries?
                </h3>
                <Link
                  href="/join"
                  className="group relative tech-border z-10 flex items-center justify-center gap-3 bg-white text-black px-8 py-5 font-mono font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-500 text-sm"
                >
                  <span className="absolute inset-0 border border-black/20 m-1 pointer-events-none" />
                  Join Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 text-center">
                  Recruitments are closed
                </h3>
                <p className="text-lg text-white/50 mb-8 relative z-10 text-center max-w-lg">
                  We are not accepting applications at this time. Follow our social channels to get notified when recruitments open!
                </p>
              </>
            )}
          </section>
        </div>
      </div>

      <ContactUsSection />
    </main>
  );
}
