import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "NeuricBuild | AI-Powered Agency",
  description: "Next-gen web development, social media, and content creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans min-h-screen flex flex-col antialiased selection:bg-primary/30`}
      >
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
