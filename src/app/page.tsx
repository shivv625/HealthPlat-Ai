"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, HeartPulse, Activity } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    age: "",
    gender: "female",
    height: "",
    weight: "",
    waist: "",
    conditions: [] as string[]
  });

  useEffect(() => {
    if (localStorage.getItem('onboardingCompleted') === 'v2') {
      router.replace('/dashboard');
    }
  }, [router]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Complete onboarding
      localStorage.setItem('onboardingCompleted', 'v2');
      localStorage.setItem('userProfile', JSON.stringify(formData));
      router.push('/dashboard');
    }
  };

  const toggleCondition = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition) 
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-6 pb-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

      <div className="w-full flex justify-between items-center mt-8 mb-10 z-10">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">HealthPlate <span className="text-teal-500">AI</span></h1>
        <span className="text-xs font-bold text-slate-400 bg-slate-200 px-3 py-1 rounded-full">Step {step}/3</span>
      </div>

      <div className="flex-1 relative z-10">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Let's build your profile</h2>
            <p className="text-slate-500 mb-8">AI needs accurate baselines to calculate your nutritional engine.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Age</label>
                <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full mt-1 bg-white border border-slate-200 rounded-xl p-4 text-lg font-bold text-slate-800 shadow-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. 28" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Gender</label>
                <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full mt-1 bg-white border border-slate-200 rounded-xl p-4 text-lg font-bold text-slate-800 shadow-sm outline-none">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Body Metrics</h2>
            <p className="text-slate-500 mb-8">Used to calculate your daily metabolic constraints.</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Height (cm)</label>
                  <input type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} className="w-full mt-1 bg-white border border-slate-200 rounded-xl p-4 text-lg font-bold text-slate-800 shadow-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="165" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Weight (kg)</label>
                  <input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full mt-1 bg-white border border-slate-200 rounded-xl p-4 text-lg font-bold text-slate-800 shadow-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="65" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                  Waist Size (cm) <span className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded ml-2">Thin-Fat indicator</span>
                </label>
                <input type="number" value={formData.waist} onChange={e => setFormData({...formData, waist: e.target.value})} className="w-full mt-1 bg-white border border-slate-200 rounded-xl p-4 text-lg font-bold text-slate-800 shadow-sm focus:ring-2 focus:ring-teal-500 outline-none" placeholder="e.g. 80" />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-4">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Medical Profile</h2>
            <p className="text-slate-500 mb-8">This determines strict AI dietary rules and ingredient swaps.</p>
            
            <div className="space-y-3">
              {['PCOS', 'Diabetes Type 2', 'Thyroid (Hypo)', 'Hypertension', 'Insulin Resistance'].map(condition => {
                const isSelected = formData.conditions.includes(condition);
                return (
                  <div 
                    key={condition}
                    onClick={() => toggleCondition(condition)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-colors flex justify-between items-center font-bold ${isSelected ? 'border-teal-500 bg-teal-50 text-teal-900' : 'border-slate-200 bg-white text-slate-600'}`}
                  >
                    <span>{condition}</span>
                    {isSelected && <div className="w-3 h-3 rounded-full bg-teal-500" />}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 relative z-10 mt-auto"
      >
        {step === 3 ? "Initialize AI Engine" : "Continue"}
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
