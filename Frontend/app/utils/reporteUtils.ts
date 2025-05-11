// utils/reportUtils.ts
export const generateReportHTML = (data: any) => {
    const formatearFecha = (fecha: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', options);
    };

    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <title>${data.tituloReporte}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h1 { color: #2e7d32; text-align: center; }
                h2 { color: #3f51b5; margin-top: 30px; }
                h3 { margin-top: 20px; }
                p { line-height: 1.6; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f0f0f0; }
                .resumen { background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                .cambio { font-weight: bold; color: #1a5235; }
                .grafico { width: 100%; height: 300px; border: 1px solid #ddd; margin-top: 20px; }
            </style>
        </head>
        <body>
            <h1>${data.tituloReporte}</h1>
            <p><strong>Nombre del Usuario:</strong> ${data.nombreUsuario}</p>
            <p><strong>Fecha del Reporte:</strong> ${data.fechaReporte}</p>

            <h2>Resumen Ejecutivo</h2>
            <div class="resumen">
                <p><strong>Progreso General:</strong> ${data.resumenEjecutivo.progresoGeneral}</p>
                <p><strong>Logros y Mejoras:</strong> ${data.resumenEjecutivo.logrosMejoras}</p>
                <p><strong>Mensaje de Aliento:</strong> ${data.resumenEjecutivo.mensajeAliento}</p>
            </div>

            <h2>Datos de Medidas Semanales</h2>
            <table>
                <thead>
                    <tr>
                        <th>Fecha de Medición</th>
                        <th>Peso (kg)</th>
                        <th>Altura (m)</th>
                        <th>Cintura (cm)</th>
                        <th>Cadera (cm)</th>
                        <th>Pecho (cm)</th>
                        <th>Muslo (cm)</th>
                        <th>Pantorrilla (cm)</th>
                        <th>Brazo Relajado (cm)</th>
                        <th>Brazo Flexionado (cm)</th>
                        <th>% Grasa Corporal</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
    `;

    data.datosMedidasSemanales.forEach((medida: any) => {
        html += `
                    <tr>
                        <td>${formatearFecha(medida.fechaMedicion)}</td>
                        <td>${medida.peso}</td>
                        <td>${medida.altura}</td>
                        <td>${medida.cintura}</td>
                        <td>${medida.cadera}</td>
                        <td>${medida.pecho}</td>
                        <td>${medida.muslo}</td>
                        <td>${medida.pantorrilla}</td>
                        <td>${medida.brazoRelajado}</td>
                        <td>${medida.brazoFlexionado}</td>
                        <td>${medida.porcentajeGrasaCorporal}</td>
                        <td>${medida.notasUsuario}</td>
                    </tr>
        `;
    });

    html += `
                </tbody>
            </table>

            <h2>Análisis de Progreso Mensual</h2>
            <h3>Cambio en el Peso</h3>
            <p><strong>Peso Inicial:</strong> ${data.analisisProgresoMensual.cambioPeso.pesoInicial} kg</p>
            <p><strong>Peso Final:</strong> ${data.analisisProgresoMensual.cambioPeso.pesoFinal} kg</p>
            <p class="cambio"><strong>Cambio Total:</strong> ${data.analisisProgresoMensual.cambioPeso.cambioTotal} kg</p>
            <div class="grafico">Gráfico de la tendencia del peso a lo largo del mes (Aquí iría el gráfico)</div>

            <h3>Cambio en las Circunferencias</h3>
    `;

    for (const [key, value] of Object.entries(data.analisisProgresoMensual.cambioCircunferencias)) {
        if (value && typeof value === 'object' && 'inicial' in value && 'final' in value && 'cambio' in value) {
            html += `
                <h4>${key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                <p><strong>Medida Inicial:</strong> ${value.inicial} cm</p>
                <p><strong>Medida Final:</strong> ${value.final} cm</p>
                <p class="cambio"><strong>Cambio Total:</strong> ${value.cambio} cm</p>
                <div class="grafico">Gráfico de la tendencia de ${key} a lo largo del mes (Aquí iría el gráfico)</div>
            `;
        }
    }

    html += `
            <h3>Cambio en el Porcentaje de Grasa Corporal</h3>
            <p><strong>Porcentaje Inicial:</strong> ${data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeInicial}%</p>
            <p><strong>Porcentaje Final:</strong> ${data.analisisProgresoMensual.cambioGrasaCorporal.porcentajeFinal}%</p>
            <p class="cambio"><strong>Cambio Total:</strong> ${data.analisisProgresoMensual.cambioTotal}%</p>
            <div class="grafico">Gráfico de la tendencia del porcentaje de grasa corporal a lo largo del mes (Aquí iría el gráfico)</div>

            <h3>Cálculo del IMC</h3>
            <p><strong>IMC Inicial:</strong> ${data.analisisProgresoMensual.calculoIMC.imcInicial}</p>
            <p><strong>IMC Final:</strong> ${data.analisisProgresoMensual.calculoIMC.imcFinal}</p>
            <p><strong>Clasificación Inicial:</strong> ${data.analisisProgresoMensual.calculoIMC.clasificacionInicial}</p>
            <p><strong>Clasificación Final:</strong> ${data.analisisProgresoMensual.calculoIMC.clasificacionFinal}</p>

            <h3>Relación Cintura-Cadera</h3>
            <p><strong>Relación Inicial:</strong> ${data.analisisProgresoMensual.relacionCinturaCadera.inicial}</p>
            <p><strong>Relación Final:</strong> ${data.analisisProgresoMensual.relacionCinturaCadera.final}</p>
            <p><strong>Riesgo Inicial:</strong> ${data.analisisProgresoMensual.relacionCinturaCadera.riesgoInicial}</p>
            <p><strong>Riesgo Final:</strong> ${data.analisisProgresoMensual.relacionCinturaCadera.riesgoFinal}</p>

            <h2>Recomendaciones Generales</h2>
            <p><strong>Ajustes en la Rutina de Ejercicios:</strong> ${data.recomendacionesGenerales.ajustesEjercicio}</p>
            <p><strong>Consejos sobre Nutrición:</strong> ${data.recomendacionesGenerales.consejosNutricion}</p>
            <p><strong>Recordatorio sobre la Consistencia:</strong> ${data.recomendacionesGenerales.recordatorioConsistencia}</p>
            <p><strong>Motivación para Alcanzar los Objetivos:</strong> ${data.recomendacionesGenerales.motivacionObjetivos}</p>

            <h2>Información Adicional</h2>
            <p>${data.informacionAdicional}</p>
        </body>
        </html>
    `;
    return html;
};
