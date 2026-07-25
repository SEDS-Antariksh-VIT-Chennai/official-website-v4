import { getEventById } from "@/src/actions/admin";
import EditEventForm from "./EditEventForm";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  
  if (!event) {
    return notFound();
  }
  
  return <EditEventForm event={event} />;
}
