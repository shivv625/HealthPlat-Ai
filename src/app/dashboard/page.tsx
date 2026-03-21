"use client";

import { motion } from "framer-motion";
import { Activity, Apple, Flame, ChevronRight, Zap, Camera, HeartPulse, Footprints } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const glucoseData = [
  { time: 'Before', glucose: 92 },
  { time: '2:03 PM', glucose: 100 },
  { time: '2:30 PM', glucose: 135 },
  { time: '3:00 PM', glucose: 115 },
  { time: '4:00 PM', glucose: 95 },
];

export default function DashboardPage() {
  const [healthScore, setHealthScore] = useState(85);
  const [calories, setCalories] = useState({ consumed: 1240, limit: 1800 });
  const [metrics, setMetrics] = useState({ steps: 3969, heartRate: 72, sleep: 6.5, calorieAdjustment: 1658 });
  const [userName, setUserName] = useState("Guest");
  const [isReady, setIsReady] = useState(false);
  
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user has onboarded. We force verification here to prevent dashboard flash.
    if (localStorage.getItem('onboardingCompleted') !== 'v2') {
      router.replace('/');
      return;
    } else {
      setIsReady(true);
    }

    // Load dynamic user data
    const savedMetrics = localStorage.getItem('dailyMetrics');
    if (savedMetrics) {
      const parsed = JSON.parse(savedMetrics);
      setMetrics(parsed);
      setCalories(prev => ({ ...prev, limit: parsed.calorieAdjustment }));
      // Adjust Health Score mock
      let score = 85; 
      if (parsed.sleep < 6) score -= 10;
      if (parsed.heartRate > 90) score -= 5;
      if (parsed.steps > 8000) score += 10;
      setHealthScore(score);
    }

    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      // Just picking a name since profile only has age/weight etc
      // We can mock the name or just use 'User'
      setUserName("User"); 
    }
  }, [router]);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-bold animate-pulse">Checking your AI Engine Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 p-6 flex flex-col gap-6 pt-12">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
            Good morning, <br />
            <span className="text-slate-800">{userName}</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Ready to fuel your day?</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-[14px] bg-teal-100 flex items-center justify-center text-teal-600 font-bold border-2 border-white shadow-sm text-lg">
            {healthScore}
          </div>
          <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wide">Health</span>
        </div>
      </motion.header>

      {/* Main KPI Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 bg-gradient-to-br from-teal-500 to-blue-600 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10" />
        <p className="text-teal-100 font-medium mb-1 flex items-center gap-2">
          Calories Remaining
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">AI Adjusted limits</span>
        </p>
        <div className="flex items-end gap-2 my-2">
          <span className="text-4xl font-extrabold">{calories.limit - calories.consumed}</span>
          <span className="text-teal-100 mb-1">/ {calories.limit} kcal</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-black/20 rounded-full mt-4 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(calories.consumed / calories.limit) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full relative ${calories.consumed > calories.limit ? 'bg-rose-500' : 'bg-white'}`}
          />
        </div>

        <div className="flex justify-between mt-5 text-sm font-medium">
          <div className="flex flex-col">
            <span className="text-teal-200">Protein</span>
            <span>45g / 80g</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-teal-200">Carbs</span>
            <span>120g / 180g</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-teal-200">Fat</span>
            <span>35g / 55g</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4 relative z-10"
      >
        <Link href="/scan" className="flex flex-col gap-3 p-5 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer focus:outline-none text-left active:scale-[0.98] group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full pointer-events-none -mr-4 -mt-4 opacity-50" />
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Scan Meal</h3>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">In-App Lens</p>
          </div>
        </Link>
        <Link href="/metrics" className="flex flex-col gap-3 p-5 rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] group overflow-hidden relative">
          <div className="absolute top-0 left-0 w-16 h-16 bg-orange-50 rounded-br-full pointer-events-none -ml-4 -mt-4 opacity-50" />
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm flex-shrink-0 self-end">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-right">
            <h3 className="font-bold text-slate-800 text-sm">Log Vitals</h3>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">Steps & Sleep</p>
          </div>
        </Link>
      </motion.div>

      {/* Daily AI Vitals Readout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border font-bold">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Steps Today</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-800">{metrics.steps}</span>
              <span className="text-xs font-bold text-teal-500">+{metrics.calorieAdjustment - 1500} kcal</span>
            </div>
          </div>
        </div>
        
        <div className="w-px h-10 bg-slate-100 mx-2" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center border font-bold">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Curr. Pulse</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-800">{metrics.heartRate}</span>
              <span className="text-xs font-bold text-slate-400">bpm</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Glucose Spike Graph */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">Estimated Glucose</h2>
          <span className="text-[10px] bg-teal-50 text-teal-600 px-2 py-1 rounded-full font-bold">Stable Range</span>
        </div>
        <div className="h-44 w-full -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={glucoseData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="glucose" 
                stroke="#14b8a6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#14b8a6', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Recent History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Meals</h2>
          <span className="text-sm text-teal-600 font-medium">See all</span>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { name: "Chicken, Rice, Dal", time: "2:03 PM", cal: 480, icon: Activity, color: "text-orange-500", bg: "bg-orange-50" },
            { name: "Avocado Toast", time: "08:30 AM", cal: 320, icon: Apple, color: "text-green-500", bg: "bg-green-50" },
          ].map((meal, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center ${meal.bg} ${meal.color}`}>
                <meal.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{meal.name}</h4>
                <p className="text-xs font-medium text-slate-400 mt-0.5">{meal.time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-700">{meal.cal}</p>
                <p className="text-[10px] font-bold text-slate-300 uppercase">kcal</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-200 ml-1" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
