'use client';

import { 
  ArrowRight, Globe, Users, 
  MapPin, Activity, Building, Rocket, Fingerprint, Microscope, HeartPulse, Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const regions = ["Chandigarh", "Punjab", "Haryana", "Himachal Pradesh", "Uttarakhand", "Uttar Pradesh"];

  // 👇 ADDED FULL FORMS FOR DRR & DRCC
  const councilPreview = [
    { 
      n: "Rtn. Dr. Rita Kalra", 
      r: "District Governor (DG)", 
      img: "/rita-kalra.jpeg" 
    }, 
    { 
      n: "PHF PP Rtr. Dr. Manu Gupta", 
      r: "District Rotaract Representative (DRR)", 
      img: "/Manu-Gupta.jpeg" 
    },
    { 
      n: "Rtn. Atul Tangri", 
      r: "District Rotaract Committee Chair (DRCC)", 
      img: "/Atul-Tangri.jpeg" 
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-24 md:pt-32 pb-16 px-4 md:px-6 font-sans transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* 🚀 1. HERO SECTION */}
        <section className="mt-4 md:mt-0 mb-16 md:mb-20 relative flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-widest text-[9px] md:text-[11px] italic">Rotaract District 3080</span>
            <span className="text-neutral-400 dark:text-neutral-600 font-black uppercase tracking-tight text-[8px] md:text-[10px] italic">• RID 3080 Digital Headquarters</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-[85px] font-black italic uppercase tracking-tighter mb-6 leading-[1.1] md:leading-[0.85]">
            Legacy of <span className="text-rose-600 dark:text-rose-500 text-not-italic font-sans">Service.</span> <br/>
            <span className="inline-block">Future of Leadership.</span>
          </h1>
          <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-4xl leading-relaxed font-medium italic mb-8">
            &quot;We are a powerhouse of young leaders across Northern India, carrying a legacy that spans over four decades. Our impact is borderless.&quot;
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/clubs" className="bg-neutral-900 dark:bg-white text-white dark:text-black px-6 md:px-10 py-4 rounded-xl font-black uppercase text-[10px] md:text-[12px] tracking-widest hover:bg-rose-600 dark:hover:bg-rose-500 transition-all flex items-center justify-center gap-2 shadow-2xl">
              Find a Club <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 px-6 md:px-10 py-4 rounded-xl font-black uppercase text-[10px] md:text-[12px] tracking-widest hover:border-rose-500 transition-all text-neutral-600 dark:text-white flex items-center justify-center gap-2">
              Admin Portal <Fingerprint size={16} />
            </Link>
          </div>
        </section>

        {/* 📊 2. DISTRICT STATS GRID */}
        <section className="mb-16 md:mb-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { l: 'Members', v: '2000+', i: Users, c: 'text-blue-600' },
            { l: 'Clubs', v: '80+', i: Building, c: 'text-rose-600' },
            { l: 'Impact Hours', v: '150k+', i: Activity, c: 'text-green-600' },
            { l: 'Zones', v: '07', i: MapPin, c: 'text-amber-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-5 rounded-2xl shadow-sm">
              <s.i className={`${s.c} mb-3`} size={20} />
              <h3 className="text-2xl md:text-3xl font-black italic">{s.v}</h3>
              <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">{s.l}</p>
            </div>
          ))}
        </section>

        {/* 🗺️ 3. GEOGRAPHIC REACH */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 md:mb-20 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Geographic <span className="text-rose-600">Footprint</span></h2>
            <p className="text-sm md:text-lg text-neutral-500 italic leading-relaxed">Our territory spans across Northern India, connecting urban hubs with remote mountain communities.</p>
            <div className="flex flex-wrap gap-2">
              {regions.map((r, i) => (
                <span key={i} className="px-3 py-1.5 bg-neutral-100 dark:bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-neutral-500">{r}</span>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/10 aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-sm">
             <img src="/Front.jpg" className="w-full h-full object-cover opacity-90" alt="District 3080 Action" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
             <div className="absolute bottom-6 left-6">
                <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest italic">• North India&apos;s Finest</p>
                <p className="text-xs md:text-sm font-bold text-white italic">&quot;Action is the fundamental key to all success.&quot;</p>
             </div>
          </div>
        </section>

        {/* 🏛️ 4. CORE AVENUES - PERMANENTLY HIGHLIGHTED */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">Avenues of <span className="text-rose-600">Impact</span></h2>
            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mt-1 italic">Structured for sustainable results</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: 'Professional Growth', d: 'Leadership training through hands on project management and skill building opportunities.', ic: Microscope },
              { t: 'Community Action', d: 'Identifying local needs and implementing sustainable projects.', ic: HeartPulse },
              { t: 'Global Synergy', d: 'Connecting members throughout the globe by promoting unparalleled networking with global partners.', ic: Globe },
            ].map((p, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-rose-200 dark:border-rose-500/30 p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(225,29,72,0.05)]">
                <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
                  <p.ic size={28} />
                </div>
                <h3 className="text-lg font-black uppercase italic mb-2 text-rose-600 dark:text-rose-500">{p.t}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 italic leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/service" 
              className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all border border-neutral-200 dark:border-white/10 hover:border-transparent shadow-sm"
            >
              Explore All Avenues <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* 📅 5. BROADCAST FEED - PERMANENTLY HIGHLIGHTED */}
        <section className="mb-16 md:mb-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl dark:shadow-none overflow-hidden relative">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 pointer-events-none"><Rocket size={300} /></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 relative z-10">
            <div>
              <p className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-widest text-[9px] mb-1 italic">• Live District Intel</p>
              <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-neutral-900 dark:text-white leading-none">District <span className="text-rose-600 dark:text-rose-500 text-not-italic">Broadcasts</span></h2>
            </div>
            <Link href="/events" className="bg-neutral-900 dark:bg-rose-600 text-white px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg">Open Transmission</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {[
              { t: "District DOTS", l: "Tentative", d: "May 31", a: "Training" },
              { t: "PETS & SETS", l: "Tentative", d: "Jun 14", a: "Leadership" },
              { t: "Annapurna Week", l: "District Wide", d: "Jul 01", a: "Community" },
            ].map((e, i) => (
              <div key={i} className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 p-6 rounded-[1.5rem] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <Calendar className="text-rose-600 dark:text-rose-500" size={18} />
                   <span className="text-[8px] font-black uppercase bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2.5 py-1.5 rounded-md">{e.a}</span>
                </div>
                <h4 className="text-base font-black uppercase italic mb-4 text-neutral-900 dark:text-white">{e.t}</h4>
                <div className="flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-white/10 text-[9px] font-black uppercase text-neutral-500 dark:text-neutral-400">
                  <span>{e.l}</span>
                  <span className="text-rose-600 dark:text-rose-500">{e.d}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🏛️ 6. LEADERSHIP DNA - PERMANENT FULL COLOR */}
        <section className="bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] mb-16 md:mb-24 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">District <span className="text-rose-600">Council</span></h2>
            <p className="text-neutral-500 uppercase tracking-widest text-[8px] font-bold italic">The architects of RID 3080&apos;s success</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {councilPreview.map((lead, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-100 dark:bg-neutral-900 rounded-full mb-4 overflow-hidden border-[3px] border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
                  <img 
                    src={lead.img} 
                    alt={lead.n} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + lead.n.replace(' ', '+'); }}
                  />
                </div>
                <h4 className="text-sm md:text-lg font-black uppercase text-neutral-900 dark:text-white text-center leading-tight">{lead.n}</h4>
                {/* 👇 Adjusted leading/px for longer full forms so they wrap beautifully */}
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-rose-600 text-center mt-1.5 px-2 leading-relaxed">{lead.r}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link 
              href="/council" 
              className="inline-flex items-center gap-2 bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 transition-all border border-neutral-200 dark:border-white/10 hover:border-transparent shadow-sm"
            >
              View Full Council <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* 📞 7. FINAL ACTION */}
        <section className="text-center py-10 md:py-16 border-t border-neutral-200 dark:border-white/5">
          <p className="text-[10px] font-black text-rose-600 uppercase tracking-[0.4em] mb-4 italic">Are you ready to lead?</p>
          <h2 className="text-3xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-8 text-neutral-900 dark:text-white">Build Your <span className="text-rose-600 dark:text-rose-500">Legacy.</span></h2>
          <Link href="/contact" className="bg-neutral-900 dark:bg-white text-white dark:text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-rose-600 dark:hover:bg-rose-500 transition-all inline-block">Get In Touch</Link>
        </section>
      </div>
    </main>
  );
}
