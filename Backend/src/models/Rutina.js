import mongoose from 'mongoose';

const rutinaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    objetivo: { type: String, enum: ["Ganar peso", "Perder peso", "Definir", "Mantener"], required: true },
    nivelExperiencia: { type: String, enum: ["Principiante", "Intermedio", "Avanzado"], required: true },
    ejercicios: [{
        nombre: { type: String, required: true },
        series: { type: Number, required: true },
        repeticiones: { type: Number, required: true },
        peso: { type: Number },
        notas: { type: String },
    }],
});

const Rutina = mongoose.model('Rutina', rutinaSchema);
export default Rutina;