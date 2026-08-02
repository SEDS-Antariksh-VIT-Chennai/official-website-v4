import ProjectsPageContent from "./ProjectsPageContent";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen w-full bg-background pt-20">
      <ProjectsPageContent projects={projects} />
    </main>
  );
}
