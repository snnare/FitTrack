import nunjucks from 'nunjucks';
import {exec } from 'child_process';
import path from 'path';
import fs from 'fs';


nunjucks.configure('templates', { autoescape: false });

function renderTemplate(nombrePlantilla, datos) {
  return nunjucks.render(nombrePlantilla, datos);
}

function compilarLaTeX(texContent, nombreBase) {
  const texPath = path.join(__dirname, '../../reports', `${nombreBase}.tex`);
  const pdfPath = path.join(__dirname, '../../reports', `${nombreBase}.pdf`);

  fs.writeFileSync(texPath, texContent);

  return new Promise((resolve, reject) => {
    exec(`pdflatex -output-directory=./reports ${texPath}`, (err) => {
      if (err) return reject(err);
      fs.unlinkSync(texPath);
      resolve(pdfPath);
    });
  });
}


const generarDatosReporte = (datos) => {
  // Prepara los datos para Nunjucks, adaptándolos a los marcadores de posición de la plantilla.
  const datosReporte = {
    NOMBRE_USUARIO: datos.nombreUsuario,
    CORREO_USUARIO: datos.correoUsuario,
    TOTAL_EJERCICIOS: datos.totalEjercicios,
    TOTAL_SERIES: datos.totalSeries,
    OBJETIVO_USUARIO: datos.objetivoUsuario,
    PORCENTAJE_PROGRESO: datos.porcentajeProgreso,
  };
  return datosReporte;
};


module.exports = { renderTemplate, compilarLaTeX , generarDatosReporte };