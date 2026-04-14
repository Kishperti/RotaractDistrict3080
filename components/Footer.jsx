import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-white/5 bg-white dark:bg-[#050505] py-6 md:py-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* District Copyright */}
        <p className="text-neutral-400 dark:text-neutral-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
          © 2026-27 Rotaract District 3080
        </p>

        {/* Minimalist Developer Credit */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-neutral-400 dark:text-neutral-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">
          <span className="whitespace-nowrap">
            Developed by <span className="text-rose-600 dark:text-rose-500 italic">Raghav & Sarthak</span>
          </span>
          
          {/* Subtle Contact Icons */}
          <div className="flex items-center gap-4 md:border-l md:border-neutral-200 md:dark:border-white/10 md:pl-4 mt-1 md:mt-0">
            <a href="https://www.linkedin.com/in/raghav-kakkar-117119253/" target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:rkakkar2003@gmail.com" className="hover:text-rose-600 transition-all">
              <Mail size={14} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}