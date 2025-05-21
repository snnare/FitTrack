// types/workout.ts

// Interfaz para la estructura de un ejercicio dentro de una rutina
export interface Exercise {
    nombre: string;
    series: number;
    repeticiones: number;
    peso?: number; // Opcional
    notas?: string; // Opcional
}

// Interfaz para los datos base de una rutina de entrenamiento, tal como se definen en el modelo de Mongoose
export interface RutinaData {
    nombre: string;
    descripcion: string;
    objetivo: "Ganar peso" | "Perder peso" | "Definir" | "Mantener"; // Refleja el 'enum' del backend
    nivelExperiencia: "Principiante" | "Intermedio" | "Avanzado"; // Refleja el 'enum' del backend
    categoria: "Pecho" | "Espalda" | "Piernas" | "Glúteos" | "Brazos" | "Hombro" | "Abs" | "Full Body"; // Refleja el 'enum' del backend
    ejercicios: Exercise[]; // Un array de ejercicios
}

// Interfaz que extiende WorkoutData y añade las propiedades específicas del backend para un documento de Mongoose
export interface Rutina extends RutinaData {
    _id: string; // El ID único generado por MongoDB
    // Si tu backend también devuelve un 'userId' asociado a la rutina (aunque no lo veo en tu schema de rutina actual),
    // lo añadirías aquí:
    // userId: string;
    // O si tu backend devuelve timestamps como 'createdAt' y 'updatedAt':
    // createdAt?: string; // Fecha de creación
    // updatedAt?: string; // Fecha de última actualización
}