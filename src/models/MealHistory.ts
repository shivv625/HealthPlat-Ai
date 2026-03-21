import mongoose, { Schema, Document } from 'mongoose';

export interface IMealHistory extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  detectedIngredients: string[];
  aiResponse: {
    mealName: string;
    caloricImpact: number;
    sequencing: string[];
    bioavailability: string;
    glucoseCurvePrediction: number[];
  };
}

const MealHistorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  detectedIngredients: [{ type: String }],
  aiResponse: {
    mealName: { type: String, required: true },
    caloricImpact: { type: Number, required: true },
    sequencing: [{ type: String }],
    bioavailability: { type: String },
    glucoseCurvePrediction: [{ type: Number }],
  },
});

export default mongoose.models.MealHistory || mongoose.model<IMealHistory>('MealHistory', MealHistorySchema);
