import type { Metadata } from 'next';
import Script from 'next/script';
import '@/app/globals.css';
import BottomChaser from './components/BottomChaser';

export const metadata: Metadata = {
  title: 'Selvedin Kurtic | Mechatronics Portfolio',
  // SEO tracking parameters
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://googlesyndication.com"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased relative">
        <BottomChaser />
        
        {children}
      </body>
    </html>
  );
}
