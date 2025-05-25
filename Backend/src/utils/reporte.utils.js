import Log from "../models/logs.model.js";
import Reporte from "../models/reporte.model.js";
import Metrica from "../models/metrica.model.js";



const getMonthDateRange = (anio, mes) => {
  const startOfMonth = new Date(parseInt(anio), parseInt(mes) - 1, 1);
  const endOfMonth = new Date(parseInt(anio), parseInt(mes), 0);

  return { startOfMonth, endOfMonth };
};



export const fetchMonthlyLogs = async (userId, mes, anio) => {
  const { startOfMonth, endOfMonth } = getMonthDateRange(anio, mes);
  return await Log.find({
    userId: userId,
    createdAt: { $gte: startOfMonth, $lte: endOfMonth }
  }).sort({ createdAt: 1 });
};

export const mapWeeklyMetricsData = (medidasMensuales) => {
  return medidasMensuales.map(medida => ({
    fechaMedicion: medida.fecha,
    peso: medida.peso,
    altura: medida.altura,
    cintura: medida.cintura,
    cadera: medida.cadera,
    pecho: medida.pecho,
    muslo: medida.muslo,
    pantorrilla: medida.pantorrilla,
    brazoRelajado: medida.brazoRelajado,
    brazoFlexionado: medida.brazoFlexionado,
    porcentajeGrasaCorporal: medida.porcentajeGrasaCorporal
  }));
};

export const fetchMonthlyMetrics = async (userId, mes, anio) => {
  const { startOfMonth, endOfMonth } = getMonthDateRange(anio, mes);
  console.log("metrica", startOfMonth, endOfMonth);
  return await Metrica.find({
    userId,
    fecha: { $gte: startOfMonth, $lte: endOfMonth }
  }).sort({ fecha: 1 });
};

export const checkExistingReport = async (userId, mes, anio) => {
  const reporteExistente = await Reporte.findOne({ userId, mesReportado: mes, anioReportado: anio });
  return !!reporteExistente;
}


export const verifyMetricRequirements = async (userId, mes, anio, requiredMetrics = 4) => {
  const startOfMonth = new Date(anio, mes - 1, 1);
  const endOfMonth = new Date(anio, mes, 0, 23, 59, 59, 999);

  const countMetrics = await Metrica.countDocuments({
    userId: userId,
    fecha: { $gte: startOfMonth, $lte: endOfMonth }
  });

  return countMetrics >= requiredMetrics;
};

export const verifyLogRequirements = async (userId, mes, anio, requiredLogs = 15) => {
  const startOfMonth = new Date(anio, mes - 1, 1);
  const endOfMonth = new Date(anio, mes, 0, 23, 59, 59, 999);

  const countLogs = await Log.countDocuments({
    userId: userId
  });

  console.log(countLogs);
  return countLogs >= requiredLogs;
};


export const isMonthEnded = (mes, anio) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();


  if (anio > currentYear || (anio === currentYear && mes >= currentMonth)) {
    return false;
  }
  return true;
};

export const verifyReportCreationEligibility = async (userId, mes, anio) => {
  const reportExists = await checkExistingReport(userId, mes, anio);
  if (reportExists) {
    return { success: false, message: 'Ya existe un reporte para este mes y año.', reporteExistente: true };
  }
  /*
  const monthEnded = isMonthEnded(mes, anio);
  if (!monthEnded) {
    return { success: false, message: 'El reporte solo puede generarse una vez finalizado el mes.', isMonthEnded: false };
  }
  */

  const metricsMet = await verifyMetricRequirements(userId, mes, anio);
  if (!metricsMet) {
    return { success: false, message: 'Se requieren al menos 4 registros de métricas para este mes.', metricsMet: false };
  }

  const logsMet = await verifyLogRequirements(userId, mes, anio);
  if (!logsMet) {
    return { success: false, message: 'Se requieren al menos 15 registros de entrenamientos para este mes.', logsMet: false };
  }

  return { success: true, message: 'Requisitos cumplidos para generar el reporte.', metricsMet: true, logsMet: true, isMonthEnded: true };
};


