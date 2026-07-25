import { PrismaClient } from '@prisma/client';
import { projects } from '../src/data/projects'; // Note: Adjust the import if running via tsx.

const prisma = new PrismaClient();

async function main() {
  console.log("Migrating static projects to Prisma...");
  for (const p of projects) {
    const iconName = p.icon ? p.icon.name || "Rocket" : "Rocket"; // Simplistic mapping
    let mappedIcon = "Rocket";
    if (p.title.includes("Antariksh")) mappedIcon = "Wrench";
    if (p.title.includes("StarTracker")) mappedIcon = "Code";
    
    await prisma.project.create({
      data: {
        title: p.title,
        category: p.category,
        description: p.description,
        fullDescription: p.fullDescription,
        status: p.status,
        teamSize: p.teamSize?.toString(),
        timeline: p.timeline,
        iconName: mappedIcon,
        image: p.image,
        gallery: []
      }
    });
  }
  console.log("Migration complete!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
