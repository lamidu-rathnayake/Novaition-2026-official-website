import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-bebas",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Novaition 2026",
  description: "Official AI event website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} antialiased`}
        suppressHydrationWarning
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
