'use client';

import { useState } from 'react';
// 👇 FIX: Added ExternalLink to the import list
import { Send, Mail, Globe, MessageSquare, Loader2, ExternalLink } from 'lucide-react';
import { getSupabaseBrowserClient, isUsingMockBackend } from '@/app/lib/supabase-browser';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.role,
          message: formData.message,
          created_at: new Date()
        }
      ]);

      if (error) throw error;

      if (!isUsingMockBackend()) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: "16a6d627-af6b-41a6-918b-760df2148d08", 
            subject: `New Portal Alert from: ${formData.name}`,
            name: formData.name,
            email: formData.email,
            "Affiliation": formData.role,
            message: formData.message,
          })
        });
      }
      
      setStatus(isUsingMockBackend() ? 'Message saved in local demo backend.' : 'Message sent successfully! 🚀');
      setFormData({ name: '', email: '', role: '', message: '' }); 
      setTimeout(() => setStatus(''), 4000);
    } catch (error) {
      setStatus('Failed to send: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white pt-24 md:pt-32 pb-20 px-4 md:px-6 font-sans transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <header className="mb-12 md:mb-24">
          <p className="text-rose-600 dark:text-rose-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px] mb-4 italic tracking-widest leading-none">
            • talk to the district
          </p>
          <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-none">
            Contact <span className="text-rose-600 dark:text-rose-500 text-not-italic font-sans">3080</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed font-medium italic">
            &quot;Keep communication clean, useful, and easy to act on. Structured so clubs and visitors can quickly find the right path.&quot;
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* CONTACT FORM */}
          <div className="lg:col-span-7 bg-white dark:bg-white/[0.03] border border-rose-200 dark:border-rose-500/30 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_10px_30px_rgba(225,29,72,0.05)] transition-all">
            <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3 text-rose-600 dark:text-rose-500">
              <MessageSquare size={24} /> Submit<span className="text-neutral-900 dark:text-white text-not-italic">Inquiry</span>
            </h2>

            {isUsingMockBackend() && (
              <div className="mb-6 rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 px-4 py-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">Local Demo Mode</p>
                <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">Submissions are saved in browser storage on this machine.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-2 tracking-widest italic">Full Name</label>
                  <input 
                    type="text" required placeholder="Your Name" value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-sm focus:border-rose-500 outline-none transition-all text-neutral-900 dark:text-white shadow-inner" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-2 tracking-widest italic">Email Address</label>
                  <input 
                    type="email" required placeholder="name@email.com" value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-sm focus:border-rose-500 outline-none transition-all text-neutral-900 dark:text-white shadow-inner" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-2 tracking-widest italic">Your Affiliation / City</label>
                <input 
                  type="text" placeholder="e.g. RAC Chandigarh / Guest / Sponsor" required value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-sm focus:border-rose-500 outline-none transition-all text-neutral-900 dark:text-white shadow-inner" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black uppercase text-rose-600 dark:text-rose-500 ml-2 tracking-widest italic">Message</label>
                <textarea 
                  rows="4" required placeholder="How can we help you?" value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-sm focus:border-rose-500 outline-none resize-none transition-all text-neutral-900 dark:text-white shadow-inner"
                ></textarea>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full bg-rose-600 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl hover:bg-rose-700 transition-all uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 shadow-lg shadow-rose-500/30"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <><Send size={16} /> Send Message</>}
              </button>

              {status && (
                <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center mt-4 ${status.includes('Failed') ? 'text-red-600' : 'text-green-600 animate-pulse'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* OFFICIAL INFO BLOCKS */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6">
            <div className="bg-white dark:bg-white/5 border border-rose-200 dark:border-rose-500/30 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm">
              <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-rose-500/30">
                 <Mail size={28} />
              </div>
              <p className="text-neutral-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 italic leading-none">Official Mail</p>
              <h3 className="text-xl md:text-2xl font-black italic text-neutral-900 dark:text-white mb-2 break-words">drr@rotaract3080.org</h3>
              <p className="text-[9px] md:text-[10px] font-bold text-rose-600 uppercase tracking-widest">RID 3080 • India</p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-rose-200 dark:border-rose-500/30 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-sm">
              <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-rose-500/30">
                 <Globe size={28} />
              </div>
              <p className="text-neutral-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 italic leading-none">Global Mission</p>
              <h3 className="text-xl md:text-2xl font-black italic text-neutral-900 dark:text-white mb-3 md:mb-4">Rotary International</h3>
              <a href="https://www.rotary.org" target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase text-rose-600 dark:text-rose-500 tracking-[0.2em] hover:underline flex items-center gap-2">
                 Visit rotary.org <ExternalLink size={10} />
              </a>
            </div>

            <div className="p-8 md:p-10 border border-dashed border-rose-300 dark:border-rose-500/30 rounded-[2rem] md:rounded-[3rem] text-center bg-rose-50/50 dark:bg-rose-500/5">
              <p className="text-neutral-600 dark:text-neutral-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] italic leading-relaxed">
                &quot;Connecting clubs, leaders, and visitors through a singular district movement.&quot;
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
