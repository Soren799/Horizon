import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import CursorGlow from "@/components/CursorGlow";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leo",
  description: "Music & Works — by Leo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} grain`}>
      <body className="font-sans antialiased">
        <CursorGlow />
        <noscript>
          <style>{`.gsap-pre { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
