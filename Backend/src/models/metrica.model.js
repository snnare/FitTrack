import mongoose, { Schema } from 'mongoose';

const metricaSchema = new Schema({
    userId: { 
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    peso: {
        type: Number,
        required: true,
        min: 0
    },
    altura: {
        type: Number,
        required: true,
        min: 0
    },
    cintura: {
        type: Number,
        required: true,
        min: 0
    },
    cadera: {
        type: Number,
        required: true,
        min: 0
    },
     pecho: {
        type: Number,
        required: true,
        min: 0
    },
    muslo: {
        type: Number,
        required: true,
        min: 0
    },
    pantorrilla: {
        type: Number,
        required: true,
        min: 0
    },
    brazoRelajado: {
        type: Number,
        required: true,
        min: 0
    },
    brazoFlexionado: {
        type: Number,
        required: true,
        min: 0
    },
    porcentajeGrasaCorporal: {
        type: Number,
        min: 0,
        max: 100
    },
    notas: {
        type: String,
        trim: true
    }
},{ 
    timestamps: true,
});

const Metrica = mongoose.model('Metricas', metricaSchema);

export default Metrica;
