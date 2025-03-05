import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
    userId: {
        type: String, // Correo del usuario
        required: [true, 'El correo del usuario es obligatorio'],
        trim: true,
    },
    fechaGeneracion: {
        type: Date,
        default: Date.now, // Fecha en que se generó el reporte
    },
    datos: {
        type: mongoose.Schema.Types.Mixed, // Almacenamos los datos del reporte en un objeto flexible
        required: [true, 'Los datos del reporte son obligatorios'],
    },
}, {
    timestamps: true,
});

const Reporte = mongoose.model('Reporte', reporteSchema);
export default Reporte;