import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import DailyMetric from '@/models/DailyMetric';
import { calculateCalorieLimit } from '@/lib/utils';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    // In production, user auth context would provide the userId. 
    // Creating a mockObjectId for prototype demo.
    const body = await req.json();
    const mockUserId = new mongoose.Types.ObjectId();
    
    const { steps, sleepHours, heartRateAvg, caloriesBurned } = body;
    const date = new Date().toISOString().split('T')[0];

    // Recalculate AI rules dynamically:
    const targetCalories = calculateCalorieLimit(steps);
    let healthScore = 100; // start at a base score and adjust based on inputs
    if (sleepHours < 6) healthScore -= 10;
    if (heartRateAvg > 90) healthScore -= 5;
    if (steps > 10000) healthScore += 10;

    // Optional: Log to DB
    const metric = new DailyMetric({
      userId: mockUserId, // Replace with decoded user session var
      date,
      fitness: {
        steps,
        sleepHours,
        heartRateAvg,
        caloriesBurned
      },
      dynamicLimits: {
        targetCalories,
        healthScore
      }
    });

    // Uncomment this in production once mongodb is linked
    // await metric.save();

    return NextResponse.json({
      success: true,
      message: "Daily metrics updated",
      data: metric
    });

  } catch (error) {
    console.error("Metrics API Error:", error);
    return NextResponse.json({ error: "Failed to update daily metrics" }, { status: 500 });
  }
}
