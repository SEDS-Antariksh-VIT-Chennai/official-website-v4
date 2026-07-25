import { getEventById } from "@/src/actions/admin";
import { notFound } from "next/navigation";
import { Calendar, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MasonryGallery from "@/components/MasonryGallery";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  
  if (!event) {
    return notFound();
  }

  const isPast = new Date(event.date) < new Date();
  
  return (
    <main className="min-h-screen w-full bg-background pt-24 pb-32">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <Link href="/events" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-12 group">
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> Back to Events
        </Link>
        
        {/* Header Section */}
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-none overflow-hidden mb-8 border border-white/10 group">
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl z-0" />
          {event.coverImage ? (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url(${event.coverImage})` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/5">
              <Calendar className="w-16 h-16 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent z-10" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
            <div className="inline-block bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-4 rounded-sm">
              {isPast ? 'Completed' : 'Upcoming'}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-white/40" />
                <span className="text-sm font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white/40" />
                <span className="text-sm font-medium">{event.location}</span>
              </div>
              {(event as any).fee && (
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center text-white/40 border border-white/20 rounded-full text-[10px] font-bold">$</span>
                  <span className="text-sm font-medium">{(event as any).fee}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Summary (Horizontal Box below cover) */}
        <div className="tech-glass tech-border p-6 md:p-8 mb-16 flex flex-wrap items-center justify-between gap-8 rounded-none font-mono">
          <div className="flex items-center gap-8 flex-wrap flex-1">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Date</p>
              <p className="text-sm font-bold text-white">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden md:block" />
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Location</p>
              <p className="text-sm font-bold text-white">{event.location}</p>
            </div>
            {(event as any).fee && (
              <>
                <div className="w-px h-10 bg-white/10 hidden md:block" />
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Fee</p>
                  <p className="text-sm font-bold text-white">{(event as any).fee}</p>
                </div>
              </>
            )}
          </div>
          <div>
            <div className={`inline-block text-[10px] font-bold px-4 py-2 uppercase tracking-widest rounded-none border ${isPast ? 'bg-white/10 border-white/20 text-white' : 'bg-white text-black border-white'}`}>
              {isPast ? 'Completed' : 'Upcoming'}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-bold">About The Event</h2>
            <div className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-lg max-w-none">
              {event.description.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Event Buttons */}
          {!isPast && event.buttons && Array.isArray(event.buttons) && event.buttons.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 mb-16">
              {(event.buttons as any[]).map((btn, i) => (
                <a 
                  key={i}
                  href={btn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors border border-transparent rounded-none"
                >
                  {btn.label} <ArrowRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
          
          {/* Masonry Gallery */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-16">
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8 font-bold">Event Gallery</h2>
              <MasonryGallery images={event.gallery.map((url: string) => ({ url, caption: event.title }))} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
