import EventsSection from "@/components/EventsSection";
import NavWheel from "@/components/NavWheel";
import prisma from "@/lib/prisma";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: 'desc' }
  });

  return (
    <main className="min-h-screen w-full bg-background pt-20">
      <NavWheel />
      <EventsSection events={events} />
    </main>
  );
}
