import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, Rocket, Wrench, Code } from "lucide-react";
import prisma from "@/lib/prisma";
import MasonryGallery from "@/components/MasonryGallery";
import { getFormConfig } from "@/src/actions/admin";

export const dynamic = 'force-dynamic';

const iconMap: Record<string, any> = {
  Rocket,
  Wrench,
  Code,
};

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });
  const config = await getFormConfig();

  if (!project) {
    return notFound();
  }

  const Icon = iconMap[project.iconName || ""] || Rocket;
  
  const galleryImages = (project.gallery || []).map((url: string) => ({
    url,
    caption: project.title
  }));

  return (
    <main className="min-h-screen w-full bg-background pt-24 pb-32">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Back Link */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors mb-16"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        <div className="max-w-4xl mx-auto w-full">
          {/* Main Content */}
          <div className="w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center border border-white/10 bg-white/5 rounded-full">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest text-white uppercase shadow-sm">
                  {project.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 border border-white/10 px-2 py-1">
                  {project.status}
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {project.title}
            </h1>

            <div className="w-full aspect-video overflow-hidden border border-white/10 relative mb-8 group rounded-none">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Mission Specs (Horizontal Box) */}
            <div className="tech-glass tech-border p-6 md:p-8 mb-12 flex flex-wrap items-center justify-between gap-8 rounded-none font-mono">
              <div className="flex items-center gap-8 flex-wrap flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 shrink-0">
                    <Users className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Team Size</p>
                    <p className="text-sm font-bold text-white">{project.teamSize || "Unknown"} Members</p>
                  </div>
                </div>
                
                <div className="w-px h-10 bg-white/10 hidden md:block" />
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 shrink-0">
                    <Calendar className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Timeline</p>
                    <p className="text-sm font-bold text-white">{project.timeline || "TBD"}</p>
                  </div>
                </div>
              </div>
              
              {config?.isOpen && (
                <div>
                  <Link 
                    href="/join"
                    className="flex items-center justify-center bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-none"
                  >
                    Apply to Join
                  </Link>
                </div>
              )}
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                {project.description}
              </p>
              <h2 className="text-2xl font-bold text-white mt-12 mb-6">Project Overview</h2>
              <p className="text-lg text-white/60 leading-relaxed">
                {project.fullDescription || "Detailed project information is being updated."}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {galleryImages.length > 0 && (
        <div className="container mx-auto px-6 md:px-12 mt-32 relative z-10">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Project Gallery</h2>
            <p className="text-white/50">Glimpses from the development and testing phases.</p>
          </div>
          <MasonryGallery images={galleryImages} />
        </div>
      )}
    </main>
  );
}
