'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Users, Building2, Loader2 } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/app/lib/supabase-browser';

export default function ClubFinder() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeZone, setActiveZone] = useState('All');

  // 👇 FIX: Added '7' to the zones array
  const zones = ['All', '1', '2', '3', '4', '5', '6', '7'];

  useEffect(() => { fetchClubs(); }, []);

  async function fetchClubs() {
    setLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.from('clubs').select('*').order('name', { ascending: true });
      if (error) throw error;
      setClubs(data || []);
    } catch (err) {
      console.error("Error fetching clubs:", err.message);
    } finally {
      setLoading(false);
    }
  }

  const filteredClubs = clubs.filter(club => {
    const searchLower = search.toLowerCase();
    const matchesSearch = (club.name?.toLowerCase() || '').includes(searchLower) || (club.president?.toLowerCase() || '').includes(searchLower);
    const rawZone = String(club.zone || '').toLowerCase().replace('zone', '').trim();
    const filterZone = String(activeZone).trim().toLowerCase();
    return matchesSearch && (activeZone === 'All' || rawZone === filterZone);
  });

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-24 md:pt-32 pb-20 px-4 md:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-8 md:mb-16">
          <p className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px] mb-2 md:mb-4 italicLEADING-none">
            • searchable district directory
          </p>
          <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 md:mb-8 leading-none">
            Club <span className="text-rose-600 dark:text-rose-500 text-not-italic font-sans">Finder</span>
          </h1>
          <p className="text-sm md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl font-medium italic leading-relaxed">
            Browse the clubs with a clean, fast directory.
          </p>
        </header>

        {/* FILTERS & SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center sticky top-20 md:top-28 z-50 py-3 md:py-6 bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur-md px-1">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input 
              type="text" 
              placeholder="Search club..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-white/[0.03] border border-neutral-300 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-rose-500 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-2 justify-start md:justify-center w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
            {zones.map(zone => (
              <button 
                key={zone}
                onClick={() => setActiveZone(zone)}
                className={`px-3 md:px-5 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeZone === zone 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' 
                  : 'bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-500 hover:text-rose-600'
                }`}
              >
                {zone === 'All' ? 'All' : `Z-${zone}`}
              </button>
            ))}
          </div>
        </div>

        {/* CLUBS GRID */}
        {loading ? (
          <div className="flex justify-center py-20 md:py-40">
            <Loader2 className="animate-spin text-rose-600" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredClubs.map((club) => (
              <div key={club.id} className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-none">
                
                <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.08] dark:opacity-[0.04] text-rose-600 dark:text-rose-700 transition-all">
                    <Building2 size={80} md={120} />
                </div>
                
                <div className="mb-4 relative z-10">
                  <span className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 text-[8px] font-black px-3 py-1 rounded-full border border-rose-200 dark:border-rose-500/20 uppercase tracking-widest">
                    Zone {String(club.zone || '').toLowerCase().replace('zone', '').trim()}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-6 text-rose-600 dark:text-rose-500 transition-colors leading-tight relative z-10">
                  {club.name}
                </h3>
                
                <div className="space-y-4 border-t border-neutral-100 dark:border-white/5 pt-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-500/20">
                        <Users size={14} />
                    </div>
                    <div>
                        <p className="text-[7px] font-black uppercase text-neutral-400 tracking-widest mb-0.5">President</p>
                        <p className="text-xs font-bold text-neutral-800 dark:text-white leading-tight">{club.president || 'TBD'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-rose-500/20">
                        <MapPin size={14} />
                    </div>
                    <div>
                        <p className="text-[7px] font-black uppercase text-neutral-400 tracking-widest mb-0.5">Rotary Sponsor</p>
                        <p className="text-xs font-bold text-neutral-800 dark:text-white leading-tight">{club.sponsor || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
