import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Logic: waist / height > 0.5 → isThinFat = true
export function calculateIsThinFat(waist_cm: number, height_cm: number): boolean {
  if (!waist_cm || !height_cm) return false;
  return (waist_cm / height_cm) > 0.5;
}

// Logic: calories = 1500 + steps * 0.04
export function calculateCalorieLimit(steps: number): number {
  return Math.round(1500 + (steps * 0.04));
}
