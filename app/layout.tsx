import type { Metadata } from "next";
import { Orbitron, Rajdhani,  } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',       // Bebas Neue only supports 400 on Google Fonts
  subsets: ['latin'],
  variable: "--font-bebas",
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

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
        className={`${orbitron.variable} ${rajdhani.variable} ${bebasNeue.variable} antialiased`}
        suppressHydrationWarning
      >
        <Preloader />
        {children}
      </body>
    </html>
  );
}
