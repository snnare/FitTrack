import Reporte from '../models/reporte.model.js';
import User from '../models/user.model.js';
import Log from '../models/logs.model.js';
import Metrica from '../models/metrica.model.js';



export const createReporte = async (req, res) => {
    try {
        const userId = req.user.correo;
        const { mes, anio } = req.body;

        if (!mes || !anio) {
            return res.status(400).json({
                message: 'Error',
                error: 'Se deben proporcionar el mes y el año del reporte en el cuerpo de la petición.'
            });
        }

        const mesReportado = parseInt(mes);
        const anioReportado = parseInt(anio);

        // Verificar si ya existe un reporte para este usuario en el mes y año especificados
        const reporteExistente = await Reporte.findOne({ userId, mesReportado, anioReportado });

        if (reporteExistente) {
            return res.status(200).json({ message: 'OK', data: reporteExistente, messageInfo: 'Ya existe un reporte para este mes y año.' });
        }

        const startOfMonth = new Date(anioReportado, mesReportado - 1, 1);
        const endOfMonth = new Date(anioReportado, mesReportado, 0, 23, 59, 59, 999);

        // Info del usuario
        const userInfo = await User.findOne({ correo: userId }).select('-password');


        // Obtener las medidas del usuario para el mes solicitado
        const medidasMensuales = await Metrica.find({
            userId: userId,
            fecha: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({ fecha: 1 });

        if (medidasMensuales.length  == 0 ) {
            return res.status(404).json({ message: 'Error', error: 'Es necesario registrar por lo menos 4 medidas por mes' });
        }
       
        // Obtener los logs de entrenamiento del usuario para el mes solicitado
        const logsMensuales = await Log.find({
            userId: userId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }).sort({ createdAt: 1 });

        if(logsMensuales.length == 0) {
            return res.status(404).json({message: 'Error', error: 'No se encontraror logs este mes'});
        }

    
        
        // Calcular el progreso para el resumen ejecutivo y el análisis
        const pesoInicial = medidasMensuales.length > 0 ? medidasMensuales[0].peso : null;
        const pesoFinal = medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].peso : null;
        const cambioPeso = pesoInicial !== null && pesoFinal !== null ? (pesoInicial - pesoFinal).toFixed(2) : null;


        const cinturaInicial = medidasMensuales.length > 0 ? medidasMensuales[0].cintura : null;
        const cinturaFinal = medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].cintura : null;
        const cambioCintura = cinturaInicial !== null && cinturaFinal !== null ? (cinturaFinal - cinturaInicial).toFixed(2) : null;

        const grasaInicial = medidasMensuales.length > 0 ? medidasMensuales[0].porcentajeGrasaCorporal : null;
        const grasaFinal = medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].porcentajeGrasaCorporal : null;
        const cambioGrasa = grasaInicial !== null && grasaFinal !== null ? (grasaFinal - grasaInicial).toFixed(2) : null;


        // Calcular IMC inicial y final
        const imcInicial = pesoInicial && userInfo.estatura ? (pesoInicial / (userInfo.estatura * userInfo.estatura)).toFixed(2) : null;
        const imcFinal = pesoFinal && userInfo.estatura ? (pesoFinal / (userInfo.estatura * userInfo.estatura)).toFixed(2) : null;
        const clasificacionIMC = (imc) => {
            if (!imc) return null;
            if (imc < 18.5) return "Bajo peso";
            if (imc >= 18.5 && imc <= 24.9) return "Normal";
            if (imc >= 25 && imc <= 29.9) return "Sobrepeso";
            return "Obesidad";
        };


        const clasificacionInicialIMC = clasificacionIMC(imcInicial);
        const clasificacionFinalIMC = clasificacionIMC(imcFinal);


        
        // Calcular relación cintura-cadera inicial y final
        const relacionInicialCinturaCadera = cinturaInicial && medidasMensuales[0].cadera ? (cinturaInicial / medidasMensuales[0].cadera).toFixed(2) : null;
        const relacionFinalCinturaCadera = cinturaFinal && medidasMensuales[medidasMensuales.length - 1].cadera ? (cinturaFinal / medidasMensuales[medidasMensuales.length - 1].cadera).toFixed(2) : null;
        const interpretarRiesgoCinturaCadera = (relacion, genero) => {
            if (!relacion) return null;
            const relacionNum = parseFloat(relacion);
            if (genero === "Masculino") {
                if (relacionNum < 0.9) return "Bajo";
                if (relacionNum >= 0.9 && relacionNum < 1.0) return "Moderado";
                return "Alto";
            } else if (genero === "Femenino") {
                if (relacionNum < 0.8) return "Bajo";
                if (relacionNum >= 0.8 && relacionNum < 0.85) return "Moderado";
                return "Alto";
            }
            return null;
        };
        const riesgoInicialCinturaCadera = interpretarRiesgoCinturaCadera(relacionInicialCinturaCadera, userInfo.genero);
        const riesgoFinalCinturaCadera = interpretarRiesgoCinturaCadera(relacionFinalCinturaCadera, userInfo.genero);



        // Formatear las medidas semanales para la sección del reporte
        const datosMedidasSemanales = medidasMensuales.map(medida => ({
            fechaMedicion: medida.fecha ? medida.fecha.toISOString() : null,
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

        const fechaReporteFormateada = `${new Date(anioReportado, mesReportado - 1).toLocaleString('default', { month: 'long' })} ${anioReportado}`;

        const reporteData = {
            tituloReporte: "Reporte Mensual de Progreso Físico",
            nombreUsuario: `${userInfo.nombre}  ${userInfo.apellidos}`,
            fechaReporte: fechaReporteFormateada,
            resumenEjecutivo: {
                progresoGeneral: "Aquí irá un breve resumen del progreso.",
                logrosMejoras: "Aquí se destacarán los logros y áreas de mejora.",
                mensajeAliento: "¡Sigue adelante con tu progreso!"
            },
            datosMedidasSemanales: datosMedidasSemanales,
            analisisProgresoMensual: {
                cambioPeso: { pesoInicial, pesoFinal, cambioTotal: cambioPeso },
                cambioCircunferencias: {
                    cintura: { inicial: cinturaInicial, final: cinturaFinal, cambio: cambioCintura },
                    cadera: { inicial: medidasMensuales.length > 0 ? medidasMensuales[0].cadera : null, final: medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].cadera : null, cambio: medidasMensuales.length > 0 && medidasMensuales[0].cadera && medidasMensuales[medidasMensuales.length - 1].cadera ? (medidasMensuales[medidasMensuales.length - 1].cadera - medidasMensuales[0].cadera).toFixed(2) : null },
                    pecho: { inicial: medidasMensuales.length > 0 ? medidasMensuales[0].pecho : null, final: medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].pecho : null, cambio: medidasMensuales.length > 0 && medidasMensuales[0].pecho && medidasMensuales[medidasMensuales.length - 1].pecho ? (medidasMensuales[medidasMensuales.length - 1].pecho - medidasMensuales[0].pecho).toFixed(2) : null },
                    muslo: { inicial: medidasMensuales.length > 0 ? medidasMensuales[0].muslo : null, final: medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].muslo : null, cambio: medidasMensuales.length > 0 && medidasMensuales[0].muslo && medidasMensuales[medidasMensuales.length - 1].muslo ? (medidasMensuales[medidasMensuales.length - 1].muslo - medidasMensuales[0].muslo).toFixed(2) : null },
                    pantorrilla: { inicial: medidasMensuales.length > 0 ? medidasMensuales[0].pantorrilla : null, final: medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].pantorrilla : null, cambio: medidasMensuales.length > 0 && medidasMensuales[0].pantorrilla && medidasMensuales[medidasMensuales.length - 1].pantorrilla ? (medidasMensuales[medidasMensuales.length - 1].pantorrilla - medidasMensuales[0].pantorrilla).toFixed(2) : null },
                    brazoRelajado: { inicial: medidasMensuales.length > 0 ? medidasMensuales[0].brazoRelajado : null, final: medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].brazoRelajado : null, cambio: medidasMensuales.length > 0 && medidasMensuales[0].brazoRelajado && medidasMensuales[medidasMensuales.length - 1].brazoRelajado ? (medidasMensuales[medidasMensuales.length - 1].brazoRelajado - medidasMensuales[0].brazoRelajado).toFixed(2) : null },
                    brazoFlexionado: { inicial: medidasMensuales.length > 0 ? medidasMensuales[0].brazoFlexionado : null, final: medidasMensuales.length > 0 ? medidasMensuales[medidasMensuales.length - 1].brazoFlexionado : null, cambio: medidasMensuales.length > 0 && medidasMensuales[0].brazoFlexionado && medidasMensuales[medidasMensuales.length - 1].brazoFlexionado ? (medidasMensuales[medidasMensuales.length - 1].brazoFlexionado - medidasMensuales[0].brazoFlexionado).toFixed(2) : null },
                },
                cambioGrasaCorporal: { porcentajeInicial: grasaInicial, porcentajeFinal: grasaFinal, cambioTotal: cambioGrasa },
                calculoIMC: { imcInicial, imcFinal, clasificacionInicial: clasificacionInicialIMC, clasificacionFinal: clasificacionFinalIMC },
                relacionCinturaCadera: { inicial: relacionInicialCinturaCadera, final: relacionFinalCinturaCadera, riesgoInicial: riesgoInicialCinturaCadera, riesgoFinal: riesgoFinalCinturaCadera }
            },
        };

        const nuevoReporte = new Reporte({
            userId: userId,
            mesReportado: mesReportado,
            anioReportado: anioReportado,
            fechaCreacion: new Date(),
            tituloReporte: reporteData.tituloReporte,
            nombreUsuario: reporteData.nombreUsuario,
            fechaReporte: reporteData.fechaReporte,
            resumenEjecutivo: reporteData.resumenEjecutivo,
            datosMedidasSemanales: reporteData.datosMedidasSemanales,
            analisisProgresoMensual: reporteData.analisisProgresoMensual,
        });
        await nuevoReporte.save();
        console.log(nuevoReporte)
        res.status(201).json({ message: 'OK', data: reporteData });

    } catch (error) {
        console.error('Error al crear la información del reporte:', error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
};


export const getReporte = async (req, res) => {
    try {
        const userId = req.user.correo;
        let mes, anio;

        // Obtener mes y año de los query parameters
        const queryMes = req.query.mes;
        const queryAnio = req.query.anio;

        // Determinar el mes y el año a buscar
        if (queryMes && queryAnio) {
            mes = parseInt(queryMes);
            anio = parseInt(queryAnio);

            // **Validación de query parameters:**
            if (isNaN(mes) || mes < 1 || mes > 12) {
                return res.status(400).json({ message: 'Error', error: 'El parámetro "mes" debe ser un número entre 1 y 12.' });
            }
            if (isNaN(anio) || anio < 2000) { // Ajusta el año mínimo según tus necesidades
                return res.status(400).json({ message: 'Error', error: 'El parámetro "anio" debe ser un número válido (ej. 2023).' });
            }
        } else {
            // Si no se proporcionan mes y año en la query, buscar el reporte más reciente
            const ultimoReporte = await Reporte.findOne({ userId }).sort({ fechaCreacion: -1 });

            if (ultimoReporte) {
                anio = ultimoReporte.anioReportado;
                mes = ultimoReporte.mesReportado;
            } else {
                // Si no hay ningún reporte para el usuario, se devuelve un 404
                return res.status(404).json({ message: 'Error', error: 'No se encontraron reportes para este usuario.' });
            }
        }

        // Buscar el reporte específico o el más reciente si no se especificaron mes/año
        const reporteEncontrado = await Reporte.findOne({ userId, mesReportado: mes, anioReportado: anio });

        if (reporteEncontrado) {
            return res.status(200).json({ message: 'OK', data: reporteEncontrado });
        } else {
            // Si se especificó un mes/año pero no se encontró un reporte para ese periodo
            return res.status(404).json({ message: 'Error', error: `No se encontró un reporte para ${new Date(anio, mes - 1).toLocaleString('es-MX', { month: 'long', year: 'numeric' })}.` });
        }

    } catch (error) {
        console.error('Error al obtener la información del reporte:', error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
};