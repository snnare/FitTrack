// /types/reporteHTML.ts

export interface DatosMedidasSemanales {
  fechaMedicion?: string | null; // Cambiado a opcional y puede ser null
  peso: number;
  altura?: number | null; // Añadido como opcional y puede ser null
  cintura: number;
  cadera: number;
  pecho: number;
  muslo: number;
  pantorrilla: number;
  brazoRelajado: number;
  brazoFlexionado: number;
  porcentajeGrasaCorporal: number;
  _id?: string; // Agregado como opcional
}

export interface CambioValor {
  inicial: number | null;
  final: number | null;
  cambio: number | null; // Asegúrate de que sea number, no string
}

export interface CambioPeso {
  pesoInicial: number | null;
  pesoFinal: number | null;
  cambioTotal: number | null; // Asegúrate de que sea number, no string
}

export interface CalculoIMC {
  imcInicial: number | null; // Asegúrate de que sea number, no string
  imcFinal: number | null;   // Asegúrate de que sea number, no string
  clasificacionInicial: string | null;
  clasificacionFinal: string | null;
}

export interface RelacionCinturaCadera {
  inicial: number | null;     // Asegúrate de que sea number, no string
  final: number | null;       // Asegúrate de que sea number, no string
  riesgoInicial: string | null;
  riesgoFinal: string | null;
}

export interface AnalisisProgresoMensual {
  cambioPeso: CambioPeso;
  cambioCircunferencias: {
    cintura: CambioValor;
    cadera: CambioValor;
    pecho: CambioValor;
    muslo: CambioValor;
    pantorrilla: CambioValor;
    brazoRelajado: CambioValor;
    brazoFlexionado: CambioValor;
  };
  cambioGrasaCorporal: {
    porcentajeInicial: number | null;
    porcentajeFinal: number | null;
    cambioTotal: number | null; // Asegúrate de que sea number, no string
  };
  calculoIMC: CalculoIMC;
  relacionCinturaCadera: RelacionCinturaCadera;
}

export interface ResumenEjecutivo {
  progresoGeneral: string;
  logrosMejoras: string;
  mensajeAliento: string;
}

// Esta es la interfaz del objeto de reporte real que está dentro de `data`
export interface ReporteData {
  _id?: string;
  userId: string;
  fechaCreacion: string;
  mesReportado: number;
  anioReportado: number;
  tituloReporte: string;
  nombreUsuario: string;
  generoUsuario?: string; // Puede ser opcional si no siempre está
  fechaReporte: string;
  objetivoUsuario: string;
  resumenEjecutivo: ResumenEjecutivo;
  datosMedidasSemanales: DatosMedidasSemanales[];
  analisisProgresoMensual: AnalisisProgresoMensual;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Esta es la interfaz para la respuesta COMPLETA de tu API (ej. de getReporte)
export interface ApiResponse<T> { // <--- Nueva interfaz genérica para la respuesta de la API
  message: string;
  data?: T; // `data` puede ser opcional si el mensaje no siempre incluye datos (ej. createReporte)
  error?: string; // Para mensajes de error
  details?: any; // Para detalles adicionales en errores
  reporteExistente?: boolean; // Para el caso especial de eligibility
}

// Entonces, en tu generateReportHTML, el tipo `data` debería ser `ReporteData` directamente.
// Y en tu servicio de frontend, `getReporte` y `createReporte` devolverán `ApiResponse<ReporteData>` o `ApiResponse<any>`.
// Pero en el frontend, cuando asignes `reporteData`, lo asignarás a `response.data`.