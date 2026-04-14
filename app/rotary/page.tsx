'use client';

import Link from 'next/link';
import { 
  Globe, Heart, Layers, ShieldCheck, 
  Target, Zap, Flame
} from 'lucide-react';

const rotaryStats = [
  { label: 'Global Members', val: '1.4M+', ic: Globe },
  { label: 'Active Clubs', val: '45,000+', ic: Layers },
  { label: 'Foundation Impact', val: '$5.5B+', ic: Heart },
];

// 👇 FIX: Passed icon references directly so we can style them in solid boxes below
const missionBlocks = [
  {
    title: "Mission",
    desc: "We provide service to others, promote integrity, and advance world understanding, goodwill, and peace through our fellowship of business, professional, and community leaders.",
    ic: Target 
  },
  {
    title: "Ethos",
    desc: "Service Above Self and the search for lasting change define the whole system of action. Projects are designed to be sustainable, measurable, and visible.",
    ic: Zap
  }
];

export default function RotaryPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-28 md:pt-32 pb-20 px-4 md:px-6 font-sans transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <header className="mb-16 md:mb-24">
          <p className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-4 italic leading-none">• the wider movement</p>
          <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-none">
            Rotary <span className="text-rose-600 dark:text-rose-500 text-not-italic">International</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed font-medium italic">
            Rotary is a worldwide network of members united by service, fellowship, and the desire to create lasting change across borders.
          </p>
        </header>

        {/* GLOBAL STATS GRID - PERMANENTLY HIGHLIGHTED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-20 md:mb-24">
          {rotaryStats.map((s, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-rose-200 dark:border-rose-500/30 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_10px_30px_rgba(225,29,72,0.05)]">
              {/* Always Solid Pink Icon Box */}
              <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
                <s.ic size={28} />
              </div>
              <p className="text-neutral-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2">{s.label}</p>
              <h3 className="text-2xl md:text-3xl font-black italic text-neutral-900 dark:text-white">{s.val}</h3>
            </div>
          ))}
        </div>

        {/* MISSION & ETHOS - PERMANENTLY HIGHLIGHTED */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-20 md:mb-24">
          {missionBlocks.map((block, i) => (
            <div key={i} className="bg-white dark:bg-white/[0.02] border border-rose-200 dark:border-rose-500/30 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_10px_30px_rgba(225,29,72,0.05)]">
              {/* Always Solid Pink Icon Box */}
              <div className="w-16 h-16 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-rose-500/30">
                <block.ic size={32} />
              </div>
              {/* Always Pink Heading */}
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4 md:mb-6 text-rose-600 dark:text-rose-500">{block.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed font-medium italic">&quot;{block.desc}&quot;</p>
            </div>
          ))}
        </section>

        {/* PILLARS OF ACTION - PERMANENTLY HIGHLIGHTED */}
        <section className="bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden mb-20 md:mb-24 shadow-sm">
          <div className="absolute -bottom-20 -left-20 opacity-[0.03] rotate-12 text-rose-600 hidden md:block">
            <Flame size={400} />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-12 md:mb-16 text-neutral-900 dark:text-white">Pillars of <span className="text-rose-600">Action</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
              {[
                { t: "Network", d: "Clubs and districts work together across borders." },
                { t: "Fellowship", d: "Members build durable relationships while serving." },
                { t: "Action", d: "Projects are designed to be sustainable and visible." }
              ].map((p, i) => (
                <div key={i} className="space-y-3 md:space-y-4">
                  {/* Always Solid Pink Icon Box */}
                  <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-rose-500/30">
                    <ShieldCheck size={28} />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white">{p.t}</h4>
                  <p className="text-neutral-500 text-xs md:text-sm italic">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOIN CTA */}
        <section className="text-center py-10 md:py-12">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight mb-8 md:mb-12">Join the <br className="md:hidden"/><span className="text-rose-600">Movement</span></h2>
            <Link href="/contact" className="inline-block bg-neutral-900 dark:bg-white text-white dark:text-black font-black px-10 md:px-12 py-5 md:py-6 rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-rose-600 hover:text-white transition-all shadow-xl">
              Connect with us
            </Link>
        </section>
      </div>
    </main>
  );
}
