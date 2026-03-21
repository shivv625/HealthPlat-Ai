import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";

import PWARegistry from "@/components/PWARegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthPlate AI",
  description: "Your personalized AI-driven health and meal planning app.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HealthPlate AI",
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 pb-16`}>
        <PWARegistry />
        <main className="min-h-screen max-w-md mx-auto bg-white shadow-xl relative flex flex-col">
          {children}
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
