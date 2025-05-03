import fs from 'fs';
import path from 'path';

function guardarArchivoTemporal(nombre, contenido) {
    const ruta = path.join(__dirname, '../../reports', nombre);
    fs.writeFileSync(ruta, contenido);
    return ruta;
  }
  
  function eliminarArchivo(ruta) {
    if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
  }
  
  module.exports = { guardarArchivoTemporal, eliminarArchivo };