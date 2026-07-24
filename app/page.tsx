import LandingContent from "@/components/LandingContent";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import DepartmentsSection from "@/components/DepartmentsSection";
import JoinUsSection from "@/components/JoinUsSection";
import NavWheel from "@/components/NavWheel";
import Lightfall from "@/src/component/Lightfall";

export default function Home() {
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
      <EventsSection />
      <DepartmentsSection />
      <JoinUsSection />
    </main>
  );
}
