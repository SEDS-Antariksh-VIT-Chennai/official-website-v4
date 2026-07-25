import EventsPageContent from "./EventsPageContent";
import prisma from "@/lib/prisma";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' }
  });

  return (
    <main className="min-h-screen w-full bg-background pt-20">
      <EventsPageContent events={events} />
    </main>
  );
}
