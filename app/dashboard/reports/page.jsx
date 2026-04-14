'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Award, Clock, Send, Lock, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/app/lib/supabase-browser';

export default function IndividualReporting() {
  const [members, setMembers] = useState([]);
  const [clubInfo, setClubInfo] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [isNominationOpen] = useState(() => new Date().getDate() >= 25);
  const [status, setStatus] = useState('');
  const router = useRouter();
  
  const [nominationData, setNominationData] = useState({
    rotaractor_name: '',
    achievements: '',
    month: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())
  });

  const fetchClubAndMembers = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/login');
      return;
    }

    const { data: clubData } = await supabase
      .from('clubs')
      .select('name, zone')
      .eq('president_email', session.user.email)
      .single();

    if (clubData) {
      setClubInfo(clubData);
      const { data: membersData } = await supabase
        .from('members')
        .select('*')
        .eq('club_name', clubData.name) 
        .order('name', { ascending: true });
      
      if (membersData) setMembers(membersData);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchClubAndMembers();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [fetchClubAndMembers]);

  const handleHourUpdate = async (id, hours) => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase
      .from('members')
      .update({ volunteer_hours: hours })
      .eq('id', id);
    
    if (!error) {
      setMembers((currentMembers) =>
        currentMembers.map((member) =>
          member.id === id ? { ...member, volunteer_hours: hours } : member
        )
      );
    }
  };

  const handleNominationSubmit = async (e) => {
    e.preventDefault();
    if (!clubInfo) return;
    const supabase = getSupabaseBrowserClient();

    const { error } = await supabase.from('monthly_reports').insert([{
      ...nominationData,
      club_name: clubInfo.name
    }]);

    if (!error) {
        setStatus('Nomination Submitted! 🏆');
        setNominationData({ ...nominationData, rotaractor_name: '', achievements: '' });
    }
  };

  if (loading) return <div className="min-h-screen bg-neutral-50 dark:bg-black flex items-center justify-center text-rose-600 dark:text-rose-500 font-black italic animate-pulse uppercase tracking-widest px-6 text-center text-sm">Verifying Roster...</div>;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-20 md:pt-10 px-4 md:px-6 pb-20 font-sans transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* UNIFIED HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-neutral-900 dark:text-white hover:text-amber-600 transition-colors text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 px-3 py-2 md:px-4 md:py-3 rounded-xl shadow-sm">
              <ArrowLeft size={14} md={16} /> Back
            </Link>
            <div>
              <h1 className="text-lg md:text-2xl font-black italic uppercase tracking-tighter leading-none">
                Impact <span className="text-amber-600 dark:text-amber-500 text-not-italic">Tracking</span>
              </h1>
              <p className="text-neutral-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mt-1 line-clamp-1">
                {clubInfo?.name || "Official Service Log"}
              </p>
            </div>
          </div>
        </div>

        {clubInfo ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
            
            {/* LEFT: INDIVIDUAL HOURS LOG - PERMANENTLY HIGHLIGHTED (BLUE) */}
            <div className="lg:col-span-2 space-y-6">
              {/* 👇 FIX: Permanent Blue tinted border and shadow */}
              <div className="bg-white dark:bg-white/[0.03] border border-blue-200 dark:border-blue-500/30 p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_10px_30px_rgba(37,99,235,0.05)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <h2 className="text-lg md:text-xl font-bold flex items-center gap-3 text-blue-600 dark:text-blue-500">
                    {/* 👇 FIX: Solid Blue Icon Box */}
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                      <Clock size={18} />
                    </div>
                    Member Service
                  </h2>
                  <span className="text-[8px] md:text-[10px] bg-blue-600 text-white px-3 py-1.5 rounded-full font-black uppercase tracking-widest italic w-fit shadow-sm shadow-blue-500/30">
                    Update Monthly
                  </span>
                </div>
                
                <div className="space-y-3 max-h-[500px] md:max-h-[600px] overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
                  {members.length === 0 ? (
                    <p className="text-neutral-500 text-sm italic py-10 text-center">Roster empty. Please add members.</p>
                  ) : (
                    members.map((member) => (
                      <div key={member.id} className="bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/5 p-4 rounded-xl flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm tracking-tight truncate text-neutral-900 dark:text-white">{member.name}</p>
                          <p className="text-[9px] text-neutral-500 font-black uppercase truncate">{member.district_id}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* 👇 FIX: Permanent inner shadow and blue border for input */}
                          <input 
                            type="number" 
                            defaultValue={member.volunteer_hours}
                            onBlur={(e) => handleHourUpdate(member.id, e.target.value)}
                            className="w-16 md:w-20 bg-blue-50/50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/30 rounded-lg px-2 py-2 text-center text-sm font-bold focus:border-blue-500 outline-none text-blue-600 dark:text-blue-400 shadow-inner"
                            placeholder="0"
                          />
                          <span className="text-[9px] font-black text-blue-600/50 dark:text-blue-400/50 uppercase">Hrs</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: ROM NOMINATION - PERMANENTLY HIGHLIGHTED (AMBER) */}
            <div className="space-y-6">
              {/* 👇 FIX: Permanent Amber tinted border and shadow */}
              <div className={`bg-white dark:bg-white/[0.03] border border-amber-200 dark:border-amber-500/30 p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_10px_30px_rgba(217,119,6,0.05)] transition-all ${!isNominationOpen ? 'opacity-50 grayscale' : ''}`}>
                <h2 className="text-lg md:text-xl font-bold flex items-center gap-3 text-amber-600 dark:text-amber-500 mb-6 uppercase italic tracking-tighter leading-tight">
                  {/* 👇 FIX: Solid Amber Icon Box */}
                  <div className="w-10 h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
                    <Award size={18} />
                  </div>
                  Nominate ROM
                </h2>
                {!isNominationOpen && (
                  <div className="bg-amber-600 text-white p-4 rounded-xl text-[9px] font-black uppercase mb-6 flex items-start gap-2 shadow-sm shadow-amber-500/20">
                    <Lock size={14} className="shrink-0" />
                    Window: 25th - EOM
                  </div>
                )}
                <form onSubmit={handleNominationSubmit} className="space-y-4">
                  {/* 👇 FIX: Inner shadow and amber border focus logic */}
                  <select 
                    required 
                    value={nominationData.rotaractor_name}
                    onChange={e => setNominationData({...nominationData, rotaractor_name: e.target.value})}
                    className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-amber-500 text-neutral-900 dark:text-white shadow-inner"
                  >
                    <option value="">Select Nominee</option>
                    {members.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                  </select>
                  
                  <textarea 
                    required 
                    rows="3"
                    placeholder="Reason for Nomination..."
                    value={nominationData.achievements}
                    onChange={e => setNominationData({...nominationData, achievements: e.target.value})}
                    className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 resize-none shadow-inner text-neutral-900 dark:text-white"
                  ></textarea>
                  
                  {/* 👇 FIX: Solid permanent Amber button */}
                  <button className="w-full bg-amber-600 text-white font-black py-4 rounded-xl text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-amber-500/30 hover:bg-amber-700 transition-all flex items-center justify-center gap-2">
                    Submit <Send size={12} />
                  </button>
                </form>
                {status && <p className="text-green-600 text-[9px] mt-4 font-black uppercase text-center animate-pulse">{status}</p>}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 p-10 rounded-[2rem] text-center">
             <ShieldAlert className="mx-auto text-red-600 mb-4" size={48} />
             <h2 className="text-red-600 font-black text-xl mb-2 uppercase">Access Restricted</h2>
             <p className="text-neutral-500 text-xs italic">Account not linked to a club roster.</p>
          </div>
        )}
      </div>
    </main>
  );
}
