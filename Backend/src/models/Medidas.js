import mongoose, { Schema } from 'mongoose';

const medidaSchema = new Schema({
    userId: { 
        type: String,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
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
});

const Medida = mongoose.model('Medida', medidaSchema);

export default Medida;
