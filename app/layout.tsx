import { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeModal from './components/ThemeModal';
// Replace your old import with this:
import './globals.css'; 


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Mount these globally inside the body container frame */}
        <ThemeModal />
        <Navbar />
        
        <main className="relative">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
