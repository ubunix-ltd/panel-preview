import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const vodafoneFont = localFont({
  src: [
    {
      path: '../fonts/Vodafone.woff2',
      weight: '400',
      style: 'normal',
    },
    // Add other font weights/styles if needed
  ],
  variable: '--font-vodafone'
});

export const metadata: Metadata = {
  title: 'MediaFlow',
  description: 'Interactive media preview application.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#e60000" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${vodafoneFont.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
