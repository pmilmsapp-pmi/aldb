import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PwaRegister from './pwa-register';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aldebaran PMI - Pembelajaran Kesiapsiagaan Bencana",
  description: "Generasi muda tangguh bencana dengan pembelajaran interaktif dari PMI Kabupaten Klaten",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        {children}
        <PwaRegister />
      </body>
    </html>
  )
}

