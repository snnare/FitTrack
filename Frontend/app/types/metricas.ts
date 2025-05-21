// types/metricas.ts

export interface MetricaData {
    peso: number;
    altura: number;
    cintura: number;
    cadera: number;
    pecho: number;
    muslo: number;
    pantorrilla: number;
    brazoRelajado: number;
    brazoFlexionado: number;
    porcentajeGrasaCorporal?: number | null;
    notas?: string;
    fecha: string; 
}

export interface Metrica extends MetricaData {
    _id: string;
    userId: string;
}


