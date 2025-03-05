import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Campo obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
  },
  apellidos: {
    type: String,
    required:  [true, 'Campo obligatorio'],
    trim: true,
    minlength: [2, 'Los apellidos deben tener al menos 2 caracteres'],
    maxlength: [50, 'Los apellidos no pueden exceder los 50 caracteres'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (email) => /^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/.test(email),
      message: 'El correo no tiene un formato válido',
    },
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
  },
  telefono: {
    type: String,
    default: null,
    validate: {
      validator: (telefono) => !telefono || /^[0-9]{10}$/.test(telefono),
      message: 'El teléfono debe tener exactamente 10 dígitos',
    },
  },
  fechaNacimiento: {
    type: Date,
    default: null,
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    default: null,
  },
  peso: {
    type: Number,
    default: null,
    min: 30,
    max: 300,
  },
  estatura: {
    type: Number,
    default: null,
    min: 100,
    max: 250,
  },
  objetivo: {
    type: String,
    enum: ["Ganar peso", "Perder peso"],
    default: null,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;