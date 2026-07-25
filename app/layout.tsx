import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    default: "SEDS Antariksh | Exploring Beyond Boundaries",
    template: "%s | SEDS Antariksh"
  },
  description: "Official website for SEDS Antariksh - Students for the Exploration and Development of Space.",
  openGraph: {
    title: "SEDS Antariksh",
    description: "Exploring Beyond Boundaries.",
    url: "https://sedsantariksh.com",
    siteName: "SEDS Antariksh",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEDS Antariksh",
    description: "Exploring Beyond Boundaries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-white selection:text-black" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
