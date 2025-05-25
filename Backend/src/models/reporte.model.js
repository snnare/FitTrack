import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    mesReportado: { type: Number, required: true },
    anioReportado: { type: Number, required: true },
    tituloReporte: { type: String, default: "Reporte Mensual de Progreso Físico" },
    nombreUsuario: { type: String, required: true },
    fechaReporte: { type: String, required: true },
    objetivoUsuario: { type: String, trim: true, default: "No especificado"},
    resumenEjecutivo: {
        progresoGeneral: { type: String },
        logrosMejoras: { type: String },
        mensajeAliento: { type: String }
    },

    datosMedidasSemanales: [{
        fechaMedicion: { type: Date },
        peso: { type: Number },
        altura: { type: Number },
        cintura: { type: Number },
        cadera: { type: Number },
        pecho: { type: Number },
        muslo: { type: Number },
        pantorrilla: { type: Number },
        brazoRelajado: { type: Number },
        brazoFlexionado: { type: Number },
        porcentajeGrasaCorporal: { type: Number },
    }],

    analisisProgresoMensual: {
        cambioPeso: {
            pesoInicial: { type: Number },
            pesoFinal: { type: Number },
            cambioTotal: { type: Number }
        },
        cambioCircunferencias: {
            cintura: { inicial: Number, final: Number, cambio: Number },
            cadera: { inicial: Number, final: Number, cambio: Number },
            pecho: { inicial: Number, final: Number, cambio: Number },
            muslo: { inicial: Number, final: Number, cambio: Number },
            pantorrilla: { inicial: Number, final: Number, cambio: Number },
            brazoRelajado: { inicial: Number, final: Number, cambio: Number },
            brazoFlexionado: { inicial: Number, final: Number, cambio: Number }
        },
        cambioGrasaCorporal: {
            porcentajeInicial: { type: Number },
            porcentajeFinal: { type: Number },
            cambioTotal: { type: Number }
        },
        calculoIMC: {
            imcInicial: { type: Number },
            imcFinal: { type: Number },
            clasificacionInicial: { type: String },
            clasificacionFinal: { type: String }
        },
        relacionCinturaCadera: {
            inicial: { type: Number },
            final: { type: Number },
            riesgoInicial: { type: String },
            riesgoFinal: { type: String }
        }
    }
}, {
    timestamps: true // Opcional: añade campos createdAt y updatedAt automáticamente
});

// Definimos el índice único para asegurar un solo reporte por usuario por mes
reporteSchema.index({ userId: 1, mesReportado: 1, anioReportado: 1 }, { unique: true });

const Reporte = mongoose.model('Reporte', reporteSchema);
export default Reporte;