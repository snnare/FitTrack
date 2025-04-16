import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    apellidos: { type: String, required: true, trim: true },
    correo: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    nivelExperiencia: { type: String, enum: ["Principiante", "Intermedio", "Avanzado"], default: "Principiante" },
}, { timestamps: true });

const Trainer = mongoose.model('Trainer', trainerSchema);
export default Trainer;