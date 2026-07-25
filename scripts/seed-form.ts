import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultPages = [
    {
      id: "page_1",
      title: "General Details",
      description: "Basic information to identify you.",
      targetDepartment: "Always Show",
      fields: [
        { id: "regNo", type: "text", label: "Registration Number", required: true },
        { id: "pref1", type: "dropdown", label: "Department Preference 1", options: ["Projects", "Design & Content", "Events", "Outreach"], required: true },
        { id: "pref2", type: "dropdown", label: "Department Preference 2", options: ["Projects", "Design & Content", "Events", "Outreach"], required: true }
      ]
    },
    {
      id: "page_projects",
      title: "Projects (Engineering) Questions",
      description: "Questions for candidates applying to the Projects department.",
      targetDepartment: "Projects",
      fields: [
        { id: "proj_q1", type: "textarea", label: "What is your primary tech stack or engineering discipline?", required: true },
        { id: "proj_q2", type: "textarea", label: "Describe a complex technical problem you solved.", required: true }
      ]
    },
    {
      id: "page_design",
      title: "Design & Content Questions",
      description: "Questions for candidates applying to the Design & Content department.",
      targetDepartment: "Design & Content",
      fields: [
        { id: "design_q1", type: "textarea", label: "What design tools are you most proficient in?", required: true },
        { id: "design_q2", type: "url", label: "Link to your best design work", required: false }
      ]
    },
    {
      id: "page_events",
      title: "Events Questions",
      description: "Questions for candidates applying to the Events department.",
      targetDepartment: "Events",
      fields: [
        { id: "events_q1", type: "textarea", label: "Describe an event you have successfully managed or organized.", required: true }
      ]
    },
    {
      id: "page_outreach",
      title: "Outreach Questions",
      description: "Questions for candidates applying to the Outreach department.",
      targetDepartment: "Outreach",
      fields: [
        { id: "outreach_q1", type: "textarea", label: "How would you handle pitching our club to a corporate sponsor?", required: true }
      ]
    },
    {
      id: "page_final",
      title: "Final Review",
      description: "Any other comments or links you'd like to share.",
      targetDepartment: "Always Show",
      fields: [
        { id: "final_comments", type: "textarea", label: "Additional Comments", required: false }
      ]
    }
  ];

  await prisma.formConfig.upsert({
    where: { id: "default" },
    update: {
      customFields: defaultPages,
      isOpen: true,
      requireResume: true,
      requirePortfolio: false
    },
    create: {
      id: "default",
      customFields: defaultPages,
      isOpen: true,
      requireResume: true,
      requirePortfolio: false
    }
  });

  console.log('✅ Form configuration seeded successfully with conditional departments.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
