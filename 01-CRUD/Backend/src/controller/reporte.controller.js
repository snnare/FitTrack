const obtenerDatosParaReporte = async (correo) => {
    // Obtener el usuario
    const user = await User.findOne({ correo });
    if (!user) throw new Error('Usuario no encontrado');

    // Obtener los logs del usuario
    const logs = await Log.find({ userId: correo }).sort({ fecha: 1 });

    if (logs.length === 0) throw new Error('No hay logs registrados');

    // Calcular estadísticas básicas
    const estadisticas = {
        objetivo: user.objetivo,
        totalEjercicios: logs.length,
        progresoPeso: [],
        progresoRepeticiones: [],
    };

    logs.forEach(log => {
        if (log.peso) {
            estadisticas.progresoPeso.push({
                fecha: log.fecha,
                pesoLevantado: log.peso,
            });
        }
        if (log.repeticiones) {
            estadisticas.progresoRepeticiones.push({
                fecha: log.fecha,
                repeticiones: log.repeticiones,
            });
        }
    });

    return estadisticas;
};