// Define la interfaz para los datos de un log que enviarás a la API (para crear/actualizar)
export interface LogData {
    ejercicio: string;
    series: number;
    repeticiones: number;
    peso: number;
    notas?: string | null; // Es opcional para crear/actualizar
  }
  
  // Define la interfaz completa de un Log tal como lo recibes de la API
  // Incluye campos generados por Mongoose como _id, userId, timestamps, y __v
  export interface Log extends LogData {
    _id: string;
    userId: string; // El correo del usuario asociado
    createdAt: string;
    updatedAt: string;
    __v?: number; // Puede ser opcional, dependiendo de tu uso
  }