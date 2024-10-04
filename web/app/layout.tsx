import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Provider from './_components/provider';
import { Toaster } from '@/components/ui/sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navigation from './_components/navigation';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Telecoms',
  description: 'Upload and visualize data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <div className="font-sans">
            <Navigation />
            {children}
          </div>
        </Provider>
        <Toaster position="top-right" duration={5000} />
      </body>
    </html>
  );
}
