'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle'; // Make sure the path is correct

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // 🛑 PRO UI LOGIC: Dashboard, Admin, aur Login page par Navbar hide kar do
  if (
    pathname?.startsWith('/dashboard') || 
    pathname?.startsWith('/admin') || 
    pathname?.startsWith('/login')
  ) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Clubs', href: '/clubs' },
    { name: 'Council', href: '/council' },
    { name: 'Service', href: '/service' },
    { name: 'Rotary', href: '/rotary' },
    { name: 'Events', href: '/events' }, 
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'pt-2 md:pt-4' : 'pt-4 md:pt-6'} px-4 md:px-6`}>
      {/* 👇 FIX 1: Wapas max-w-7xl kiya taaki saare links fit ho jayein */}
      <div className="max-w-7xl mx-auto relative">
        
        <div className={`relative z-50 flex items-center justify-between bg-white/80 dark:bg-black/60 border border-neutral-200 dark:border-white/10 backdrop-blur-xl px-5 sm:px-8 py-3 sm:py-4 rounded-[2rem] transition-all ${scrolled ? 'shadow-xl shadow-black/5 dark:shadow-black/50' : ''}`}>
          
          {/* LOGO SECTION */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-rose-600 rounded-[0.8rem] flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-rose-500/20 shrink-0">
              <span className="font-black text-white text-[10px] md:text-xs tracking-tighter">3080</span>
            </div>
            <div className="hidden sm:block">
              <h2 className="text-xs md:text-sm font-black uppercase tracking-tighter leading-none text-neutral-900 dark:text-white italic whitespace-nowrap">Rotaract 3080</h2>
              <p className="text-[7px] md:text-[8px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-1 leading-none whitespace-nowrap">RID 3080 • India</p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION - 👇 FIX 2: whitespace-nowrap aur smart paddings */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-2 gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`whitespace-nowrap px-2.5 xl:px-4 py-2 rounded-full text-[9px] xl:text-[10px] font-black uppercase tracking-widest transition-all ${
                  pathname === link.href 
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ACTIONS & TOGGLES */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            <ThemeToggle />

            <Link 
              href="/login" 
              className="hidden md:flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 dark:hover:bg-rose-500 hover:text-white dark:hover:text-white transition-all shadow-sm whitespace-nowrap"
            >
              <ShieldCheck size={14} /> Portal
            </Link>

            {/* MOBILE HAMBURGER */}
            <button 
              className="lg:hidden text-neutral-800 dark:text-white p-1.5 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} className="text-rose-600" /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* PREMIUM MOBILE APP DRAWER */}
        <div className={`lg:hidden fixed inset-x-0 top-[70px] h-[calc(100vh-70px)] bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur-2xl transition-all duration-500 z-40 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
          <div className="flex flex-col h-full p-4 pt-6 overflow-y-auto pb-24">
            <div className="flex flex-col gap-2.5">
              <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1 ml-2 italic">Menu</p>
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-black uppercase tracking-widest p-5 rounded-[1.5rem] transition-all flex items-center justify-between ${
                    pathname === link.href 
                    ? 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20' 
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-white/10">
              <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 ml-2 italic">Authorized Personnel</p>
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                <ShieldCheck size={18} /> Access President Portal
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </nav>
  );
}