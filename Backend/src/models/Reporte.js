import mongoose from 'mongoose';

const reporteSchema = new mongoose.Schema({
    userId: { type: String },
    fechaCreacion: { type: Date, default: Date.now },
    mesReportado: { type: Number, required: true },
    anioReportado: { type: Number, required: true },
    tituloReporte: { type: String, default: "Reporte Mensual de Progreso Físico" },
    nombreUsuario: { type: String, required: true }, 
    fechaReporte: { type: String, required: true }, 

    resumenEjecutivo: {
        progresoGeneral: { type: String },
        logrosMejoras: { type: String },
        mensajeAliento: { type: String }
    },

    datosMedidasSemanales: [{
        fechaMedicion: { type: Date, required: true },
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
        notasUsuario: { type: String }
    }],

    analisisProgresoMensual: {
        cambioPeso: {
            pesoInicial: { type: Number },
            pesoFinal: { type: Number },
            cambioTotal: { type: Number }
            // La URL del gráfico se generará en el frontend, no se guarda aquí
        },
        cambioCircunferencias: {
            cintura: { inicial: Number, final: Number, cambio: Number },
            cadera: { inicial: Number, final: Number, cambio: Number },
            pecho: { inicial: Number, final: Number, cambio: Number },
            muslo: { inicial: Number, final: Number, cambio: Number },
            pantorrilla: { inicial: Number, final: Number, cambio: Number },
            brazoRelajado: { inicial: Number, final: Number, cambio: Number },
            brazoFlexionado: { inicial: Number, final: Number, cambio: Number }
            // Las URLs de los gráficos se generarán en el frontend
        },
        cambioGrasaCorporal: {
            porcentajeInicial: { type: Number },
            porcentajeFinal: { type: Number },
            cambioTotal: { type: Number }
            // La URL del gráfico se generará en el frontend
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
    },

    recomendacionesGenerales: {
        ajustesEjercicio: { type: String },
        consejosNutricion: { type: String },
        recordatorioConsistencia: { type: String },
        motivacionObjetivos: { type: String }
    },

    informacionAdicional: { type: String }
});

const Reporte = mongoose.model('Reporte', reporteSchema);
export default Reporte;