
import { ReporteDatosCompletos } from "../types/reporteHTML";
import { formatDate } from "./dateUtils";
import { loadImageAsBase64 } from "../utils/imageUtils";
import { saveChartImageLocally } from "./chartImageSave";

const logoModule = require('../../assets/logo.png');


export const generateReportHTML = async (data: ReporteDatosCompletos) => {
    const formattedReportDate = formatDate(data.data.fechaReporte);
    const logoSrc = await loadImageAsBase64(logoModule, 'image/png');

    
    // -------------- Seccion de generado de graficas
    const labels: string[] = ['Inicial', 'Final'];
    const pesos: number[] = [
        data.data.analisisProgresoMensual.cambioPeso.pesoInicial,
        data.data.analisisProgresoMensual.cambioPeso.pesoFinal,
    ];

    let pesoChartLocalUri: string | null = null;
    if (pesos.length > 0) {
        pesoChartLocalUri = await saveChartImageLocally(
            labels,
            [
                {
                    label: 'Peso (kg)',
                    data: pesos,
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
            ],
            'Cambio de Peso',
            'peso-cambio-chart'
        );
    }


    // --- Gráfica de Cambio de Grasa Corporal (Inicial vs Final del mes) ---
    const labelsGrasaCambio: string[] = ['Inicial', 'Final'];
    const dataGrasaCambio: number[] = [
        data.data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeInicial,
        data.data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeFinal,
    ];
    let grasaCambioChartLocalUri: string | null = null;
    if (dataGrasaCambio.length === 2) {
        grasaCambioChartLocalUri = await saveChartImageLocally(
            labelsGrasaCambio,
            [
                {
                    label: 'Grasa Corporal (%)',
                    data: dataGrasaCambio,
                    borderColor: '#facc15', // Amarillo
                    backgroundColor: 'rgba(250, 204, 21, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
            ],
            'Cambio de Grasa Corporal Mensual',
            'grasa-cambio-chart'
        );
    }

    // --- Gráfica de Cambio de Cintura (Inicial vs Final del mes) ---
    const labelsCinturaCambio: string[] = ['Inicial', 'Final'];
    const dataCinturaCambio: number[] = [
        data.data.analisisProgresoMensual.cambioCircunferencias.cintura.inicial,
        data.data.analisisProgresoMensual.cambioCircunferencias.cintura.final,
    ];
    let cinturaCambioChartLocalUri: string | null = null;
    if (dataCinturaCambio.length === 2) {
        cinturaCambioChartLocalUri = await saveChartImageLocally(
            labelsCinturaCambio,
            [
                {
                    label: 'Cintura (cm)',
                    data: dataCinturaCambio,
                    borderColor: '#3b82f6', // Azul
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
            ],
            'Cambio de Cintura Mensual',
            'cintura-cambio-chart'
        );
    }

   
    const imagepeso = await loadImageAsBase64(pesoChartLocalUri, 'image/png');
    const imagegrasa = await loadImageAsBase64(grasaCambioChartLocalUri, 'image/png');
    const imagecintura = await loadImageAsBase64(cinturaCambioChartLocalUri, 'image/png')




    const html = `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #111827;
      color: #f9fafb;
      padding: 40px;
      line-height: 1.6;
    }

    h1, h2, h3 {
      color: #22c55e;
    }

    .section {
      margin-bottom: 30px;
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
    }

    .footer {
      font-size: 12px;
      text-align: center;
      color: #9ca3af;
      margin-top: 60px;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .data-table th, .data-table td {
      border: 1px solid #374151;
      padding: 12px;
      text-align: left;
    }

    .data-table th {
      background-color: #1f2937;
    }

    .chart-image {
      width: 100%;
      margin: 20px 0;
      border-radius: 12px;
    }

    .chart-placeholder {
      background-color: #1f2937;
      padding: 20px;
      margin: 20px 0;
      border-radius: 12px;
      text-align: center;
      color: #9ca3af;
    }

    .card {
      background-color: #0f172a;
      padding: 20px;
      border-radius: 12px;
      margin-top: 20px;
    }

    hr {
      border: 0;
      border-top: 1px solid #374151;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${data.data.tituloReporte}</h1>
    <p><strong>Usuario:</strong> ${data.data.nombreUsuario}</p>
    <p><strong>Fecha del Reporte:</strong> ${data.data.fechaReporte}</p>
  </div>

  <div class="section">
    <h2>Resumen Ejecutivo</h2>
    <p><strong>Progreso General:</strong> ${data.data.resumenEjecutivo.progresoGeneral}</p>
    <p><strong>Logros y Mejoras:</strong> ${data.data.resumenEjecutivo.logrosMejoras}</p>
    <p><strong>Mensaje de Aliento:</strong> ${data.data.resumenEjecutivo.mensajeAliento}</p>
  </div>

  <div class="section">
    <h2>Medidas Corporales Semanales</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Semana</th>
          <th>Peso (kg)</th>
          <th>% Grasa</th>
          <th>Cintura (cm)</th>
        </tr>
      </thead>
      <tbody>
        ${data.data}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Análisis de Progreso</h2>

    <h3>Índice de Masa Corporal (IMC)</h3>
    

    <h3>Cambio de Peso</h3>
    

    <h3>Cambio de Grasa Corporal</h3>
    

    <h3>Cambio de Circunferencias</h3>
    

    <h3>Relación Cintura-Cadera</h3>
    
  </div>

  <div class="section">
    <h2>Gráficas de Progreso</h2>

    <h3>Cambio de Peso</h3>
    ${imagepeso ? `<img src="${imagepeso}" alt="Gráfica de Peso" class="chart-image" />` : ''}

    <h3>Cambio de Grasa Corporal</h3>
    ${imagegrasa ? `<img src="${imagegrasa}" alt="Gráfica de Grasa Corporal" class="chart-image" />` : ''}

    <h3>Cambio de Cintura</h3>
    ${imagecintura ? `<img src="${imagecintura}" alt="Gráfica de Cintura" class="chart-image" />` : ''}
  </div>

  <div class="section">
    <h2>Gráficas Pendientes</h2>
    <div class="chart-placeholder">Evolución de peso</div>
    <div class="chart-placeholder">Medidas corporales</div>
    <div class="chart-placeholder">Frecuencia de entrenamientos</div>
  </div>

  <div class="card">
    <h2>Observaciones</h2>
    <p>El usuario ha demostrado una disciplina ejemplar al seguir su programa de entrenamiento y alimentación. Los resultados obtenidos reflejan su esfuerzo y constancia durante el mes.</p>

    <h2>Recomendaciones Finales</h2>
    <p>El progreso real se construye día a día. Mantén tus hábitos saludables, escucha a tu cuerpo y no olvides celebrar cada pequeño logro. ¡Sigue así!</p>
  </div>

  <hr />
  <div class="footer">
    Este reporte ha sido generado automáticamente desde FitTrack.
  </div>
</body>
</html>

  `;

    return html;
};
