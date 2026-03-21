import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  demographics: {
    age: number;
    gender: string;
    height_cm: number;
    weight_kg: number;
    waist_cm: number;
  };
  medical: {
    diseases: string[];
    medications: string[];
    isThinFat: boolean;
  };
  preferences: {
    language: string;
    likedMeals: string[];
    dislikedIngredients: string[];
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  demographics: {
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    height_cm: { type: Number, required: true },
    weight_kg: { type: Number, required: true },
    waist_cm: { type: Number, required: true },
  },
  medical: {
    diseases: [{ type: String }],
    medications: [{ type: String }],
    isThinFat: { type: Boolean, default: false },
  },
  preferences: {
    language: { type: String, default: 'en' },
    likedMeals: [{ type: String }],
    dislikedIngredients: [{ type: String }],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
