'use client';

import { 
  Globe, Star,
  ShieldCheck, Heart, Rocket, Users 
} from 'lucide-react';

export default function AboutPage() {
  const regions = ["Chandigarh", "Punjab", "Haryana", "Himachal Pradesh", "Uttarakhand", "Uttar Pradesh"];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 md:pt-32 pb-20 px-4 md:px-6 font-sans transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <section className="mb-16 md:mb-32">
          <p className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-4 italic leading-none">
            • more than just a district
          </p>
          <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-[1.1] md:leading-none">
            The Legacy of <span className="text-rose-600 dark:text-rose-500 text-not-italic">3080</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl leading-relaxed font-medium italic">
            &quot;We are a powerhouse of young leaders across Northern India, carrying a legacy of service that spans over four decades. From the foothills of the Himalayas to the plains of Uttar Pradesh, our impact is borderless.&quot;
          </p>
        </section>

        {/* THE ROTARY LEGACY - PERMANENTLY HIGHLIGHTED */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-32 items-center bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] shadow-sm">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
              <Star size={24} fill="currentColor" />
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-neutral-900 dark:text-white">Home of <span className="text-amber-500 text-not-italic">Global Leadership</span></h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium italic text-sm md:text-base">
              <p>
                District 3080 holds the unique distinction of being the home district of <span className="text-neutral-900 dark:text-white font-bold not-italic">PRIP Rajendra K. Saboo</span>, who served as the Rotary International President in 1991-92.
              </p>
              {/* 👇 UPDATED TO PROFESSIONAL ENGLISH */}
              <p>
                His journey began in the 1980s, and today he stands as one of the most prominent figures in the global Rotary movement. Raja Saboo Sir remains the true identity and pride of RID 3080.
              </p>
            </div>
          </div>
          
          <div className="aspect-square bg-neutral-100 dark:bg-neutral-900 rounded-[1.5rem] md:rounded-[3rem] relative overflow-hidden border-[3px] border-rose-500 shadow-[0_0_30px_rgba(225,29,72,0.15)]">
            <img 
              src="/rk-saboo.jpg" 
              alt="PRIP Rajendra K. Saboo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 p-4 md:p-6 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl border border-neutral-200 dark:border-white/10">
               <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1">District Pillar</p>
               <p className="text-[10px] md:text-xs font-bold italic text-neutral-900 dark:text-white leading-tight">&quot;Look Beyond Yourself&quot; — PRIP R.K. Saboo</p>
            </div>
          </div>
        </section>

        {/* CORE PHILOSOPHY - PERMANENTLY HIGHLIGHTED */}
        <section className="mb-16 md:mb-32">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-neutral-900 dark:text-white">The Four <span className="text-rose-600">Pillars</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { t: 'Fellowship', d: 'Building lifelong friendships across borders through cultural and social exchange.', ic: Users },
              { t: 'Integrity', d: 'Adhering to the highest ethical standards in all professional and personal actions.', ic: ShieldCheck },
              { t: 'Service', d: 'Identifying community needs and executing sustainable impact projects.', ic: Heart },
              { t: 'Leadership', d: 'Developing skills to lead teams and influence positive change in society.', ic: Rocket },
            ].map((p, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-rose-200 dark:border-rose-500/30 p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_10px_30px_rgba(225,29,72,0.05)]">
                <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
                  <p.ic size={28} />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase italic mb-3 text-rose-600 dark:text-rose-500">{p.t}</h3>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed italic">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🗺️ GEOGRAPHIC FOOTPRINT - PERMANENT HIGHLIGHTS */}
        <section className="mb-16 md:mb-32">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-20 items-center">
            <div className="lg:w-1/2 space-y-6 md:space-y-8 text-left">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Our <span className="text-rose-600">Footprint</span></h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg italic leading-relaxed">
                Our territory is one of the most geographically diverse in the Rotary world.
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {regions.map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)] shrink-0"></div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-neutral-700 dark:text-neutral-300">{r}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full aspect-video bg-white dark:bg-neutral-900 rounded-[2rem] md:rounded-[4rem] relative overflow-hidden border border-neutral-200 dark:border-white/5 flex items-center justify-center shadow-xl dark:shadow-none">
               <Globe size={150} className="text-neutral-100 dark:text-white/10 absolute transition-transform duration-[10s] animate-pulse" />
               <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 dark:from-rose-500/20 to-transparent"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl md:text-7xl font-black italic text-neutral-900 dark:text-white tracking-tighter">2000+</p>
                    <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-rose-600 dark:text-rose-500 mt-2">Active Rotaractors</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 🏺 THE JOURNEY - PERMANENT HIGHLIGHTS */}
        <section className="bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 p-6 md:p-20 rounded-[2rem] md:rounded-[4.5rem]">
          <h2 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter mb-12 md:mb-20 text-center text-neutral-900 dark:text-white leading-none">Chronicles of <span className="text-rose-600">Impact</span></h2>
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
            {[
              { year: '1984', title: 'The Genesis', desc: 'District 3080 was carved out with a vision to streamline service in Northern India.' },
              { year: '1991', title: 'The Golden Year', desc: 'Rtn. Raja Saboo takes office as RI President, setting global standards from RID 3080.' },
              { year: '2000s', title: 'Sustainable Era', desc: 'Focus shifts towards long-term community impact and large-scale medical missions.' },
              { year: '2026+', title: 'Digital Evolution', desc: 'Embracing data and technology to amplify volunteer impact across the district.' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-16 border-l-2 border-rose-200 dark:border-rose-500/30 pl-6 md:pl-10 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]"></div>
                <div className="w-24 shrink-0">
                  <span className="text-2xl md:text-3xl font-black italic text-rose-600 dark:text-rose-500 leading-none">{step.year}</span>
                </div>
                <div className="space-y-2 pb-2">
                  <h4 className="text-lg md:text-2xl font-black uppercase italic tracking-tight text-neutral-900 dark:text-white leading-none">{step.title}</h4>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed italic">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
