import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import { getInfoPersonal, getHistorialMedidas, getHistorialEntrenamientos, getRachaActual, calcularEdad } from '../reporte.utils.js'; 

const templatePath = path.resolve('./templates/reporte.tex');
const outputPath = path.resolve('../../public/reports');


const generarReportePDF = async (correo) => {
  const info = await getInfoPersonal(correo);
  const medidas = await getHistorialMedidas(correo);
  const logs = await getHistorialEntrenamientos(correo);
  const racha = await getRachaActual(correo);
  const edad = calcularEdad(info.fechaNacimiento);

  const texTemplate = fs.readFileSync(templatePath, 'utf8');

  const tablaMedidas = medidas.map(m => {
    const fecha = new Date(m.fecha).toLocaleDateString();
    return `${fecha} & ${m.peso || '-'} & ${m.cintura || '-'} & ${m.cadera || '-'} \\\\`;
  }).join('\n');

  const tablaEntrenamientos = logs.map(log => {
    const fecha = new Date(log.fecha).toLocaleDateString();
    return log.ejercicios.map(ej => (
      `${fecha} & ${ej.nombre} & ${ej.repeticiones || '-'} \\\\`
    )).join('\n');
  }).join('\n');

  const texFilled = texTemplate
    .replace('{{nombre}}', info.nombreCompleto)
    .replace('{{correo}}', info.correo)
    .replace('{{edad}}', edad)
    .replace('{{genero}}', info.genero)
    .replace('{{peso}}', info.peso)
    .replace('{{estatura}}', info.estatura)
    .replace('{{objetivo}}', info.objetivo)
    .replace('{{nivel}}', info.nivel)
    .replace('{{rachaActual}}', racha?.rachaActual || 0)
    .replace('{{ultimaFecha}}', racha?.ultimaFecha ? new Date(racha.ultimaFecha).toLocaleDateString() : '-')
    .replace('{{tablaMedidas}}', tablaMedidas)
    .replace('{{tablaEntrenamientos}}', tablaEntrenamientos);

  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

  const nombreBase = correo.replace(/[@.]/g, '_');
  const texOutputFile = path.join(outputPath, `${nombreBase}.tex`);
  const pdfOutputFile = path.join(outputPath, `${nombreBase}.pdf`);

  fs.writeFileSync(texOutputFile, texFilled);

  return new Promise((resolve, reject) => {
    exec(`pdflatex -interaction=nonstopmode -output-directory=${outputPath} ${texOutputFile}`, (error) => {
      if (error) return reject(error);
      resolve(pdfOutputFile);
    });
  });
};

export default generarReportePDF;
