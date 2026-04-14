'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowLeft, Trash2, IdCard, ShieldAlert, Hash, Droplets, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/app/lib/supabase-browser';

export default function ManageMembers() {
  const [members, setMembers] = useState([]);
  const [clubInfo, setClubInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [newMember, setNewMember] = useState({ 
    name: '', 
    email: '', 
    designation: '', 
    ri_id: '', 
    blood_group: '', 
    phone: '' 
  });
  
  const router = useRouter();

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

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!clubInfo) return;
    const supabase = getSupabaseBrowserClient();

    const districtId = `RID3080-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalRiId = newMember.ri_id.trim() === '' ? null : newMember.ri_id;
    
    const { error } = await supabase.from('members').insert([{
      ...newMember,
      ri_id: finalRiId,
      club_name: clubInfo.name,
      district_id: districtId,
      volunteer_hours: 0
    }]);

    if (!error) {
      setNewMember({ name: '', email: '', designation: '', ri_id: '', blood_group: '', phone: '' });
      fetchClubAndMembers();
    } else {
        alert("Error: " + error.message);
    }
  };

  const deleteMember = async (id) => {
    const supabase = getSupabaseBrowserClient();
    if(confirm("Permanently delete this member from District Roster?")) {
      await supabase.from('members').delete().eq('id', id);
      fetchClubAndMembers();
    }
  };

  if (loading) return <div className="min-h-screen bg-neutral-50 dark:bg-black flex items-center justify-center text-rose-600 dark:text-rose-500 font-black animate-pulse uppercase tracking-widest">Loading Roster...</div>;

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-4 md:pt-10 px-4 md:px-6 pb-20 transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* 🚀 UNIFIED HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-10 bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-neutral-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-neutral-100 dark:bg-white/5 px-3 py-2 md:px-4 md:py-3 rounded-xl border border-transparent hover:border-blue-200 dark:hover:border-blue-500/20">
              <ArrowLeft size={14} md={16} /> Back
            </Link>
            <div className="min-w-0">
              <h1 className="text-lg md:text-2xl font-black italic uppercase tracking-tighter text-neutral-900 dark:text-white leading-none truncate">
                {clubInfo?.name || "Manage"} <span className="text-blue-600 dark:text-blue-500 text-not-italic">Registry</span>
              </h1>
              <p className="text-neutral-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1">
                District 3080 • Zone {clubInfo?.zone}
              </p>
            </div>
          </div>
        </div>

        {clubInfo ? (
          <>
            {/* 🎯 DETAILED REGISTRATION FORM - PERMANENTLY HIGHLIGHTED */}
            <form onSubmit={handleAddMember} className="bg-white dark:bg-white/[0.02] border border-rose-200 dark:border-rose-500/30 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] mb-8 md:mb-12 shadow-[0_10px_30px_rgba(225,29,72,0.05)] transition-all">
              <h3 className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-500 mb-6 flex items-center gap-2">
                <UserPlus size={18}/> New Enrollment
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-8">
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-1 tracking-widest">Full Name</label>
                  <input type="text" placeholder="Member Name" required value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-rose-500 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 shadow-inner" />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-1 tracking-widest">Email Address</label>
                  <input type="email" placeholder="member@example.com" required value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-rose-500 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 shadow-inner" />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-1 tracking-widest">Designation</label>
                  <input type="text" placeholder="e.g. Vice President" required value={newMember.designation} onChange={e => setNewMember({...newMember, designation: e.target.value})} className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-rose-500 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 shadow-inner" />
                </div>
                
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-1 tracking-widest">RI ID (If any)</label>
                  <input type="text" placeholder="Rotary International ID" value={newMember.ri_id} onChange={e => setNewMember({...newMember, ri_id: e.target.value})} className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-rose-500 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 shadow-inner" />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-1 tracking-widest">Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" required value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-rose-500 outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 shadow-inner" />
                </div>

                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-1 tracking-widest">Blood Group</label>
                  <select required value={newMember.blood_group} onChange={e => setNewMember({...newMember, blood_group: e.target.value})} className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:border-rose-500 outline-none appearance-none text-neutral-900 dark:text-white shadow-inner">
                    <option value="" className="bg-white dark:bg-black text-neutral-400">Select Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg} className="bg-white dark:bg-black text-neutral-900 dark:text-white">{bg}</option>)}
                  </select>
                </div>
              </div>

              {/* 👇 FIX: Solid permanent colored action button */}
              <div className="flex items-end mt-4 lg:w-1/3 ml-auto">
                <button className="w-full bg-rose-600 text-white font-black py-4 rounded-xl hover:bg-rose-700 transition-all text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-rose-500/30">
                  Register Member
                </button>
              </div>
            </form>

            {/* MEMBERS LIST - PERMANENTLY HIGHLIGHTED */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {members.map(m => (
                <div key={m.id} className="bg-white dark:bg-white/[0.03] border border-rose-200 dark:border-rose-500/30 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_10px_20px_rgba(225,29,72,0.03)] flex flex-col">
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* 👇 FIX: Icon Box always solid pink */}
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-rose-600 text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-md shadow-rose-500/20 shrink-0">
                        <IdCard size={20} md={24}/>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-base md:text-lg leading-tight truncate text-neutral-900 dark:text-white">{m.name}</p>
                        <p className="text-[9px] text-rose-600 dark:text-rose-500 font-black uppercase tracking-widest truncate">{m.designation}</p>
                      </div>
                    </div>
                    {/* 👇 FIX: Solid obvious delete button */}
                    <button onClick={() => deleteMember(m.id)} className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 p-2 rounded-xl transition-colors shrink-0">
                      <Trash2 size={16}/>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-t border-rose-100 dark:border-rose-500/10 pt-4 text-[9px] font-bold uppercase tracking-tighter mt-auto">
                    <div className="flex items-center gap-2 text-neutral-500 truncate col-span-2">
                        <Mail size={10} className="text-rose-600 shrink-0" /> Email: <span className="text-neutral-900 dark:text-white ml-auto truncate lowercase normal-case tracking-normal">{m.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 truncate">
                        <Hash size={10} className="text-rose-600 shrink-0" /> RI ID: <span className="text-neutral-900 dark:text-white ml-auto truncate">{m.ri_id || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 truncate">
                        <Droplets size={10} className="text-rose-600 shrink-0" /> Blood: <span className="text-neutral-900 dark:text-white ml-auto">{m.blood_group}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 truncate">
                        <Phone size={10} className="text-rose-600 shrink-0" /> Call: <span className="text-neutral-900 dark:text-white ml-auto truncate">{m.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-500 truncate">
                        <IdCard size={10} className="text-rose-600 shrink-0" /> Dist: <span className="text-neutral-900 dark:text-white ml-auto truncate">{m.district_id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
            <div className="text-center py-20 bg-red-50 dark:bg-red-500/5 rounded-3xl border border-red-200">
                <ShieldAlert className="mx-auto text-red-600 mb-4" size={50} />
                <h2 className="text-red-600 dark:text-red-500 font-black uppercase italic text-sm">Access Denied</h2>
                <p className="text-neutral-500 text-xs">Mapping not found for your account.</p>
            </div>
        )}
      </div>
    </main>
  );
}
