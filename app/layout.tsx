import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import Navbar from "@/components/Navbar";
import NavigationLoader from "@/components/NavigationLoader";
import { Suspense } from "react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SEDS Antariksh | Connecting Youth and Space",
    template: "%s | SEDS Antariksh"
  },
  description: "Official website for SEDS Antariksh - Connecting Youth and Space.",
  openGraph: {
    title: "SEDS Antariksh",
    description: "Connecting Youth and Space.",
    url: "https://sedsantariksh.com",
    siteName: "SEDS Antariksh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEDS Antariksh",
    description: "Connecting Youth and Space.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <Analytics />
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-white selection:text-black" suppressHydrationWarning>
        <Suspense fallback={null}>
          <NavigationLoader />
        </Suspense>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
