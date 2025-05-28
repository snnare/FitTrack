export interface RegisterData {
  nombre?: string;
  apellidos?: string;
  correo: string;
  password: string;
  fechaNacimiento?: string | null; 
  genero?: 'Masculino' | 'Femenino' | null;
  peso?: string | null; 
  estatura?: string | null; 
  objetivo?: 'Ganar peso' | 'Perder peso' | 'Definir' | 'Mantener' | null;
  nivelExperiencia?: 'Principiante' | 'Intermedio' | 'Avanzado';
  }