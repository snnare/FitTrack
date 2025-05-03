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

module.exports = { renderTemplate, compilarLaTeX };