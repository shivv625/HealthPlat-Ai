import mongoose, { Schema, Document } from 'mongoose';

export interface IDailyMetric extends Document {
  userId: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD format
  fitness: {
    steps: number;
    heartRateAvg: number;
    sleepHours: number;
    caloriesBurned: number;
  };
  dynamicLimits: {
    targetCalories: number;
    healthScore: number;
  };
}

const DailyMetricSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  fitness: {
    steps: { type: Number, default: 0 },
    heartRateAvg: { type: Number, default: 0 },
    sleepHours: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
  },
  dynamicLimits: {
    targetCalories: { type: Number, default: 2000 },
    healthScore: { type: Number, default: 100 },
  },
});

export default mongoose.models.DailyMetric || mongoose.model<IDailyMetric>('DailyMetric', DailyMetricSchema);
