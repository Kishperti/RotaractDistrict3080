import './globals.css'; 
import Navbar from '@/components/Navbar'; // (Path check kar lena agar Navbar folder alag hai)
import Footer from '@/components/Footer'; 
import { ThemeProvider } from './ThemeProvider'; // 👈 Step 1: Ye import kiya

export const metadata = {
  title: 'Rotaract District 3080',
  description: 'Official Portal of Rotaract District 3080',
};

export default function RootLayout({ children }) {
  return (
    // 👇 Step 2: suppressHydrationWarning lagaya taaki error na aaye
    <html lang="en" suppressHydrationWarning>
      {/* 👇 Step 3: bg-black ko badal kar smart dark/light classes de di */}
      <body className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300">
        
        {/* 👇 Step 4: Poori website ko ThemeProvider ki power de di */}
        <ThemeProvider>
          
          {/* Navbar Wapas Aagaya! */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />

        </ThemeProvider>
        
      </body>
    </html>
  );
}