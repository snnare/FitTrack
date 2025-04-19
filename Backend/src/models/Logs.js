import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    userId: {
        type: String,
        trim: true
    },
    ejercicio: {
        type: String,
        required: [true, 'El tipo de ejercicio es obligatorio'],
        trim: true
    },
    series: {
        type: Number,
        required: [false, 'El número de series es obligatorio'],
        min: [1, 'Debe haber al menos 1 serie'],
    },
    repeticiones: {
        type: Number,
        required: [false, 'El número de repeticiones es obligatorio'],
        min: [1, 'Debe haber al menos 1 repetición'],
        max: [100, 'No puede haber más de 100 repeticiones'],
    },
    peso: {
        type: Number,
        required: [false, 'El peso es obligatorio'],
        min: [0, 'El peso no puede ser negativo'],
        max: [500, 'El peso no puede exceder los 500 kg'],
    },
    notas: {
        type: String,
        trim: false,
        maxlength: [300, 'Las notas no pueden exceder los 300 caracteres'],
        default: null,
    },
}, {
    timestamps: true,
});

const Log = mongoose.model('Log', logSchema);
export default Log;
