import axios from 'axios';
import fs from 'fs';
import path from 'path';


async function generarGraficoBarras(nombreArchivo, labels, valores, titulo = 'Repeticiones') {
    const chartConfig = {
        type: 'bar',
        data: {
            labels,
            datasets: [{ label: titulo, data: valores, backgroundColor: 'blue' }]
        }
    }
    const url = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    const filePath = path.join(__dirname, '../../reports', nombreArchivo);

    const res = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(filePath, res.data);

    return filePath;
}


async function generarGraficoPastel(nombreArchivo, labels, valores, titulo = 'Distribución') {
    const chartConfig = {
      type: 'pie',
      data: { labels, datasets: [{ data: valores }] }
    };
  
    const url = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    const filePath = path.join(__dirname, '../../reports', nombreArchivo);
  
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(filePath, res.data);
  
    return filePath;
  }
  
  module.exports = {
    generarGraficoBarras,
    generarGraficoPastel
  };