export interface UserData {
    nombre?: string;
    apellidos?: string;
    correo: string;
    password: string;
    fechaNacimiento?: string | null; // Cambiado a string para el input
    genero?: string
    peso?: number | null; // Cambiado a string para el input
    estatura?: string | null; // Cambiado a string para el input
    objetivo?: 'Ganar peso' | 'Perder peso' | 'Definir' | 'Mantener' | null;
    nivelExperiencia?: 'Principiante' | 'Intermedio' | 'Avanzado';
    }