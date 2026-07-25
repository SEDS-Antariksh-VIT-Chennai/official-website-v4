import ProjectsSection from "@/components/ProjectsSection";
import NavWheel from "@/components/NavWheel";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full bg-background pt-20">
      <NavWheel />
      <ProjectsSection />
    </main>
  );
}
