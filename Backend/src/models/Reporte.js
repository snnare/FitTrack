import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true,
        trim: true,
    },
    fechaGeneracion: {
        type: Date,
        default: Date.now, 
    },
    datos: {
        type: mongoose.Schema.Types.Mixed, 
        required: [true, 'Los datos del reporte son obligatorios'],
    },
}, {
    timestamps: true,
});

const Reporte = mongoose.model('Reporte', reporteSchema);
export default Reporte;