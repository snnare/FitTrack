import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: false,
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
  },
  apellidos: {
    type: String,
    required: false,
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
  fechaNacimiento: {
    type: Date,
    required: false,
    default: null,
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino'],
    default: null,
  },
  peso: {
    type: Number,
    default: null,
    min: 0,
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
    enum: ["Ganar peso", "Perder peso", "Definir", "Mantener"],
    default: null,
  },
  nivelExperiencia: {
    type: String,
    enum: ["Principiante", "Intermedio", "Avanzado"],
    default: "Principiante",
  },
  profileComplete:{
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;