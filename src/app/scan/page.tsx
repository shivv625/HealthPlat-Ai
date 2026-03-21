"use client";

import { motion } from "framer-motion";
import { Camera, X, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CameraScanScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    let currentStream: MediaStream | null = null;
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        currentStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.error("Camera access denied", err);
        setErrorMsg('Camera permission denied or unavailable. Please check settings.');
      }
    };
    enableCamera();
    
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !streamActive) return;
    setIsProcessing(true);

    const context = canvasRef.current.getContext('2d');
    if (context) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      const imageBase64 = canvasRef.current.toDataURL('image/jpeg', 0.8);
      
      localStorage.setItem('scannedImage', imageBase64);
      
      // Simulate AI Processing time locally
      setTimeout(() => {
        router.push('/scan/result');
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center overflow-hidden">
      {/* Viewfinder Header */}
      <div className="absolute top-0 w-full z-10 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => router.back()} className="p-2 rounded-full bg-white/20 backdrop-blur-md">
          <X className="w-6 h-6" />
        </button>
        <span className="font-medium tracking-wide">AI Food Scanner</span>
        <div className="w-10" />
      </div>

      {errorMsg && (
        <div className="absolute top-20 z-20 bg-red-500/90 text-white p-4 rounded-xl max-w-sm text-center font-bold">
          {errorMsg}
        </div>
      )}

      {/* Camera Feed */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover rounded-3xl" 
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Frame overlay for UI aesthetic */}
      <div className="absolute z-10 inset-0 pointer-events-none flex flex-col items-center justify-center">
         <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-teal-500 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-teal-500 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-teal-500 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-teal-500 rounded-br-3xl" />
         </div>
      </div>

      {/* Processing Animation Overlay */}
      {isProcessing && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute inset-0 bg-teal-900/80 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-8 text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-24 h-24 border-4 border-teal-200 border-t-teal-600 rounded-full mb-8 relative"
          >
            <Zap className="absolute inset-0 m-auto w-8 h-8 text-teal-300 animate-pulse" />
          </motion.div>
          <motion.h2 className="text-2xl font-bold text-white mb-2">Analyzing meal...</motion.h2>
        </motion.div>
      )}

      {/* Capture Controls */}
      {!isProcessing && (
        <div className="absolute bottom-0 w-full z-10 pb-20 pt-10 flex justify-center items-center bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleCapture}
            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 bg-transparent"
          >
             <div className="w-full h-full bg-white rounded-full flex items-center justify-center hover:bg-slate-200" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
