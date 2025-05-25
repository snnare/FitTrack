import { ReporteData } from "../types/reporteHTML";
import { formatDate } from "./dateUtils";
import { loadImageAsBase64 } from "./imageUtils";
import { saveChartImageLocally, getChartImageLocalUri, ensureChartDirectoryExists } from "./chartImageSave";
import * as FileSystem from 'expo-file-system';

const logoModule = require('../../assets/logo.png');

const formatValue = (value: number | null | undefined, unit: string = '') => {
    return value !== null && value !== undefined ? `${value.toFixed(2)}${unit}` : 'N/A';
};

export const generateReportHTML = async (data: ReporteData) => {
    const formattedReportDate = formatDate(data.fechaReporte);
    const logoSrc = await loadImageAsBase64(logoModule, 'image/png');

    await ensureChartDirectoryExists();

    let pesoChartBase64: string | null = null;
    const pesoChartFileName = `reporte_${data.mesReportado}_${data.anioReportado}_peso.png`;
    const pesoChartLocalFullPath = getChartImageLocalUri(pesoChartFileName);

    try {
        const pesoChartInfo = await FileSystem.getInfoAsync(pesoChartLocalFullPath);

        if (pesoChartInfo.exists) {
            pesoChartBase64 = await loadImageAsBase64(pesoChartLocalFullPath, 'image/png');
        } else {
            const labels: string[] = ['Inicial', 'Final'];
            const pesos: number[] = [
                data.analisisProgresoMensual.cambioPeso.pesoInicial || 0,
                data.analisisProgresoMensual.cambioPeso.pesoFinal || 0,
            ];
            if (data.analisisProgresoMensual.cambioPeso.pesoInicial !== null &&
                data.analisisProgresoMensual.cambioPeso.pesoFinal !== null) {
                const generatedUri = await saveChartImageLocally(
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
                    pesoChartFileName
                );
                if (generatedUri) {
                    pesoChartBase64 = await loadImageAsBase64(generatedUri, 'image/png');
                }
            }
        }
    } catch (error) {
        pesoChartBase64 = null;
    }

    let grasaCambioChartBase64: string | null = null;
    const grasaChartFileName = `reporte_${data.mesReportado}_${data.anioReportado}_grasa.png`;
    const grasaChartLocalFullPath = getChartImageLocalUri(grasaChartFileName);

    try {
        const grasaChartInfo = await FileSystem.getInfoAsync(grasaChartLocalFullPath);

        if (grasaChartInfo.exists) {
            grasaCambioChartBase64 = await loadImageAsBase64(grasaChartLocalFullPath, 'image/png');
        } else {
            const labelsGrasaCambio: string[] = ['Inicial', 'Final'];
            const dataGrasaCambio: number[] = [
                data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeInicial || 0,
                data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeFinal || 0,
            ];
            if (data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeInicial !== null &&
                data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeFinal !== null) {
                const generatedUri = await saveChartImageLocally(
                    labelsGrasaCambio,
                    [
                        {
                            label: 'Grasa Corporal (%)',
                            data: dataGrasaCambio,
                            borderColor: '#facc15',
                            backgroundColor: 'rgba(250, 204, 21, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                    'Cambio de Grasa Corporal Mensual',
                    grasaChartFileName
                );
                if (generatedUri) {
                    grasaCambioChartBase64 = await loadImageAsBase64(generatedUri, 'image/png');
                }
            }
        }
    } catch (error) {
        grasaCambioChartBase64 = null;
    }

    let cinturaCambioChartBase64: string | null = null;
    const cinturaChartFileName = `reporte_${data.mesReportado}_${data.anioReportado}_cintura.png`;
    const cinturaChartLocalFullPath = getChartImageLocalUri(cinturaChartFileName);

    try {
        const cinturaChartInfo = await FileSystem.getInfoAsync(cinturaChartLocalFullPath);

        if (cinturaChartInfo.exists) {
            cinturaCambioChartBase64 = await loadImageAsBase64(cinturaChartLocalFullPath, 'image/png');
        } else {
            const labelsCinturaCambio: string[] = ['Inicial', 'Final'];
            const dataCinturaCambio: number[] = [
                data.analisisProgresoMensual.cambioCircunferencias.cintura.inicial || 0,
                data.analisisProgresoMensual.cambioCircunferencias.cintura.final || 0,
            ];
            if (data.analisisProgresoMensual.cambioCircunferencias.cintura.inicial !== null &&
                data.analisisProgresoMensual.cambioCircunferencias.cintura.final !== null) {
                const generatedUri = await saveChartImageLocally(
                    labelsCinturaCambio,
                    [
                        {
                            label: 'Cintura (cm)',
                            data: dataCinturaCambio,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                    'Cambio de Cintura Mensual',
                    cinturaChartFileName
                );
                if (generatedUri) {
                    cinturaCambioChartBase64 = await loadImageAsBase64(generatedUri, 'image/png');
                }
            }
        }
    } catch (error) {
        cinturaCambioChartBase64 = null;
    }

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
    ${logoSrc ? `<img src="${logoSrc}" alt="Logo FitTrack" style="width: 100px; height: 100px; display: block; margin: 0 auto 20px;" />` : '<div class="chart-placeholder" style="width: 100px; height: 100px; margin: 0 auto 20px; line-height: 100px;">Logo no disponible</div>'}
    <h1>${data.tituloReporte}</h1>
    <p><strong>Usuario:</strong> ${data.nombreUsuario}</p>
    <p><strong>Fecha del Reporte:</strong> ${data.fechaReporte}</p>
  </div>

  <div class="section">
    <h2>Resumen Ejecutivo</h2>
    <p><strong>Progreso General:</strong> ${data.resumenEjecutivo.progresoGeneral}</p>
    <p><strong>Logros y Mejoras:</strong> ${data.resumenEjecutivo.logrosMejoras}</p>
    <p><strong>Mensaje de Aliento:</strong> ${data.resumenEjecutivo.mensajeAliento}</p>
  </div>

  <div class="section">
    <h2>Medidas Corporales Semanales</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>Peso (kg)</th>
          <th>% Grasa</th>
          <th>Cintura (cm)</th>
          <th>Cadera (cm)</th>
          <th>Pecho (cm)</th>
          <th>Muslo (cm)</th>
          <th>Pantorrilla (cm)</th>
          <th>Brazo Relajado (cm)</th>
          <th>Brazo Flexionado (cm)</th>
        </tr>
      </thead>
      <tbody>
        ${data.datosMedidasSemanales.map((medida: any) => `
          <tr>
            <td>${formatValue(medida.peso, 'kg')}</td>
            <td>${formatValue(medida.porcentajeGrasaCorporal, '%')}</td>
            <td>${formatValue(medida.cintura, 'cm')}</td>
            <td>${formatValue(medida.cadera, 'cm')}</td>
            <td>${formatValue(medida.pecho, 'cm')}</td>
            <td>${formatValue(medida.muslo, 'cm')}</td>
            <td>${formatValue(medida.pantorrilla, 'cm')}</td>
            <td>${formatValue(medida.brazoRelajado, 'cm')}</td>
            <td>${formatValue(medida.brazoFlexionado, 'cm')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Análisis de Progreso</h2>

    <h3>Índice de Masa Corporal (IMC)</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>IMC Inicial</th>
          <th>Clasificación Inicial</th>
          <th>IMC Final</th>
          <th>Clasificación Final</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>${formatValue(data.analisisProgresoMensual.calculoIMC.imcInicial)}</td>
          <td>${data.analisisProgresoMensual.calculoIMC.clasificacionInicial || 'N/A'}</td>
          <td>${formatValue(data.analisisProgresoMensual.calculoIMC.imcFinal)}</td>
          <td>${data.analisisProgresoMensual.calculoIMC.clasificacionFinal || 'N/A'}</td>
        </tr>
      </tbody>
    </table>

    <h3>Cambio de Peso</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Peso Inicial (kg)</th>
          <th>Peso Final (kg)</th>
          <th>Cambio Total (kg)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${formatValue(data.analisisProgresoMensual.cambioPeso.pesoInicial, 'kg')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioPeso.pesoFinal, 'kg')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioPeso.cambioTotal, 'kg')}</td>
        </tr>
      </tbody>
    </table>

    <h3>Cambio de Grasa Corporal</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>% Grasa Inicial</th>
          <th>% Grasa Final</th>
          <th>Cambio Total (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${formatValue(data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeInicial, '%')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeFinal, '%')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioGrasaCorporal.cambioTotal, '%')}</td>
        </tr>
      </tbody>
    </table>

    <h3>Cambio de Circunferencias</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Medida</th>
          <th>Inicial (cm)</th>
          <th>Final (cm)</th>
          <th>Cambio (cm)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cintura</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.cintura.inicial, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.cintura.final, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.cintura.cambio, 'cm')}</td>
        </tr>
        <tr>
          <td>Cadera</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.cadera.inicial, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.cadera.final, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.cadera.cambio, 'cm')}</td>
        </tr>
        <tr>
          <td>Pecho</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.pecho.inicial, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.pecho.final, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.pecho.cambio, 'cm')}</td>
        </tr>
        <tr>
          <td>Muslo</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.muslo.inicial, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.muslo.final, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.muslo.cambio, 'cm')}</td>
        </tr>
        <tr>
          <td>Pantorrilla</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.pantorrilla.inicial, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.pantorrilla.final, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.pantorrilla.cambio, 'cm')}</td>
        </tr>
        <tr>
          <td>Brazo Relajado</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.brazoRelajado.inicial, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.brazoRelajado.final, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.brazoRelajado.cambio, 'cm')}</td>
        </tr>
        <tr>
          <td>Brazo Flexionado</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.brazoFlexionado.inicial, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.brazoFlexionado.final, 'cm')}</td>
          <td>${formatValue(data.analisisProgresoMensual.cambioCircunferencias.brazoFlexionado.cambio, 'cm')}</td>
        </tr>
      </tbody>
    </table>

    <h3>Relación Cintura-Cadera</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Inicial</th>
          <th>Riesgo Inicial</th>
          <th>Final</th>
          <th>Riesgo Final</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>${formatValue(data.analisisProgresoMensual.relacionCinturaCadera.inicial)}</td>
          <td>${data.analisisProgresoMensual.relacionCinturaCadera.riesgoInicial || 'N/A'}</td>
          <td>${formatValue(data.analisisProgresoMensual.relacionCinturaCadera.final)}</td>
          <td>${data.analisisProgresoMensual.relacionCinturaCadera.riesgoFinal || 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Gráficas de Progreso</h2>

    ${pesoChartBase64 ? `<img src="${pesoChartBase64}" alt="Gráfica de Peso" class="chart-image" />` : '<div class="chart-placeholder">No hay datos suficientes para la gráfica de peso o hubo un error al cargarla.</div>'}
    ${grasaCambioChartBase64 ? `<img src="${grasaCambioChartBase64}" alt="Gráfica de Grasa Corporal" class="chart-image" />` : '<div class="chart-placeholder">No hay datos suficientes para la gráfica de grasa corporal o hubo un error al cargarla.</div>'}
    ${cinturaCambioChartBase64 ? `<img src="${cinturaCambioChartBase64}" alt="Gráfica de Cintura" class="chart-image" />` : '<div class="chart-placeholder">No hay datos suficientes para la gráfica de cintura o hubo un error al cargarla.</div>'}

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