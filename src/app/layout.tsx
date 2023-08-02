import './globals.css';
import { Inter } from 'next/font/google';

import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InterviewAI',
  description: 'Interview with AI'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased')}>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
