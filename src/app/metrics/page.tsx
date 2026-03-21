"use client";

import { motion } from "framer-motion";
import { Moon, HeartPulse, Footprints, Info } from "lucide-react";
import { useState } from "react";
import { calculateCalorieLimit } from "@/lib/utils";

export default function MetricsPage() {
  const [steps, setSteps] = useState(3969);
  const [sleep, setSleep] = useState(6.5);
  const [heartRate, setHeartRate] = useState(72);
  const [calorieAdjustment, setCalorieAdjustment] = useState(calculateCalorieLimit(3969));

  const handleStepsChange = (val: number) => {
    setSteps(val);
    setCalorieAdjustment(calculateCalorieLimit(val));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-6 pt-12 pb-24">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Daily Vitals</h1>
        <p className="text-slate-500 mt-2 text-sm max-w-xs">
          Your AI updates your nutritional needs dynamically based on these metrics.
        </p>
      </motion.div>

      <div className="mt-8 space-y-6">
        {/* Steps Slider */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                <Footprints className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-700">Steps</span>
            </div>
            <span className="text-2xl font-black text-blue-600">{steps}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="20000" 
            step="100"
            value={steps} 
            onChange={(e) => handleStepsChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex gap-2 items-start mt-4 bg-slate-50 p-3 rounded-xl border border-blue-100">
            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
            <p className="text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Earned +{calorieAdjustment - 1500} kcal</span> allowance today based on activity.
            </p>
          </div>
        </motion.div>

        {/* Sleep & Heart Rate Row */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <Moon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 text-sm font-medium">Sleep</span>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-black text-slate-800">{sleep}</span>
                <span className="text-sm font-medium text-slate-500 mb-1">hrs</span>
              </div>
            </div>
            {sleep < 6 && (
              <span className="inline-block mt-3 text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded">
                Low Sleep (AI limits Carbs)
              </span>
            )}
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-slate-500 text-sm font-medium">Heart Rate</span>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-black text-slate-800">{heartRate}</span>
                <span className="text-sm font-medium text-slate-500 mb-1">bpm</span>
              </div>
            </div>
            {heartRate > 90 && (
              <span className="inline-block mt-3 text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded">
                High Stress (AI shifts to light meal)
              </span>
            )}
          </motion.div>
        </div>

        <motion.button 
          onClick={() => {
            localStorage.setItem('dailyMetrics', JSON.stringify({ steps, sleep, heartRate, calorieAdjustment }));
            window.location.href = '/dashboard';
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-xl shadow-slate-900/10 transition-colors"
        >
          Save Daily Metrics
        </motion.button>
      </div>
    </div>
  );
}
