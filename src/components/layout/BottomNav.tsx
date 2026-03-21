"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Camera, Activity, Settings } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  // Highlight active path
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 flex justify-around items-center h-16 pb-safe z-50 rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <Link href="/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/dashboard') ? 'text-teal-600' : 'text-slate-400'}`}>
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-medium">Home</span>
      </Link>
      
      {/* Route to the robust In-App Camera Screen */}
      <Link href="/scan" className="relative group focus:outline-none">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-[0_4px_20px_rgba(20,184,166,0.5)] transition-transform hover:scale-105 active:scale-95 cursor-pointer z-50">
          <Camera className="w-7 h-7" />
        </div>
      </Link>

      <Link href="/metrics" className={`flex flex-col items-center gap-1 ml-4 ${isActive('/metrics') ? 'text-teal-600' : 'text-slate-400'}`}>
        <Activity className="w-6 h-6" />
        <span className="text-[10px] font-medium">Metrics</span>
      </Link>

      <Link href="/settings" className={`flex flex-col items-center gap-1 ${isActive('/settings') ? 'text-teal-600' : 'text-slate-400'}`}>
        <Settings className="w-6 h-6" />
        <span className="text-[10px] font-medium">Settings</span>
      </Link>
    </nav>
  );
}
