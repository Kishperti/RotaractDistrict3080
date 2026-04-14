'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ExternalLink, Loader2 } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/app/lib/supabase-browser';

export default function PublicEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApprovedEvents() {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false }); 
      
      if (!error && data) setEvents(data);
      setLoading(false);
    }
    fetchApprovedEvents();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 md:pt-32 pb-20 px-4 md:px-6 font-sans transition-colors duration-300 overflow-x-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-16 md:mb-24"
        >
          <p className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-4 italic tracking-widest leading-none">
            • live district action feed
          </p>
          <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-none">
            District <span className="text-rose-600 dark:text-rose-500 text-not-italic font-sans">Broadcasts</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed font-medium italic">
            &quot;Real-time highlights of major initiatives, official visits, and community service projects driven by Rotaract RID 3080.&quot;
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-40 text-rose-600 dark:text-rose-500">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Syncing Feeds...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center border border-dashed border-neutral-300 dark:border-white/10 p-16 md:p-20 rounded-[3rem] md:rounded-[4rem] bg-white dark:bg-white/[0.02]">
            <Calendar size={48} className="mx-auto text-neutral-300 dark:text-neutral-800 mb-6" />
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2 text-neutral-900 dark:text-white">Feed Empty</h3>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-neutral-500">No approved events available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event, index) => {
              const isOfficial = event.club_name === 'RID 3080 OFFICIAL';

              return (
                // 👇 FIX: Removed group hover logic, added permanent shadow and border for a solid look
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-white/[0.03] border border-rose-200 dark:border-rose-500/30 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_10px_30px_rgba(225,29,72,0.05)] flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="aspect-video relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-rose-100 dark:border-rose-500/20">
                    {/* 👇 FIX: Removed grayscale, always full color */}
                    <img 
                      src={event.image_url} 
                      alt={event.title} 
                      className="w-full h-full object-cover" 
                    />
                    {/* 👇 FIX: Gradient overlay to make tags pop more */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
                      <span className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest shadow-xl border flex items-center gap-2 ${isOfficial ? 'bg-rose-600 border-rose-500 text-white' : 'bg-neutral-900/90 backdrop-blur-sm border-white/20 text-white'}`}>
                        {isOfficial && <Sparkles size={10} />}
                        {isOfficial ? 'Official Broadcast' : event.club_name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-8 md:p-10 flex flex-col flex-1 text-left bg-white dark:bg-transparent">
                    {/* 👇 FIX: Always pink title */}
                    <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter leading-tight mb-4 text-rose-600 dark:text-rose-500">
                      {event.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm italic font-medium leading-relaxed mb-6 md:mb-8 flex-1 line-clamp-3">
                      &quot;{event.description}&quot;
                    </p>
                    
                    <div className="border-t border-rose-100 dark:border-rose-500/20 pt-6 md:pt-8 mt-auto flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-[8px] font-black text-rose-600 uppercase tracking-widest italic">
                          <MapPin size={10} /> {event.location || 'RID 3080'}
                        </span>
                        <span className="text-[9px] md:text-[10px] font-bold text-neutral-800 dark:text-white uppercase tracking-tighter">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      {!isOfficial && (
                        // 👇 FIX: Button permanently styled like a solid action button
                        <a 
                          href={event.image_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-500 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest"
                        >
                          <ExternalLink size={14} /> Evidence
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
