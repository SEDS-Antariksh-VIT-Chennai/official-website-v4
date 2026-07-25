import { getEventById } from "@/src/actions/admin";
import { notFound } from "next/navigation";
import { Calendar, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MasonryGallery from "@/components/MasonryGallery";
import NavWheel from "@/components/NavWheel";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  
  if (!event) {
    return notFound();
  }

  const isPast = new Date(event.date) < new Date();
  
  return (
    <main className="min-h-screen w-full bg-background pt-24 pb-32">
      <NavWheel />
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <Link href="/events" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-12 group">
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" /> Back to Events
        </Link>
        
        {/* Header Section */}
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-3xl overflow-hidden mb-16 border border-white/10 group">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
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
                    className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors border border-transparent hover:scale-105 transform duration-300 rounded-sm"
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
                <MasonryGallery images={event.gallery} />
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Quick Summary</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Date</p>
                  <p className="text-sm font-medium text-white">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-sm font-medium text-white">{event.location}</p>
                </div>
                {(event as any).fee && (
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Fee</p>
                    <p className="text-sm font-medium text-white">{(event as any).fee}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Status</p>
                  <div className="inline-block bg-white/10 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm border border-white/10 mt-1">
                    {isPast ? 'Completed' : 'Upcoming'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
