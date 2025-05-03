//const { renderTemplate, compilarLaTeX } = require('./latex');
// const { generarGraficoBarras } = require('./charts');
async function generarReportePDF(userData) {
  const nombreBase = `reporte-${userData._id}`;
  const graficoPeso = await generarGraficoBarras(`peso-${userData._id}.png`, userData.fechas, userData.pesos, 'Peso (kg)');
  const graficoReps = await generarGraficoBarras(`reps-${userData._id}.png`, userData.ejercicios, userData.reps, 'Repeticiones');

  const tex = renderTemplate('reporte_femenino.tex', {
    ...userData,
    grafico_peso: graficoPeso,
    grafico_reps: graficoReps
  });

  const pdfPath = await compilarLaTeX(tex, nombreBase);
  return pdfPath;
}

module.exports = { generarReportePDF };