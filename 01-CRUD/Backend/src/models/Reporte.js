import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({

  mes: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  año: {
    type: Number,
    required: true,
  },
  totalEjercicios: {
    type: Number,
    default: 0,
  },
  totalSeries: {
    type: Number,
    default: 0,
  },
  totalRepeticiones: {
    type: Number,
    default: 0,
  },
  pesoPromedio: {
    type: Number,
    default: 0,
  },
  pesoMaximo: {
    type: Number,
    default: 0,
  },
  logs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Log',
  }],
  generadoEn: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  index: { usuario: 1, mes: 1, año: 1 }, // Índice para búsquedas rápidas
});

const Reporte = mongoose.model('Reporte', reporteSchema);
export default Reporte;
