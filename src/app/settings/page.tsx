"use client";

import { motion } from "framer-motion";
import { User, Shield, Bell, LogOut, ChevronRight, Activity, Cpu } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24 pt-12 p-6">
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1 max-w-xs">
          Manage your AI preferences and health constraints.
        </p>
      </motion.div>

      <div className="mt-8 space-y-6">
        
        {/* Profile Group */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Account</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            <Link href="/profile" className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">Personal Info</h3>
                <p className="text-xs text-slate-500">Sarah Jenkins</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </Link>
            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">Security & Privacy</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        </section>

        {/* AI Group */}
        <section>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">AI Configuration</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">Medical Constraints</h3>
                <p className="text-xs text-slate-500">PCOS, Insulin Resistance</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">LLM Processing</h3>
                <p className="text-xs text-slate-500">Gpt-4o / Vision enabled</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        </section>

        {/* Action Button */}
        <button className="w-full flex items-center justify-center gap-2 mt-8 py-4 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>

      </div>
    </div>
  );
}