export const calculateMonthlyProgressAnalysis = (medidasMensuales, userInfo) => {
  // Si no hay medidas, devolvemos un objeto con valores nulos o por defecto
  if (!medidasMensuales || medidasMensuales.length === 0) {
    return {
      cambioPeso: { pesoInicial: null, pesoFinal: null, cambioTotal: null },
      cambioCircunferencias: {
        cintura: { inicial: null, final: null, cambio: null },
        cadera: { inicial: null, final: null, cambio: null },
        pecho: { inicial: null, final: null, cambio: null },
        muslo: { inicial: null, final: null, cambio: null },
        pantorrilla: { inicial: null, final: null, cambio: null },
        brazoRelajado: { inicial: null, final: null, cambio: null },
        brazoFlexionado: { inicial: null, final: null, cambio: null }
      },
      cambioGrasaCorporal: { porcentajeInicial: null, porcentajeFinal: null, cambioTotal: null },
      calculoIMC: { imcInicial: null, imcFinal: null, clasificacionInicial: null, clasificacionFinal: null },
      relacionCinturaCadera: { inicial: null, final: null, riesgoInicial: null, riesgoFinal: null }
    };
  }

  const firstMeasure = medidasMensuales[0];
  const lastMeasure = medidasMensuales[medidasMensuales.length - 1];

  const pesoInicial = firstMeasure.peso;
  const pesoFinal = lastMeasure.peso;
  const cambioPesoTotal = (pesoInicial !== null && pesoFinal !== null) ? (pesoInicial - pesoFinal) : null;

  const cinturaInicial = firstMeasure.cintura;
  const cinturaFinal = lastMeasure.cintura;
  const cambioCintura = (cinturaInicial !== null && cinturaFinal !== null) ? (cinturaFinal - cinturaInicial) : null;

  const caderaInicial = firstMeasure.cadera;
  const caderaFinal = lastMeasure.cadera;
  const cambioCadera = (caderaInicial !== null && caderaFinal !== null) ? (caderaFinal - caderaInicial) : null;

  const pechoInicial = firstMeasure.pecho;
  const pechoFinal = lastMeasure.pecho;
  const cambioPecho = (pechoInicial !== null && pechoFinal !== null) ? (pechoFinal - pechoInicial) : null;

  const musloInicial = firstMeasure.muslo;
  const musloFinal = lastMeasure.muslo;
  const cambioMuslo = (musloInicial !== null && musloFinal !== null) ? (musloFinal - musloInicial) : null;

  const pantorrillaInicial = firstMeasure.pantorrilla;
  const pantorrillaFinal = lastMeasure.pantorrilla;
  const cambioPantorrilla = (pantorrillaInicial !== null && pantorrillaFinal !== null) ? (pantorrillaFinal - pantorrillaInicial) : null;

  const brazoRelajadoInicial = firstMeasure.brazoRelajado;
  const brazoRelajadoFinal = lastMeasure.brazoRelajado;
  const cambioBrazoRelajado = (brazoRelajadoInicial !== null && brazoRelajadoFinal !== null) ? (brazoRelajadoFinal - brazoRelajadoInicial) : null;

  const brazoFlexionadoInicial = firstMeasure.brazoFlexionado;
  const brazoFlexionadoFinal = lastMeasure.brazoFlexionado;
  const cambioBrazoFlexionado = (brazoFlexionadoInicial !== null && brazoFlexionadoFinal !== null) ? (brazoFlexionadoFinal - brazoFlexionadoInicial) : null;


  const grasaInicial = firstMeasure.porcentajeGrasaCorporal;
  const grasaFinal = lastMeasure.porcentajeGrasaCorporal;
  const cambioGrasaTotal = (grasaInicial !== null && grasaFinal !== null) ? (grasaFinal - grasaInicial) : null;

  const estatura = userInfo.estatura; // Asegúrate de que userInfo.estatura esté en metros
  const imcInicial = (pesoInicial !== null && estatura) ? (pesoInicial / (estatura * estatura)) : null;
  const imcFinal = (pesoFinal !== null && estatura) ? (pesoFinal / (estatura * estatura)) : null;

  const clasificacionIMC = (imc) => {
    if (imc === null) return null;
    if (imc < 18.5) return "Bajo peso";
    if (imc >= 18.5 && imc <= 24.9) return "Normal";
    if (imc >= 25 && imc <= 29.9) return "Sobrepeso";
    return "Obesidad";
  };
  const clasificacionInicialIMC = clasificacionIMC(imcInicial);
  const clasificacionFinalIMC = clasificacionIMC(imcFinal);

  const relacionInicialCinturaCadera = (cinturaInicial !== null && firstMeasure.cadera !== null) ? (cinturaInicial / firstMeasure.cadera) : null;
  const relacionFinalCinturaCadera = (cinturaFinal !== null && lastMeasure.cadera !== null) ? (cinturaFinal / lastMeasure.cadera) : null;

  const interpretarRiesgoCinturaCadera = (relacion, genero) => {
    if (relacion === null || !genero) return null;
    if (genero === "Masculino") {
      if (relacion < 0.9) return "Bajo";
      if (relacion >= 0.9 && relacion < 1.0) return "Moderado";
      return "Alto";
    } else if (genero === "Femenino") {
      if (relacion < 0.8) return "Bajo";
      if (relacion >= 0.8 && relacion < 0.85) return "Moderado";
      return "Alto";
    }
    return null;
  };
  const riesgoInicialCinturaCadera = interpretarRiesgoCinturaCadera(relacionInicialCinturaCadera, userInfo.genero);
  const riesgoFinalCinturaCadera = interpretarRiesgoCinturaCadera(relacionFinalCinturaCadera, userInfo.genero);

  // Formatear todos los números a dos decimales, si no son null
  const formatNumber = (num) => num !== null ? parseFloat(num.toFixed(2)) : null;

  return {
    cambioPeso: {
      pesoInicial: formatNumber(pesoInicial),
      pesoFinal: formatNumber(pesoFinal),
      cambioTotal: formatNumber(cambioPesoTotal)
    },
    cambioCircunferencias: {
      cintura: { inicial: formatNumber(cinturaInicial), final: formatNumber(cinturaFinal), cambio: formatNumber(cambioCintura) },
      cadera: { inicial: formatNumber(caderaInicial), final: formatNumber(caderaFinal), cambio: formatNumber(cambioCadera) },
      pecho: { inicial: formatNumber(pechoInicial), final: formatNumber(pechoFinal), cambio: formatNumber(cambioPecho) },
      muslo: { inicial: formatNumber(musloInicial), final: formatNumber(musloFinal), cambio: formatNumber(cambioMuslo) },
      pantorrilla: { inicial: formatNumber(pantorrillaInicial), final: formatNumber(pantorrillaFinal), cambio: formatNumber(cambioPantorrilla) },
      brazoRelajado: { inicial: formatNumber(brazoRelajadoInicial), final: formatNumber(brazoRelajadoFinal), cambio: formatNumber(cambioBrazoRelajado) },
      brazoFlexionado: { inicial: formatNumber(brazoFlexionadoInicial), final: formatNumber(brazoFlexionadoFinal), cambio: formatNumber(cambioBrazoFlexionado) }
    },
    cambioGrasaCorporal: {
      porcentajeInicial: formatNumber(grasaInicial),
      porcentajeFinal: formatNumber(grasaFinal),
      cambioTotal: formatNumber(cambioGrasaTotal)
    },
    calculoIMC: {
      imcInicial: formatNumber(imcInicial),
      imcFinal: formatNumber(imcFinal),
      clasificacionInicial: clasificacionInicialIMC,
      clasificacionFinal: clasificacionFinalIMC
    },
    relacionCinturaCadera: {
      inicial: formatNumber(relacionInicialCinturaCadera),
      final: formatNumber(relacionFinalCinturaCadera),
      riesgoInicial: riesgoInicialCinturaCadera,
      riesgoFinal: riesgoFinalCinturaCadera
    }
  };
};


