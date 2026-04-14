'use client';

import { useState, useEffect } from 'react';
import { Calendar, Loader2, Image as ImageIcon, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/app/lib/supabase-browser';

export default function FeaturedEvents() {
  // 🛑 THE FIX: Initializing with an empty array of 'any' or just empty is fine in .jsx
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_approved', true) 
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      // 🛑 THE FIX: Accessing error safely
      console.error("Error fetching events:", err instanceof Error ? err.message : err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-32 pb-20 px-6 font-sans transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <header className="mb-24">
          <p className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-[0.3em] text-[10px] mb-4 italic tracking-widest">• district showcase</p>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
            Featured <span className="text-rose-600 dark:text-rose-500 text-not-italic font-sans">Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed font-medium italic">
            &quot;Explore the latest service projects and fellowship meets approved by the district council for public viewing.&quot;
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-rose-600" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 italic">Retrieving Gallery...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-neutral-300 dark:border-white/10 rounded-[4rem] bg-white dark:bg-white/[0.02]">
            <ImageIcon size={48} className="mx-auto text-neutral-200 dark:text-neutral-800 mb-6" />
            <p className="text-neutral-400 font-black uppercase italic tracking-widest text-[10px]">No approved events found in the public gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev) => (
              <div key={ev.id} className="group bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 rounded-[3.5rem] overflow-hidden hover:border-rose-400 dark:hover:border-rose-500/50 transition-all duration-700 shadow-sm dark:shadow-none">
                
                {/* Image Wrapper */}
                <div className="aspect-video relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <img 
                    src={ev.image_url} 
                    alt={ev.title} 
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-neutral-900 dark:bg-rose-600 text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-2xl border border-white/10">
                      {ev.club_name}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                {/* Content Area */}
                <div className="p-10 text-left">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-500 text-[9px] font-black uppercase tracking-widest mb-6 italic">
                    <Calendar size={12} /> {ev.date}
                  </div>
                  
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter text-neutral-900 dark:text-white group-hover:text-rose-600 transition-colors leading-tight mb-4">
                    {ev.title}
                  </h3>
                  
                  <p className="text-neutral-500 dark:text-neutral-500 text-xs leading-relaxed italic line-clamp-3 mb-8">
                    {ev.description}
                  </p>

                  <div className="pt-6 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400">Public Record</span>
                    <Sparkles size={14} className="text-rose-600 dark:text-rose-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LOWER CALLOUT */}
        <section className="mt-32 bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 p-12 md:p-20 rounded-[4rem] text-center">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-neutral-900 dark:text-white">Want your project <span className="text-rose-600">Featured?</span></h2>
            <p className="text-neutral-500 text-sm italic mb-12 max-w-xl mx-auto">Upload your club activities through the portal and get them verified by the district council.</p>
            <Link href="/login" className="inline-flex items-center gap-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-black px-10 py-5 rounded-full text-[10px] uppercase tracking-widest hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white transition-all shadow-xl">
              Portal Login <ChevronRight size={14} />
            </Link>
        </section>

      </div>
    </main>
  );
}
