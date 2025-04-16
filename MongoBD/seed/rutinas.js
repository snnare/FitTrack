db.rutinas.insertMany([
    // Rutinas para Ganar Peso (Principiante)
    {
        nombre: "Ganancia de Peso Inicial",
        descripcion: "Rutina básica para principiantes que buscan ganar peso.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Sentadillas", series: 3, repeticiones: 10, peso: 40 },
            { nombre: "Press de banca", series: 3, repeticiones: 10, peso: 30 },
            { nombre: "Remo con barra", series: 3, repeticiones: 10, peso: 35 },
            { nombre: "Press militar", series: 3, repeticiones: 10, peso: 25 },
        ]
    },
    {
        nombre: "Fuerza Base",
        descripcion: "Enfoque en ejercicios compuestos para construir fuerza inicial.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Peso muerto", series: 3, repeticiones: 8, peso: 50 },
            { nombre: "Zancadas", series: 3, repeticiones: 10, peso: 20 },
            { nombre: "Dominadas asistidas", series: 3, repeticiones: 8 },
            { nombre: "Fondos en paralelas", series: 3, repeticiones: 8 },
        ]
    },
    {
        nombre: "Hipertrofia Principiante",
        descripcion: "Rutina para principiantes enfocada en hipertrofia muscular.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Curl de bíceps", series: 3, repeticiones: 12, peso: 15 },
            { nombre: "Extensión de tríceps", series: 3, repeticiones: 12, peso: 15 },
            { nombre: "Elevaciones laterales", series: 3, repeticiones: 12, peso: 10 },
            { nombre: "Press francés", series: 3, repeticiones: 12, peso: 15 },
        ]
    },

    // Rutinas para Ganar Peso (Intermedio)
    {
        nombre: "Ganancia de Peso Intermedia",
        descripcion: "Rutina para usuarios intermedios que buscan ganar peso.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        ejercicios: [
            { nombre: "Sentadillas frontales", series: 4, repeticiones: 8, peso: 60 },
            { nombre: "Press de banca inclinado", series: 4, repeticiones: 8, peso: 50 },
            { nombre: "Remo con barra T", series: 4, repeticiones: 8, peso: 55 },
            { nombre: "Press Arnold", series: 4, repeticiones: 8, peso: 40 },
        ]
    },
    {
        nombre: "Fuerza y Volumen",
        descripcion: "Combina ejercicios de fuerza y volumen para un crecimiento óptimo.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        ejercicios: [
            { nombre: "Peso muerto rumano", series: 4, repeticiones: 6, peso: 70 },
            { nombre: "Zancadas con mancuernas", series: 4, repeticiones: 8, peso: 30 },
            { nombre: "Dominadas con peso", series: 4, repeticiones: 6, peso: 10 },
            { nombre: "Fondos con peso", series: 4, repeticiones: 6, peso: 10 },
        ]
    },
    // Rutinas para Ganar Peso (Avanzado)
    {
        nombre: "Ganancia de Peso Avanzada",
        descripcion: "Rutina para usuarios avanzados que buscan ganar peso.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        ejercicios: [
            { nombre: "Sentadillas Zercher", series: 5, repeticiones: 6, peso: 80 },
            { nombre: "Press de banca con pausa", series: 5, repeticiones: 5, peso: 70 },
            { nombre: "Remo pendlay", series: 5, repeticiones: 5, peso: 75 },
            { nombre: "Press militar con push press", series: 5, repeticiones: 5, peso: 60 },
        ]
    },
    {
        nombre: "Fuerza y Condicionamiento",
        descripcion: "Rutina avanzada para fuerza máxima y acondicionamiento.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        ejercicios: [
            { nombre: "Peso muerto sumo", series: 5, repeticiones: 3, peso: 90 },
            { nombre: "Zancadas búlgaras", series: 5, repeticiones: 6, peso: 40 },
            { nombre: "Dominadas con lastre", series: 5, repeticiones: 3, peso: 20 },
            { nombre: "Fondos con lastre", series: 5, repeticiones: 3, peso: 20 },
        ]
    },
    // Rutinas para Perder Peso (Principiante)
    {
        nombre: "Quema de Calorías Inicial",
        descripcion: "Rutina para principiantes enfocada en la pérdida de peso.",
        objetivo: "Perder peso",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Caminadora", series: 3, repeticiones: 15, peso: 0 },
            { nombre: "Elíptica", series: 3, repeticiones: 15, peso: 0 },
            { nombre: "Burpees", series: 3, repeticiones: 10, peso: 0 },
            { nombre: "Saltos de tijera", series: 3, repeticiones: 15, peso: 0 },
        ]
    },
    {
        nombre: "Cardio y Fuerza",
        descripcion: "Combina cardio y ejercicios de fuerza para quemar calorías.",
        objetivo: "Perder peso",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Sentadillas con peso corporal", series: 3, repeticiones: 12, peso: 0 },
            { nombre: "Flexiones", series: 3, repeticiones: 10, peso: 0 },
            { nombre: "Remo con mancuernas", series: 3, repeticiones: 12, peso: 10 },
            { nombre: "Press militar con mancuernas", series: 3, repeticiones: 12, peso: 10 },
        ]
    },
    // Rutinas para Perder Peso (Intermedio)
    {
        nombre: "Quema de Calorías Intermedia",
        descripcion: "Rutina para usuarios intermedios enfocada en la pérdida de peso.",
        objetivo: "Perder peso",
        nivelExperiencia: "Intermedio",
        ejercicios: [
            { nombre: "HIIT en bicicleta estática", series: 4, repeticiones: 12, peso: 0 },
            { nombre: "Circuitos de entrenamiento", series: 4, repeticiones: 12, peso: 0 },
            { nombre: "Saltos con cuerda", series: 4, repeticiones: 15, peso: 0 },
            { nombre: "Mountain climbers", series: 4, repeticiones: 20, peso: 0 },
        ]
    },
    {
        nombre: "Cardio y Fuerza Avanzado",
        descripcion: "Combina cardio avanzado y ejercicios de fuerza para quemar calorías.",
        objetivo: "Perder peso",
        nivelExperiencia: "Intermedio",
        ejercicios: [
            { nombre: "Sentadillas con salto", series: 4, repeticiones: 10, peso: 0 },
            { nombre: "Flexiones con palmada", series: 4, repeticiones: 8, peso: 0 },
            { nombre: "Remo con barra T", series: 4, repeticiones: 10, peso: 30 },
            { nombre: "Press Arnold", series: 4, repeticiones: 10, peso: 20 },
        ]
    },
    // Rutinas para Perder Peso (Avanzado)
    {
        nombre: "Quema de Calorías Avanzada",
        descripcion: "Rutina para usuarios avanzados enfocada en la pérdida de peso.",
        objetivo: "Perder peso",
        nivelExperiencia: "Avanzado",
        ejercicios: [
            { nombre: "HIIT en escaladora", series: 5, repeticiones: 15, peso: 0 },
            { nombre: "Entrenamiento Tabata", series: 5, repeticiones: 20, peso: 0 },
            { nombre: "Burpees con flexiones", series: 5, repeticiones: 12, peso: 0 },
            { nombre: "Saltos de caja", series: 5, repeticiones: 12, peso: 0 },
        ]
    },
    {
        nombre: "Cardio y Fuerza Máxima",
        descripcion: "Combina cardio máximo y ejercicios de fuerza para quemar calorías.",
        objetivo: "Perder peso",
        nivelExperiencia: "Avanzado",
        ejercicios: [
            { nombre: "Sentadillas con barra", series: 5, repeticiones: 8, peso: 60 },
            { nombre: "Flexiones con lastre", series: 5, repeticiones: 6, peso: 10 },
            { nombre: "Remo con barra pendlay", series: 5, repeticiones: 8, peso: 50 },
            { nombre: "Press militar con push press", series: 5, repeticiones: 8, peso: 40 },
        ]
    },

    // Rutinas para Definir (Principiante)
    {
        nombre: "Definición Muscular Inicial",
        descripcion: "Rutina para principiantes enfocada en la definición muscular.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Curl de bíceps con mancuernas", series: 3, repeticiones: 12, peso: 10 },
            { nombre: "Extensión de tríceps con polea", series: 3, repeticiones: 12, peso: 15 },
            { nombre: "Elevaciones laterales con mancuernas", series: 3, repeticiones: 12, peso: 8 },
            { nombre: "Press francés con barra Z", series: 3, repeticiones: 12, peso: 15 },
        ]
    },
    {
        nombre: "Definición y Aislamiento",
        descripcion: "Enfoque en ejercicios de aislamiento para definir músculos.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Curl de concentración", series: 3, repeticiones: 12, peso: 8 },
            { nombre: "Patadas de tríceps", series: 3, repeticiones: 12, peso: 8 },
            { nombre: "Elevaciones frontales", series: 3, repeticiones: 12, peso: 8 },
            { nombre: "Press francés con mancuernas", series: 3, repeticiones: 12, peso: 10 },
        ]
    },
    // Rutinas para Definir (Intermedio)
    {
        nombre: "Definición Muscular Intermedia",
        descripcion: "Rutina para usuarios intermedios enfocada en la definición muscular.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        ejercicios: [
            { nombre: "Curl de bíceps con barra", series: 4, repeticiones: 10, peso: 20 },
            { nombre: "Extensión de tríceps con cuerda", series: 4, repeticiones: 10, peso: 25 },
            { nombre: "Elevaciones laterales con polea", series: 4, repeticiones: 10, peso: 15 },
            { nombre: "Press francés con barra recta", series: 4, repeticiones: 10, peso: 20 },
        ]
    },
    {
        nombre: "Aislamiento Avanzado",
        descripcion: "Enfoque en ejercicios de aislamiento avanzados para definición.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        ejercicios: [
            { nombre: "Curl de bíceps con agarre supino", series: 4, repeticiones: 10, peso: 15 },
            { nombre: "Extensión de tríceps con agarre prono", series: 4, repeticiones: 10, peso: 20 },
            { nombre: "Elevaciones laterales con mancuernas en banco inclinado", series: 4, repeticiones: 10, peso: 12 },
            { nombre: "Press francés con mancuernas en banco inclinado", series: 4, repeticiones: 10, peso: 18 },
        ]
    },
    // Rutinas para Definir (Avanzado)
    {
        nombre: "Definición Muscular Avanzada",
        descripcion: "Rutina para usuarios avanzados enfocada en la definición muscular.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        ejercicios: [
            { nombre: "Curl de bíceps con barra EZ", series: 5, repeticiones: 8, peso: 25 },
            { nombre: "Extensión de tríceps con polea con agarre inverso", series: 5, repeticiones: 8, peso: 30 },
            { nombre: "Elevaciones laterales con mancuernas en polea", series: 5, repeticiones: 8, peso: 20 },
            { nombre: "Press francés con barra EZ en banco declinado", series: 5, repeticiones: 8, peso: 25 },
        ]
    },
    {
        nombre: "Aislamiento Máximo",
        descripcion: "Enfoque en ejercicios de aislamiento máximos para definición.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        ejercicios: [
            { nombre: "Curl de bíceps con mancuernas superserie", series: 5, repeticiones: 8, peso: 20 },
            { nombre: "Extensión de tríceps con cuerda superserie", series: 5, repeticiones: 8, peso: 25 },
            { nombre: "Elevaciones laterales con mancuernas en superserie", series: 5, repeticiones: 8, peso: 18 },
            { nombre: "Press francés con mancuernas en superserie", series: 5, repeticiones: 8, peso: 22 },
        ]
    },

    // Rutinas para Mantener (Principiante)
    {
        nombre: "Mantenimiento Inicial",
        descripcion: "Rutina básica para mantener la forma física.",
        objetivo: "Mantener",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Caminata rápida", series: 3, repeticiones: 15, peso: 0 },
            { nombre: "Yoga", series: 3, repeticiones: 15, peso: 0 },
            { nombre: "Plancha", series: 3, repeticiones: 30, peso: 0 },
            { nombre: "Sentadillas con peso corporal", series: 3, repeticiones: 12, peso: 0 },
        ]
    },
    {
        nombre: "Mantenimiento Activo",
        descripcion: "Rutina para mantener la forma física con actividad moderada.",
        objetivo: "Mantener",
        nivelExperiencia: "Principiante",
        ejercicios: [
            { nombre: "Natación", series: 3, repeticiones: 15, peso: 0 },
            { nombre: "Ciclismo", series: 3, repeticiones: 15, peso: 0 },
            { nombre: "Flexiones", series: 3, repeticiones: 10, peso: 0 },
            { nombre: "Remo con mancuernas", series: 3, repeticiones: 12, peso: 10 },
        ]
    },
    // Rutinas para Mantener (Intermedio)
    {
        nombre: "Mantenimiento Intermedio",
        descripcion: "Rutina para usuarios intermedios para mantener la forma física.",
        objetivo: "Mantener",
        nivelExperiencia: "Intermedio",
        ejercicios: [
            { nombre: "Correr", series: 4, repeticiones: 12, peso: 0 },
            { nombre: "HIIT en bicicleta estática", series: 4, repeticiones: 12, peso: 0 },
            { nombre: "Dominadas", series: 4, repeticiones: 8, peso: 0 },
            { nombre: "Fondos en paralelas", series: 4, repeticiones: 8, peso: 0 },
        ]
    },
    {
        nombre: "Mantenimiento Avanzado",
        descripcion: "Rutina para usuarios avanzados para mantener la forma física.",
        objetivo: "Mantener",
        nivelExperiencia: "Avanzado",
        ejercicios: [
            { nombre: "HIIT en escaladora", series: 5, repeticiones: 15, peso: 0 },
            { nombre: "Entrenamiento Tabata", series: 5, repeticiones: 20, peso: 0 },
            { nombre: "Dominadas con lastre", series: 5, repeticiones: 6, peso: 10 },
            { nombre: "Fondos con lastre", series: 5, repeticiones: 6, peso: 10 },
        ]
    },

]);