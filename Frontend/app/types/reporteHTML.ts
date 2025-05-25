// /types/reporteHTML.ts

export interface DatosMedidasSemanales {
  fechaMedicion: string | null;
  peso: number;
  altura: number;
  cintura: number;
  cadera: number;
  pecho: number;
  muslo: number;
  pantorrilla: number;
  brazoRelajado: number;
  brazoFlexionado: number;
  porcentajeGrasaCorporal: number;
}

export interface CambioValor {
  inicial: number;
  final: number;
  cambio: string;
}

export interface CambioPeso {
  pesoInicial: number;
  pesoFinal: number;
  cambioTotal: string;
}

export interface CalculoIMC {
  imcInicial: string;
  imcFinal: string;
  clasificacionInicial: string;
  clasificacionFinal: string;
}

export interface RelacionCinturaCadera {
  inicial: string;
  final: string;
  riesgoInicial: string;
  riesgoFinal: string;
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
    porcentajeInicial: number;
    porcentajeFinal: number;
    cambioTotal: string;
  };
  calculoIMC: CalculoIMC;
  relacionCinturaCadera: RelacionCinturaCadera;
}

export interface ResumenEjecutivo {
  progresoGeneral: string;
  logrosMejoras: string;
  mensajeAliento: string;
}

export interface ReporteData {
  tituloReporte: string;
  nombreUsuario: string;
  fechaReporte: string;
  resumenEjecutivo: ResumenEjecutivo;
  datosMedidasSemanales: DatosMedidasSemanales[];
  analisisProgresoMensual: AnalisisProgresoMensual;
}

export interface ReporteDatosCompletos {
  message: string;
  data: ReporteData;
}