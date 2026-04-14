'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Trophy, 
  Target, 
  Droplets, 
  Fingerprint, Map, PieChart, Star, FileText
} from 'lucide-react';
import jsPDF from 'jspdf';
import { getSupabaseBrowserClient } from '@/app/lib/supabase-browser';

export default function GodModeAnalytics() {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState({
    clubs: [],
    members: [],
    events: [],
    stats: { hours: 0, efficiency: 0, activeMemberPercentage: 0, projectDensity: 0, totalImpact: 0 }
  });

  useEffect(() => { fetchComplexAnalytics(); }, []);

  const fetchComplexAnalytics = async () => {
    const supabase = getSupabaseBrowserClient();
    setLoading(true);
    try {
      const { data: m } = await supabase.from('members').select('*');
      const { data: e } = await supabase.from('events').select('*').eq('is_approved', true);
      const { data: c } = await supabase.from('clubs').select('*');

      if (m && e && c) {
        const totalH = m.reduce((acc, curr) => acc + (Number(curr.volunteer_hours) || 0), 0);
        const totalB = e.reduce((acc, curr) => acc + (Number(curr.beneficiaries_count) || 0), 0);
        const activeMembers = m.filter(mem => mem.volunteer_hours > 0).length;
        
        setDistrictData({
          clubs: c,
          members: m,
          events: e,
          stats: {
            hours: totalH,
            totalImpact: totalB,
            efficiency: m.length > 0 ? (totalH / m.length).toFixed(1) : 0, 
            activeMemberPercentage: m.length > 0 ? ((activeMembers / m.length) * 100).toFixed(0) : 0,
            projectDensity: c.length > 0 ? (e.length / c.length).toFixed(1) : 0
          }
        });
      }
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 👇 FIX: Added the function to actually send the audit alert
  const handleRequestAudit = async (clubName) => {
    try {
      const supabase = getSupabaseBrowserClient();
      const club = districtData.clubs.find(c => c.name === clubName);
      if (!club || !club.president_email) {
        alert("⚠️ President email not found for this club.");
        return;
      }

      const { error } = await supabase.from('notifications').insert([{
        target_email: club.president_email,
        message: `URGENT: District DRR/Admin has requested an Activity Audit for ${clubName}. Please update your rosters and service logs immediately.`,
        is_read: false,
        created_at: new Date()
      }]);

      if (error) throw error;
      alert(`🚨 Audit alert sent successfully to the President of ${club.name}!`);
    } catch (err) {
      alert("Failed to send audit request: " + err.message);
    }
  };

  const generatePDFReport = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(15, 15, 15);
      doc.rect(0, 0, 210, 297, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(30);
      doc.text("SERVICE AUDIT - RID 3080", 20, 50);
      doc.save(`RID3080_Global_Audit.pdf`);
    } catch (err) { console.error(err); }
  };

  const zoneStats = districtData.clubs.reduce((acc, club) => {
    const clubMembers = districtData.members.filter(mem => mem.club_name === club.name);
    const clubHours = clubMembers.reduce((sum, curr) => sum + (Number(curr.volunteer_hours) || 0), 0);
    if (!acc[club.zone]) acc[club.zone] = { hours: 0, clubs: 0 };
    acc[club.zone].hours += clubHours;
    acc[club.zone].clubs += 1;
    return acc;
  }, {});

  const topClubs = districtData.clubs.map(club => {
    const clubEvents = districtData.events.filter(ev => ev.club_name === club.name).length;
    const impact = districtData.events.filter(ev => ev.club_name === club.name).reduce((sum, curr) => sum + (Number(curr.beneficiaries_count) || 0), 0);
    return { name: club.name, impact, events: clubEvents };
  }).sort((a, b) => b.impact - a.impact).slice(0, 5);

  const riskClubs = districtData.clubs.filter(club => {
    const hasActivity = districtData.events.some(ev => ev.club_name === club.name) || 
                       districtData.members.some(m => m.club_name === club.name && m.volunteer_hours > 0);
    return !hasActivity;
  }).slice(0, 6);

  if (loading) return <div className="min-h-screen bg-neutral-50 dark:bg-black text-rose-600 flex items-center justify-center font-black animate-pulse uppercase tracking-[0.3em] text-center px-6">Crunching District DNA...</div>;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#050505] text-neutral-900 dark:text-white pt-16 md:pt-6 pb-20 px-4 md:px-6 font-sans relative overflow-x-hidden transition-colors duration-300">
      
      {/* 🌌 Background FX */}
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-rose-600/10 dark:bg-rose-600/5 blur-[100px] md:blur-[180px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">
        
        {/* BACK BUTTON */}
        <div className="relative z-[99]">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-neutral-900 dark:text-white transition-colors text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-white dark:bg-white/5 px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-neutral-200 dark:border-white/10 shadow-sm">
            <ArrowLeft size={14} md={16} /> Back to Hub
          </Link>
        </div>

        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div className="text-left">
            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              District <span className="text-rose-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-rose-500 dark:to-orange-500 text-not-italic">Pulse</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={generatePDFReport}
              className="bg-rose-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-3xl flex items-center justify-center gap-3 shadow-lg shadow-rose-500/30 transition-all"
            >
              <FileText size={16} />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none">Global Audit</span>
            </button>

            <div className="bg-white dark:bg-white/[0.03] border border-orange-200 dark:border-orange-500/30 shadow-[0_5px_15px_rgba(249,115,22,0.05)] p-3 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-md flex items-center gap-4">
                <div className="text-left">
                  <p className="text-[8px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-1">Mobilization</p>
                  <span className="text-2xl md:text-4xl font-black italic text-orange-600 dark:text-orange-500 leading-none">{districtData.stats.activeMemberPercentage}%</span>
                </div>
                <div className="h-8 w-[1px] bg-orange-200 dark:bg-orange-500/20" />
                <p className="text-[8px] font-bold text-neutral-500 uppercase leading-tight">Active<br/>Members</p>
            </div>
          </div>
        </div>

        {/* 🚀 HIGH-LEVEL STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Impact', val: districtData.stats.totalImpact, ic: Users, bgBox: 'bg-green-600', border: 'border-green-200 dark:border-green-500/30', shadowBox: 'shadow-[0_10px_30px_rgba(22,163,74,0.05)]', iconShadow: 'shadow-green-500/30' },
            { label: 'Hours', val: districtData.stats.hours, ic: Clock, bgBox: 'bg-rose-600', border: 'border-rose-200 dark:border-rose-500/30', shadowBox: 'shadow-[0_10px_30px_rgba(225,29,72,0.05)]', iconShadow: 'shadow-rose-500/30' },
            { label: 'Efficiency', val: districtData.stats.efficiency, ic: Target, bgBox: 'bg-blue-600', border: 'border-blue-200 dark:border-blue-500/30', shadowBox: 'shadow-[0_10px_30px_rgba(37,99,235,0.05)]', iconShadow: 'shadow-blue-500/30' },
            { label: 'Density', val: districtData.stats.projectDensity, ic: PieChart, bgBox: 'bg-orange-600', border: 'border-orange-200 dark:border-orange-500/30', shadowBox: 'shadow-[0_10px_30px_rgba(249,115,22,0.05)]', iconShadow: 'shadow-orange-500/30' },
          ].map((s, i) => (
            <div key={i} className={`bg-white dark:bg-white/[0.03] border ${s.border} p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] ${s.shadowBox} flex flex-col`}>
               <div className={`w-10 h-10 md:w-12 md:h-12 ${s.bgBox} text-white rounded-xl flex items-center justify-center mb-4 shadow-md ${s.iconShadow}`}>
                 <s.ic size={20} />
               </div>
               <p className="text-neutral-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">{s.label}</p>
               <h3 className="text-2xl md:text-5xl font-black tracking-tighter italic text-neutral-900 dark:text-white leading-none mt-1">{s.val}</h3>
            </div>
          ))}
        </div>

        {/* ZONE & IMPACT TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white dark:bg-white/[0.02] border border-rose-200 dark:border-rose-500/30 p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] shadow-[0_10px_30px_rgba(225,29,72,0.05)]">
            <h2 className="text-lg md:text-xl font-black flex items-center gap-3 text-rose-600 uppercase italic tracking-tighter mb-6 md:mb-8">
              <div className="w-10 h-10 bg-rose-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-rose-500/20"><Map size={18}/></div> 
              Zone Performance
            </h2>
            <div className="space-y-4 md:space-y-6">
               {Object.entries(zoneStats).map(([zone, data]) => (
                 <div key={zone} className="space-y-1.5 md:space-y-2">
                    <div className="flex justify-between items-end text-neutral-900 dark:text-white">
                      <p className="font-black uppercase text-xs">Zone {zone}</p>
                      <p className="text-rose-600 text-xs font-black italic">{data.hours} HRS</p>
                    </div>
                    <div className="w-full h-1.5 md:h-2 bg-rose-100 dark:bg-rose-500/10 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-600" style={{ width: `${(data.hours / (districtData.stats.hours || 1)) * 100}%` }} />
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-white/[0.02] border border-amber-200 dark:border-amber-500/30 p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] shadow-[0_10px_30px_rgba(217,119,6,0.05)]">
            <h2 className="text-lg md:text-xl font-black flex items-center gap-3 text-amber-600 uppercase italic tracking-tighter mb-8 md:mb-10">
              <div className="w-10 h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-amber-500/20"><Trophy size={18}/></div>
              Leadership Matrix
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
               {topClubs.map((club, i) => (
                 <div key={i} className="bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm">
                    <div className="flex justify-between items-start mb-2 md:mb-4">
                      <span className="text-[8px] font-black text-amber-600 dark:text-amber-500 uppercase bg-amber-100 dark:bg-amber-500/10 px-2 py-1 rounded-md">Rank #0{i+1}</span>
                      <div className="flex gap-1 text-amber-500">{[...Array(Math.max(1, 5-i))].map((_, s) => <Star key={s} size={10} fill="currentColor" />)}</div>
                    </div>
                    <h4 className="text-sm md:text-lg font-black uppercase tracking-tight mb-3 text-neutral-900 dark:text-white leading-tight">{club.name}</h4>
                    <div className="flex justify-between border-t border-amber-100 dark:border-amber-500/10 pt-3 md:pt-4">
                       <div><p className="text-lg md:text-xl font-black italic text-green-600">{club.impact}</p><p className="text-[7px] text-neutral-500 font-black uppercase">Lives</p></div>
                       <div className="text-right"><p className="text-lg md:text-xl font-black italic text-blue-600">{club.events}</p><p className="text-[7px] text-neutral-500 font-black uppercase">Projects</p></div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* DRR RADAR */}
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30 p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] shadow-xl relative overflow-hidden">
           <h2 className="text-xl md:text-2xl font-black flex items-center gap-3 text-red-600 dark:text-red-500 uppercase italic tracking-tighter mb-8 relative z-10">
             <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-red-500/30"><Fingerprint size={24}/></div>
             DRR Radar
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {riskClubs.map((club, i) => (
                <div key={i} className="bg-white dark:bg-black/40 border border-red-200 dark:border-red-500/20 p-4 md:p-5 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-between shadow-sm">
                   <div>
                     <h4 className="text-sm md:text-lg font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-1 leading-tight">{club.name}</h4>
                     <p className="text-[8px] text-red-600 font-bold uppercase tracking-widest bg-red-100 dark:bg-red-500/10 inline-block px-2 py-0.5 rounded-md">Zone {club.zone} | Dormant</p>
                   </div>
                   {/* 👇 FIX: Added onClick to trigger the audit request */}
                   <button 
                     onClick={() => handleRequestAudit(club.name)}
                     className="mt-4 md:mt-6 py-2.5 md:py-3 bg-red-600 text-white rounded-xl text-[8px] font-black uppercase shadow-md shadow-red-500/20 hover:bg-red-700 transition-colors active:scale-95"
                   >
                     Request Audit
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* BLOOD MATRIX */}
        <div className="bg-white dark:bg-white/[0.02] border border-rose-200 dark:border-rose-500/30 p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] shadow-[0_10px_30px_rgba(225,29,72,0.05)]">
           <h2 className="text-lg md:text-xl font-black flex items-center gap-3 text-rose-600 uppercase italic tracking-tighter mb-6 md:mb-8">
             <div className="w-10 h-10 bg-rose-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-rose-500/20"><Droplets size={18}/></div>
             Blood Support Matrix
           </h2>
           <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => {
                const count = districtData.members.filter(m => m.blood_group === type).length;
                return (
                  <div key={type} className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-3 md:p-6 rounded-2xl md:rounded-3xl text-center shadow-sm">
                    <p className="text-lg md:text-2xl font-black text-rose-600">{type}</p>
                    <p className="text-[8px] text-rose-600/70 dark:text-rose-400 font-black uppercase tracking-tighter mt-1">{count} U</p>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
    </main>
  );
}
