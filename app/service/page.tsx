'use client';

import { 
  Users2, Globe2, Briefcase, Megaphone, 
  CheckCircle2, HeartPulse, ShieldCheck, Globe,
  BookOpen, Leaf // Imported new icons for Literacy and Environment
} from 'lucide-react';

// 👇 FIX: Added 2 new avenues and updated icons
const servicePillars = [
  { title: "Community Service", desc: "Projects rooted in local needs and visible impact across geography.", icon: <HeartPulse size={28} /> },
  { title: "Club Service", desc: "Focusing on stronger club culture, member participation, and fellowship.", icon: <Users2 size={28} /> },
  { title: "Vocational Service", desc: "Empowering members through skill-building and professional growth.", icon: <Briefcase size={28} /> },
  { title: "International Service", desc: "Cross-border collaboration and global fellowship via Rotary.", icon: <Globe2 size={28} /> },
  { title: "Public Image", desc: "District storytelling, communication, and footprint visibility.", icon: <Megaphone size={28} /> },
  { title: "Youth Leadership", desc: "Mentoring the next generation through the Rotary ecosystem.", icon: <ShieldCheck size={28} /> },
  { title: "Literacy Services", desc: "Eradicating illiteracy and supporting basic education in communities.", icon: <BookOpen size={28} /> },
  { title: "Environment & Health", desc: "Fostering sustainable practices and promoting general community wellness.", icon: <Leaf size={28} /> },
];

// 👇 FIX: Added 'Building Future Leaders'
const rotaryFocus = [
  "Promoting Peace", 
  "Fighting Disease", 
  "Water & Sanitation", 
  "Maternal & Child Health", 
  "Supporting Education", 
  "Growing Local Economies", 
  "Protecting the Environment",
  "Building Future Leaders"
];

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-24 md:pt-32 pb-20 px-4 md:px-6 font-sans transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <header className="mb-12 md:mb-24">
          <p className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-3 md:mb-4 italic leading-none">
            • Rotaract and Rotary in action
          </p>
          <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-none">
            Service <span className="text-rose-600 dark:text-rose-500 text-not-italic font-sans">Pillars</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed font-medium italic">
            &quot;Service areas designed to organize the district&apos;s identity into strong visual blocks.&quot;
          </p>
        </header>

        {/* PILLARS GRID - PERMANENTLY HIGHLIGHTED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-24">
          {servicePillars.map((p, i) => (
            // 👇 FIX: Permanent borders and shadow
            <div key={i} className="bg-white dark:bg-white/5 border border-rose-200 dark:border-rose-500/30 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_10px_30px_rgba(225,29,72,0.05)] flex flex-col">
              
              {/* 👇 FIX: Icon is always solid pink block */}
              <div className="w-16 h-16 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
                {p.icon}
              </div>
              
              {/* 👇 FIX: Heading is always pink */}
              <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter mb-3 md:mb-4 text-rose-600 dark:text-rose-500 leading-tight">
                {p.title}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm leading-relaxed font-medium italic mt-auto">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ROTARY AREAS OF FOCUS - PERMANENT HIGHLIGHTS */}
        <section className="bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/10 p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden mb-20 md:mb-24 shadow-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-rose-600 hidden md:block">
            <Globe size={300} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-10 md:mb-12 text-neutral-900 dark:text-white">
              Rotary <span className="text-rose-600 dark:text-rose-500">Areas of Focus</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {rotaryFocus.map((item, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  {/* 👇 FIX: Check circle is permanently solid pink */}
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  {/* 👇 FIX: Text is permanently highlighted */}
                  <span className="text-sm md:text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISTRICT RHYTHM */}
        <section className="mt-20 md:mt-32 border-t border-neutral-200 dark:border-white/5 pt-16 md:pt-20">
           <h2 className="text-center text-rose-600 dark:text-rose-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] mb-12 md:mb-16 italic underline-offset-8">
              • How service becomes district culture
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
              {[
                { title: "Identify a Need", desc: "Starting with a real, measurable community issue." },
                { title: "Mobilize Clubs", desc: "Collaborating across zones and sponsors." },
                { title: "Measure Result", desc: "Tracking impact, participation, and continuity." }
              ].map((step, i) => (
                <div key={i} className="space-y-3 md:space-y-4">
                  <div className="text-4xl md:text-5xl font-black text-rose-500/20 dark:text-rose-500/10 italic">0{i+1}</div>
                  <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-white">{step.title}</h4>
                  <p className="text-neutral-500 text-xs md:text-sm italic">{step.desc}</p>
                </div>
              ))}
           </div>
        </section>

      </div>
    </main>
  );
}