export const generateExecutiveSummary = (objetivoUsuario, analisisProgresoMensual, totalLogsEsteMes, userGender) => {
  let progresoGeneral = "No se pudo determinar el progreso general debido a datos insuficientes o un objetivo no especificado.";
  let logrosMejoras = "Se necesita más información para destacar logros y mejoras.";
  let mensajeAliento = "¡Sigue trabajando duro para alcanzar tus metas!";

  const { cambioPeso, cambioGrasaCorporal, cambioCircunferencias } = analisisProgresoMensual;

  // Convertir a números flotantes para comparaciones
  const cambioPesoNum = parseFloat(cambioPeso.cambioTotal);
  const cambioGrasaNum = parseFloat(cambioGrasaCorporal.cambioTotal);
  const cambioCinturaNum = parseFloat(cambioCircunferencias.cintura.cambio);

  // --- Progreso General ---
  if (objetivoUsuario) {
    switch (objetivoUsuario.toLowerCase()) {
      case "perder peso":
        if (cambioPesoNum > 0 && cambioGrasaNum < 0) {
          progresoGeneral = `¡Excelente progreso! Has logrado una pérdida de peso de ${cambioPeso.cambioTotal} kg y una reducción en el porcentaje de grasa corporal de ${Math.abs(cambioGrasaNum)}%.`;
        } else if (cambioPesoNum > 0) {
          progresoGeneral = `Has logrado una pérdida de peso de ${cambioPeso.cambioTotal} kg este mes. Continúa enfocándote en la grasa corporal.`;
        } else if (cambioPesoNum < 0) {
          progresoGeneral = `Aunque hubo un ligero aumento de peso de ${Math.abs(cambioPesoNum)} kg, es importante revisar la composición corporal.`;
        } else {
          progresoGeneral = "El peso se mantuvo estable este mes. Analiza otros indicadores para entender el progreso.";
        }
        break;
      case "ganar masa muscular":
        if (cambioPesoNum < 0 && (cambioGrasaNum === null || cambioGrasaNum >= 0)) { // Peso sube, grasa se mantiene o sube un poco
          progresoGeneral = `¡Buen trabajo! Has ganado ${Math.abs(cambioPesoNum)} kg de peso total este mes. Continúa monitoreando la composición corporal.`;
        } else if (cambioPesoNum < 0 && cambioGrasaNum < 0) {
          progresoGeneral = `Has ganado ${Math.abs(cambioPesoNum)} kg de peso, pero también has reducido grasa corporal. ¡Excelente recomposición corporal!`;
        } else {
          progresoGeneral = "El progreso en ganancia muscular requiere más análisis de la fuerza y las circunferencias, más allá del peso.";
        }
        break;
      case "mejorar resistencia":
        progresoGeneral = `Tu enfoque en la resistencia es admirable. Este mes registraste ${totalLogsEsteMes} entrenamientos, un buen indicador de tu constancia.`;
        break;
      default:
        progresoGeneral = "El progreso general se evalúa considerando tus métricas clave. Hemos notado ";
        if (cambioPesoNum > 0) progresoGeneral += `una reducción de peso de ${cambioPeso.cambioTotal} kg. `;
        else if (cambioPesoNum < 0) progresoGeneral += `un aumento de peso de ${Math.abs(cambioPesoNum)} kg. `;
        if (cambioGrasaNum < 0) progresoGeneral += `una disminución de grasa corporal de ${Math.abs(cambioGrasaNum)}%. `;
        else if (cambioGrasaNum > 0) progresoGeneral += `un aumento de grasa corporal de ${cambioGrasaNum}%. `;
        if (progresoGeneral === "El progreso general se evalúa considerando tus métricas clave. Hemos notado ") {
          progresoGeneral += "cambios menores en tus métricas principales este mes.";
        }
        break;
    }
  } else {
    progresoGeneral = "No se ha establecido un objetivo específico. Hemos observado ";
    if (cambioPesoNum > 0) progresoGeneral += `una reducción de peso de ${cambioPeso.cambioTotal} kg. `;
    else if (cambioPesoNum < 0) progresoGeneral += `un aumento de peso de ${Math.abs(cambioPesoNum)} kg. `;
    if (cambioGrasaNum < 0) progresoGeneral += `una disminución de grasa corporal de ${Math.abs(cambioGrasaNum)}%. `;
    else if (cambioGrasaNum > 0) progresoGeneral += `un aumento de grasa corporal de ${cambioGrasaNum}%. `;
    if (progresoGeneral === "No se ha establecido un objetivo específico. Hemos observado ") {
      progresoGeneral += "cambios menores en tus métricas principales este mes.";
    }
  }

  // --- Logros y Mejoras ---
  if (totalLogsEsteMes >= 20) {
    logrosMejoras += ` ¡Felicidades por tu consistencia! Registraste ${totalLogsEsteMes} entrenamientos este mes.`;
  } else if (totalLogsEsteMes >= 15) {
    logrosMejoras += ` Tu dedicación se refleja en tus ${totalLogsEsteMes} entrenamientos registrados. ¡Sigue así!`;
  }

  if (cambioPesoNum > 0.5) { // Más de 0.5kg de pérdida
    logrosMejoras += ` Destaca una notable pérdida de peso de ${cambioPeso.cambioTotal} kg.`;
  } else if (cambioPesoNum < -0.5) { // Más de 0.5kg de ganancia (muscular si grasa es estable/baja)
    if (cambioGrasaNum === null || cambioGrasaNum <= 0.5) { // Asumimos que es ganancia muscular si grasa no sube mucho
      logrosMejoras += ` Notable ganancia de ${Math.abs(cambioPesoNum)} kg, lo que podría indicar un aumento de masa muscular.`;
    }
  }

  if (cambioGrasaNum < -1) { // Más de 1% de pérdida de grasa
    logrosMejoras += ` Tu reducción de ${Math.abs(cambioGrasaNum)}% en grasa corporal es un gran logro.`;
  }

  if (logrosMejoras === "Se necesita más información para destacar logros y mejoras.") {
    logrosMejoras = "Este mes mostró un progreso constante. Continúa con tus hábitos para lograr más avances.";
  }


  // --- Mensaje de Aliento ---
  const userName = userGender === 'Masculino' ? 'campeón' : 'campeona';
  if (progresoGeneral.includes("¡Excelente progreso!") || progresoGeneral.includes("¡Buen trabajo!")) {
    mensajeAliento = `¡Increíble mes, ${userName}! Tu compromiso está dando frutos. ¡Mantén el excelente ritmo y sigue superándote!`;
  } else if (totalLogsEsteMes > 15) {
    mensajeAliento = `Tu constancia es clave, ${userName}. Sigue entrenando y registrando tu progreso, ¡los resultados llegarán!`;
  } else {
    mensajeAliento = `Cada paso cuenta, ${userName}. Reflexiona sobre este mes y ajusta tu plan para el próximo. ¡Eres capaz de lograrlo!`;
  }


  return {
    progresoGeneral,
    logrosMejoras,
    mensajeAliento
  };
};

export const findReportForUser = async (userId, mes = null, anio = null) => {
  if (mes !== null && anio !== null) {
    return await Reporte.findOne({ userId, mesReportado: mes, anioReportado: anio });
  } else {
    return await Reporte.findOne({ userId }).sort({ fechaCreacion: -1 });
  }
};
