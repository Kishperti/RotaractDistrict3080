'use client';

import { useState } from 'react';
import { Lock, Mail, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getBackendLabel, getSupabaseBrowserClient, isUsingMockBackend } from '@/app/lib/supabase-browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const usingMockBackend = isUsingMockBackend();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Pehle apni Email ID likho bhai!");
      return;
    }
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) alert(error.message);
    else alert("Reset link aapki email par bhej diya gaya hai! Check karo.");
  };

  return (
    // 👇 FIX: pt-20 on mobile taaki back button aur form mein gap rahe
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white flex items-center justify-center px-4 md:px-6 pt-20 md:pt-0 transition-colors duration-300 relative overflow-hidden">
      
      {/* 🚀 BACK TO WEBSITE BUTTON */}
      {/* 👇 FIX: Mobile par positioning thodi adjust ki hai */}
      <div className="absolute top-6 left-4 md:top-8 md:left-10 z-50">
        <Link href="/" className="group flex items-center gap-2 text-neutral-500 hover:text-rose-600 dark:hover:text-rose-500 transition-colors text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-white dark:bg-white/5 px-3 py-2.5 md:px-4 md:py-3 rounded-xl border border-neutral-200 dark:border-white/10 shadow-sm">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="hidden xs:inline">Back to Website</span>
          <span className="xs:hidden">Back</span>
        </Link>
      </div>

      {/* Background Decor - Fixed for Mobile */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-rose-500/10 dark:bg-rose-500/5 blur-[80px] md:blur-[120px] rounded-full -z-10" />

      {/* LOGIN CARD */}
      {/* 👇 FIX: Padding p-8 on mobile, p-12 on desktop. Rounded corners adjusted for small screens. */}
      <div className="max-w-md w-full bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl dark:shadow-2xl backdrop-blur-md">
        
        <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-600 dark:text-rose-500 border border-rose-100 dark:border-rose-500/20">
                <ShieldCheck size={28} md={32} />
            </div>
        </div>

        {/* 👇 FIX: text-3xl on mobile */}
        <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-8 text-center uppercase">
            Login <span className="text-rose-600 dark:text-rose-500">Portal</span>
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase text-neutral-500 ml-2 tracking-widest">Official Email</label>
            <div className="relative">
              <Mail className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={16} md={18} />
              <input
                required
                type="email"
                placeholder="president@clubname.com"
                className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl md:rounded-2xl pl-12 md:pl-14 pr-5 md:pr-6 py-3.5 md:py-4 text-sm outline-none focus:border-rose-500 transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-700 shadow-inner"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase text-neutral-500 ml-2 tracking-widest">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-neutral-400" size={16} md={18} />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl md:rounded-2xl pl-12 md:pl-14 pr-5 md:pr-6 py-3.5 md:py-4 text-sm outline-none focus:border-rose-500 transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-700 shadow-inner"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="text-right">
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-[9px] md:text-[10px] font-black text-neutral-400 hover:text-rose-600 dark:hover:text-rose-500 transition-colors tracking-widest uppercase"
            >
              Forgot Password?
            </button>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-neutral-900 dark:bg-rose-600 text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl tracking-[0.2em] uppercase text-[10px] md:text-xs hover:bg-rose-600 dark:hover:bg-rose-500 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Enter Dashboard"}
          </button>
        </form>

        <p className="mt-8 text-center text-neutral-400 text-[8px] md:text-[9px] font-bold uppercase tracking-widest">
            Authorized Personnel Only • {getBackendLabel()}
        </p>

        {usingMockBackend && (
          <div className="mt-6 rounded-2xl border border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 p-4 text-left">
            <p className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Demo Login</p>
            <p className="mt-2 text-xs font-medium text-neutral-700 dark:text-neutral-200">Admin: `rkakkar2003@gmail.com` / `admin123`</p>
            <p className="mt-1 text-xs font-medium text-neutral-700 dark:text-neutral-200">Club: `president@midtown3080.org` / `club123`</p>
          </div>
        )}
      </div>
    </main>
  );
}
