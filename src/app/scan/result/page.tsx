"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Clock, Activity, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '0m', glucose: 90 },
  { time: '30m', glucose: 110 },
  { time: '60m', glucose: 135 },
  { time: '90m', glucose: 115 },
  { time: '120m', glucose: 95 },
];

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-auto">
      {/* Header Image (Simulated base64 image here) */}
      <div className="relative h-64 bg-slate-800 rounded-b-[2rem] overflow-hidden shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Scanned Meal" 
          className="object-cover w-full h-full opacity-60"
        />
        <div className="absolute top-0 left-0 p-6 w-full flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <Link href="/dashboard" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            AI Verified
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl font-extrabold text-white leading-tight drop-shadow-md">
            PCOS-Friendly Power Bowl
          </h1>
          <p className="text-teal-200 mt-2 font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" /> 320 kcal • Optimal for you
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-6">
        
        {/* Ingredient Swap Engine */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            AI Logic Engine
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 items-start text-sm">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold">1</div>
              <div>
                <span className="font-semibold text-slate-800">Food Swap: </span>
                <span className="text-slate-600">Swapped white rice for quinoa due to <span className="font-semibold px-1 bg-red-100 text-red-700 rounded">PCOS</span> profile.</span>
              </div>
            </li>
            <li className="flex gap-3 items-start text-sm">
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center font-bold">2</div>
              <div>
                <span className="font-semibold text-slate-800">Bioavailability: </span>
                <span className="text-slate-600">Added lemon (Vit C) to boost iron absorption from spinach.</span>
              </div>
            </li>
            <li className="flex gap-3 items-start text-sm">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center font-bold">3</div>
              <div>
                <span className="font-semibold text-slate-800">Chrononutrition: </span>
                <span className="text-slate-600">Detected <span className="font-semibold px-1 bg-purple-100 text-purple-700 rounded">&lt;6h sleep</span>. Carbs reduced by 15%.</span>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Sequencing Engine */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-orange-500" />
            Optimal Sequencing
          </h3>
          <div className="flex justify-between items-center px-4 relative">
            <div className="absolute h-1 bg-slate-100 top-1/2 left-8 right-8 -translate-y-1/2 z-0" />
            
            <div className="flex flex-col items-center z-10 bg-white px-2">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 border-2 border-white flex items-center justify-center font-bold shadow-sm">1</div>
              <span className="text-xs font-semibold mt-2">Fiber</span>
              <span className="text-[10px] text-slate-400">Spinach</span>
            </div>

            <div className="flex flex-col items-center z-10 bg-white px-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 border-2 border-white flex items-center justify-center font-bold shadow-sm">2</div>
              <span className="text-xs font-semibold mt-2">Protein</span>
              <span className="text-[10px] text-slate-400">Chicken</span>
            </div>

            <div className="flex flex-col items-center z-10 bg-white px-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 border-2 border-white flex items-center justify-center font-bold shadow-sm">3</div>
              <span className="text-xs font-semibold mt-2">Carbs</span>
              <span className="text-[10px] text-slate-400">Quinoa</span>
            </div>
          </div>
          <p className="text-xs text-center text-slate-500 mt-4 bg-slate-50 p-2 rounded-lg">
            Eating in this order flattens your glucose curve by 60%.
          </p>
        </motion.div>

        {/* Glucose Chart */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            Glucose Prediction
          </h3>
          <div className="h-48 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="glucose" 
                  stroke="#14b8a6" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#14b8a6', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <button className="w-full mt-4 bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
            Log This Meal
          </button>
        </motion.div>

      </div>
    </div>
  );
}
