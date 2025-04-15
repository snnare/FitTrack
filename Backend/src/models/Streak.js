import mongoose from 'mongoose';

const streakSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, trim: true, lowercase: true }, 
  currentStreak: { type: Number, default: 0 },
  lastLogDate: { type: Date, default: null },
});

export default mongoose.model('Streak', streakSchema);



