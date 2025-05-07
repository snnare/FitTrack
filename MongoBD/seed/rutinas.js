db.rutinas.insertMany([
    // Rutinas para Pecho
    {
        nombre: "Press de Banca Plano",
        descripcion: "Ejercicio fundamental para el desarrollo del pecho.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Press de Banca", series: 3, repeticiones: 8, peso: 60 }]
    },
    {
        nombre: "Press de Banca Inclinado",
        descripcion: "Desarrolla la parte superior del pecho.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Press Inclinado", series: 3, repeticiones: 8, peso: 50 }]
    },
    {
        nombre: "Aperturas con Mancuernas",
        descripcion: "Aísla y define el pecho.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Aperturas", series: 3, repeticiones: 12, peso: 15 }]
    },
    {
        nombre: "Press de Banca Declinado",
        descripcion: "Enfatiza la parte inferior del pecho.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Press Declinado", series: 3, repeticiones: 8, peso: 55 }]
    },
    {
        nombre: "Cruces en Polea",
        descripcion: "Define y da forma al pecho.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Cruces Polea", series: 3, repeticiones: 12, peso: 20 }]
    },
    {
        nombre: "Press de Banca con Pausa",
        descripcion: "Aumenta la fuerza en el press de banca.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Press Pausa", series: 4, repeticiones: 5, peso: 80 }]
    },
    {
        nombre: "Fondos en Paralelas (Pecho)",
        descripcion: "Trabaja el pecho y tríceps con el peso corporal.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Fondos Pecho", series: 4, repeticiones: 8, peso: 0 }]
    },
    {
        nombre: "Press con Mancuernas en Banco Inclinado",
        descripcion: "Mayor rango de movimiento para el pecho superior.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Press Mancuernas Inclinado", series: 3, repeticiones: 8, peso: 40 }]
    },
     {
        nombre: "Aperturas Declinadas con Mancuernas",
        descripcion: "Acentúa la porción inferior del pecho.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Aperturas Declinadas", series: 3, repeticiones: 12, peso: 18 }]
    },
    {
        nombre: "Press de Banca con Agarre Cerrado",
        descripcion: "También involucra tríceps, pero trabaja el pecho.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Pecho",
        ejercicios: [{ nombre: "Press Agarre Cerrado", series: 3, repeticiones: 8, peso: 55 }]
    },

    // Rutinas para Espalda
    {
        nombre: "Remo con Barra",
        descripcion: "Ejercicio básico para la espalda.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Remo Barra", series: 3, repeticiones: 8, peso: 50 }]
    },
    {
        nombre: "Dominadas",
        descripcion: "Ejercicio de peso corporal para la espalda.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Dominadas", series: 3, repeticiones: 6, peso: 0 }]
    },
    {
        nombre: "Remo con Mancuernas",
        descripcion: "Permite un mayor rango de movimiento.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Remo Mancuernas", series: 3, repeticiones: 12, peso: 20 }]
    },
    {
        nombre: "Remo T",
        descripcion: "Trabaja el centro de la espalda.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Remo T", series: 3, repeticiones: 8, peso: 60 }]
    },
     {
        nombre: "Jalones al Pecho",
        descripcion: "Ejercicio en polea para la espalda.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Jalones Pecho", series: 3, repeticiones: 12, peso: 30 }]
    },
    {
        nombre: "Remo Pendlay",
        descripcion: "Enfoque en la potencia y fuerza de la espalda baja.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Remo Pendlay", series: 4, repeticiones: 5, peso: 70 }]
    },
    {
        nombre: "Dominadas con Lastre",
        descripcion: "Aumenta la dificultad de las dominadas.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Dominadas Lastre", series: 4, repeticiones: 6, peso: 15 }]
    },
    {
        nombre: "Remo con Barra Prono",
        descripcion: "Variación del remo con barra tradicional.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Espalda",
         ejercicios: [{ nombre: "Remo Barra Prono", series: 3, repeticiones: 8, peso: 55 }]
    },
    {
        nombre: "Jalones Trasnuca",
        descripcion: "Otra variación de jalones, enfocando otra parte de la espalda",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Jalones Trasnuca", series: 3, repeticiones: 12, peso: 25 }]
    },
    {
        nombre: "Peso Muerto",
        descripcion: "Ejercicio que trabaja toda la espalda y el cuerpo",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Espalda",
        ejercicios: [{ nombre: "Peso Muerto", series: 5, repeticiones: 5, peso: 100 }]
    },

    // Rutinas para Piernas
    {
        nombre: "Sentadillas",
        descripcion: "Ejercicio fundamental para las piernas.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Sentadillas", series: 3, repeticiones: 10, peso: 50 }]
    },
    {
        nombre: "Zancadas",
        descripcion: "Trabaja los cuádriceps, glúteos e isquiotibiales.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Zancadas", series: 3, repeticiones: 10, peso: 30 }]
    },
    {
        nombre: "Prensa de Piernas",
        descripcion: "Ejercicio en máquina para las piernas.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Prensa", series: 3, repeticiones: 12, peso: 80 }]
    },
    {
        nombre: "Sentadillas Frontales",
        descripcion: "Enfatiza los cuádriceps.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Sentadillas Frontales", series: 4, repeticiones: 8, peso: 70 }]
    },
    {
        nombre: "Peso Muerto Rumano",
        descripcion: "Trabaja los isquiotibiales y glúteos.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Peso Muerto Rumano", series: 4, repeticiones: 8, peso: 80 }]
    },
    {
        nombre: "Sentadillas Zercher",
        descripcion: "Variación avanzada de sentadillas.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Sentadillas Zercher", series: 5, repeticiones: 6, peso: 90 }]
    },
    {
        nombre: "Zancadas Búlgaras",
        descripcion: "Ejercicio unilateral para las piernas.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Zancadas Búlgaras", series: 5, repeticiones: 6, peso: 50 }]
    },
    {
        nombre: "Extensiones de Piernas",
        descripcion: "Ejercicio de aislamiento para cuádriceps",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Extensiones Piernas", series: 3, repeticiones: 12, peso: 25 }]
    },
    {
        nombre: "Curl de Piernas",
        descripcion: "Ejercicio de aislamiento para isquiotibiales",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Curl Piernas", series: 3, repeticiones: 12, peso: 20 }]
    },
    {
         nombre: "Sentadilla Hack",
        descripcion: "Sentadilla en máquina Hack",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Piernas",
        ejercicios: [{ nombre: "Sentadilla Hack", series: 4, repeticiones: 8, peso: 100 }]
    },

    // Rutinas para Glúteos
    {
        nombre: "Puentes de Glúteos",
        descripcion: "Ejercicio básico para los glúteos.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Puentes", series: 3, repeticiones: 15, peso: 0 }]
    },
    {
        nombre: "Patadas de Glúteo",
        descripcion: "Aísla y trabaja los glúteos.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Patadas Glúteo", series: 3, repeticiones: 15, peso: 0 }]
    },
    {
        nombre: "Sentadillas Búlgaras",
        descripcion: "Ejercicio unilateral para los glúteos.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Sentadillas Búlgaras", series: 3, repeticiones: 12, peso: 10 }]
    },
    {
        nombre: "Hip Thrust",
        descripcion: "Ejercicio efectivo para el desarrollo de los glúteos.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Hip Thrust", series: 4, repeticiones: 8, peso: 60 }]
    },
    {
        nombre: "Zancadas Laterales",
        descripcion: "Trabaja los glúteos desde un ángulo diferente.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Zancadas Laterales", series: 3, repeticiones: 12, peso: 10 }]
    },
    {
        nombre: "Puente de Glúteos con Barra",
        descripcion: "Aumenta la dificultad del puente de glúteos.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Puente Barra", series: 4, repeticiones: 8, peso: 80 }]
    },
    {
        nombre: "Elevación de Pelvis con Banda Elástica",
        descripcion: "Añade resistencia al ejercicio de elevación de pelvis.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Elevación Pelvis Banda", series: 4, repeticiones: 15, peso: 0 }]
    },
    {
        nombre: "Sentadilla sumo",
        descripcion: "Variación de la sentadilla que enfatiza los glúteos.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Sentadilla Sumo", series: 3, repeticiones: 12, peso: 20 }]
    },
    {
        nombre: "Patada de Glúteo en Polea",
        descripcion: "Ejercicio de aislamiento para glúteos en polea.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Patada Polea", series: 3, repeticiones: 12, peso: 25 }]
    },
    {
        nombre: "Caminata de Monstruo con Banda",
        descripcion: "Ejercicio con banda para activar los glúteos.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Glúteos",
        ejercicios: [{ nombre: "Caminata Monstruo", series: 3, repeticiones: 15, peso: 0 }]
    },

    // Rutinas para Brazos
    {
        nombre: "Curl de Bíceps",
        descripcion: "Ejercicio básico para los bíceps.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Curl Bíceps", series: 3, repeticiones: 10, peso: 20 }]
    },
    {
        nombre: "Extensión de Tríceps",
        descripcion: "Ejercicio básico para los tríceps.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Extensión Tríceps", series: 3, repeticiones: 10, peso: 20 }]
    },
    {
        nombre: "Curl Martillo",
        descripcion: "Variación del curl de bíceps.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Curl Martillo", series: 3, repeticiones: 12, peso: 15 }]
    },
    {
        nombre: "Press Francés",
        descripcion: "Ejercicio para tríceps con barra.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Press Francés", series: 3, repeticiones: 8, peso: 30 }]
    },
    {
        nombre: "Fondos en Paralelas",
        descripcion: "Ejercicio de peso corporal para tríceps.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Fondos Paralelas", series: 3, repeticiones: 12, peso: 0 }]
    },
    {
        nombre: "Curl con Barra Z",
        descripcion: "Reduce la tensión en las muñecas.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Curl Barra Z", series: 4, repeticiones: 8, peso: 30 }]
    },
    {
        nombre: "Extensión de Tríceps con Cuerda",
        descripcion: "Permite un mayor rango de movimiento.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Extensión Cuerda", series: 4, repeticiones: 12, peso: 25 }]
    },
    {
        nombre: "Curl Concentrado",
        descripcion: "Ejercicio de aislamiento para bíceps.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Curl Concentrado", series: 3, repeticiones: 12, peso: 12 }]
    },
    {
        nombre: "Patada de Tríceps",
        descripcion: "Otro ejercicio de aislamiento para tríceps.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Patada Tríceps", series: 3, repeticiones: 12, peso: 10 }]
    },
    {
        nombre: "Extensión de Tríceps con Mancuerna",
        descripcion: "Trabaja el tríceps de forma unilateral",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Brazos",
        ejercicios: [{ nombre: "Extensión Mancuerna", series: 3, repeticiones: 10, peso: 25 }]
    },

    // Rutinas para Hombro
    {
        nombre: "Press Militar",
        descripcion: "Ejercicio básico para los hombros.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Principiante",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Press Militar", series: 3, repeticiones: 8, peso: 40 }]
    },
    {
        nombre: "Elevaciones Laterales",
        descripcion: "Trabaja la parte lateral de los hombros.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Elevaciones Laterales", series: 3, repeticiones: 12, peso: 10 }]
    },
    {
        nombre: "Elevaciones Frontales",
        descripcion: "Trabaja la parte frontal de los hombros.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Elevaciones Frontales", series: 3, repeticiones: 12, peso: 10 }]
    },
    {
        nombre: "Press Arnold",
        descripcion: "Variación del press militar con mancuernas.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Press Arnold", series: 3, repeticiones: 8, peso: 30 }]
    },
    {
        nombre: "Pájaros",
        descripcion: "Ejercicio para la parte posterior de los hombros.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Pájaros", series: 3, repeticiones: 12, peso: 12 }]
    },
     {
        nombre: "Press Militar con Mancuernas",
        descripcion: "Permite mayor rango de movimiento.",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Press Mancuernas", series: 3, repeticiones: 8, peso: 35 }]
    },
    {
        nombre: "Elevaciones Laterales con Polea",
        descripcion: "Mantiene la tensión constante.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Elevaciones Laterales Polea", series: 3, repeticiones: 12, peso: 18 }]
    },
    {
        nombre: "Press Push",
        descripcion: "Combina impulso de piernas y hombros",
        objetivo: "Ganar peso",
        nivelExperiencia: "Avanzado",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Press Push", series: 4, repeticiones: 6, peso: 50 }]
    },
    {
        nombre: "Remo al mentón",
        descripcion: "Ejercicio que trabaja hombros y trapecios",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Remo al mentón", series: 3, repeticiones: 8, peso: 40 }]
    },
    {
        nombre: "Elevaciones Laterales en Banco Inclinado",
        descripcion: "Aísla el hombro lateral.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        categoria: "Hombro",
        ejercicios: [{ nombre: "Elevaciones Laterales Inclinado", series: 4, repeticiones: 12, peso: 15 }]
    },

    // Rutinas para Abs
    {
        nombre: "Crunches",
        descripcion: "Ejercicio básico para abdominales.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Abs",
        ejercicios: [{ nombre: "Crunches", series: 3, repeticiones: 15, peso: 0 }]
    },
    {
        nombre: "Plancha",
        descripcion: "Ejercicio isométrico para el core.",
        objetivo: "Definir",
        nivelExperiencia: "Principiante",
        categoria: "Abs",
        ejercicios: [{ nombre: "Plancha", series: 3, repeticiones: 30, peso: 0 }]
    },
    {
        nombre: "Elevaciones de Piernas",
        descripcion: "Trabaja la parte inferior del abdomen.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Abs",
        ejercicios: [{ nombre: "Elevaciones Piernas", series: 3, repeticiones: 12, peso: 0 }]
    },
    {
        nombre: "Giro Ruso",
        descripcion: "Trabaja los oblicuos.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Abs",
        ejercicios: [{ nombre: "Giro Ruso", series: 3, repeticiones: 15, peso: 0 }]
    },
    {
        nombre: "Bicicleta",
        descripcion: "Ejercicio dinámico para abdominales.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Abs",
        ejercicios: [{ nombre: "Bicicleta", series: 3, repeticiones: 20, peso: 0 }]
    },
    {
        nombre: "Dragon Flags",
        descripcion: "Ejercicio avanzado para el abdomen.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        categoria: "Abs",
        ejercicios: [{ nombre: "Dragon Flags", series: 3, repeticiones: 8, peso: 0 }]
    },
    {
        nombre: "Ab Wheel Rollouts",
        descripcion: "Ejercicio con rueda para el abdomen.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        categoria: "Abs",
        ejercicios: [{ nombre: "Ab Wheel", series: 3, repeticiones: 10, peso: 0 }]
    },
    {
        nombre: "Crunches Inclinados",
        descripcion: "Aumenta la dificultad de los crunches.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Abs",
        ejercicios: [{ nombre: "Crunches Inclinados", series: 3, repeticiones: 15, peso: 0 }]
    },
    {
        nombre: "Plancha Lateral",
        descripcion: "Trabaja los oblicuos con un ejercicio isométrico.",
        objetivo: "Definir",
        nivelExperiencia: "Intermedio",
        categoria: "Abs",
        ejercicios: [{ nombre: "Plancha Lateral", series: 3, repeticiones: 30, peso: 0 }]
    },
    {
        nombre: "Elevaciones de Piernas Colgando",
        descripcion: "Ejercicio avanzado para la parte inferior del abdomen.",
        objetivo: "Definir",
        nivelExperiencia: "Avanzado",
        categoria: "Abs",
        ejercicios: [{ nombre: "Elevaciones Colgando", series: 3, repeticiones: 12, peso: 0 }]
    },

    // Rutinas para Full Body
    {
        nombre: "Full Body Inicial",
        descripcion: "Rutina básica para todo el cuerpo.",
        objetivo: "Mantener",
        nivelExperiencia: "Principiante",
        categoria: "Full Body",
        ejercicios: [
            { nombre: "Sentadillas", series: 3, repeticiones: 10, peso: 30 },
            { nombre: "Press de Banca", series: 3, repeticiones: 10, peso: 20 },
            { nombre: "Remo con Mancuernas", series: 3, repeticiones: 10, peso: 15 },
            { nombre: "Press Militar", series: 3, repeticiones: 10, peso: 20 },
        ]
    },
    {
        nombre: "Circuito Full Body",
        descripcion: "Circuito de ejercicios para todo el cuerpo.",
        objetivo: "Perder peso",
        nivelExperiencia: "Principiante",
        categoria: "Full Body",
        ejercicios: [
            { nombre: "Burpees", series: 3, repeticiones: 10, peso: 0 },
            { nombre: "Flexiones", series: 3, repeticiones: 10, peso: 0 },
            { nombre: "Zancadas", series: 3, repeticiones: 10, peso: 10 },
            { nombre: "Saltos de Tijera", series: 3, repeticiones: 15, peso: 0 },
        ]
    },
    {
        nombre: "Full Body Intermedio",
        descripcion: "Rutina de intensidad media para todo el cuerpo.",
        objetivo: "Mantener",
        nivelExperiencia: "Intermedio",
        categoria: "Full Body",
        ejercicios: [
            { nombre: "Sentadillas Frontales", series: 3, repeticiones: 8, peso: 60 },
            { nombre: "Press de Banca Inclinado", series: 3, repeticiones: 8, peso: 40 },
            { nombre: "Remo con Barra T", series: 3, repeticiones: 8, peso: 50 },
            { nombre: "Press Arnold", series: 3, repeticiones: 8, peso: 30 },
        ]
    },
    {
        nombre: "HIIT Full Body",
        descripcion: "Entrenamiento HIIT para todo el cuerpo.",
        objetivo: "Perder peso",
        nivelExperiencia: "Intermedio",
        categoria: "Full Body",
        ejercicios: [
            { nombre: "Saltos con Cuerda", series: 4, repeticiones: 15, peso: 0 },
            { nombre: "Mountain Climbers", series: 4, repeticiones: 20, peso: 0 },
            { nombre: "Dominadas", series: 4, repeticiones: 6, peso: 0 },
            { nombre: "Fondos en Paralelas", series: 4, repeticiones: 8, peso: 0 },
        ]
    },
    {
        nombre: "Full Body Avanzado",
        descripcion: "Rutina de alta intensidad para todo el cuerpo.",
        objetivo: "Mantener",
        nivelExperiencia: "Avanzado",
        categoria: "Full Body",
        ejercicios: [
            { nombre: "Sentadillas Zercher", series: 4, repeticiones: 6, peso: 80 },
            { nombre: "Press de Banca con Pausa", series: 4, repeticiones: 5, peso: 60 },
            { nombre: "Remo Pendlay", series: 4, repeticiones: 5, peso: 70 },
            { nombre: "Press Militar con Push Press", series: 4, repeticiones: 5, peso: 50 },
        ]
    },
    {
        nombre: "Circuito Avanzado Full Body",
        descripcion: "Circuito avanzado para quemar calorías y ganar fuerza.",
        objetivo: "Perder peso",
        nivelExperiencia: "Avanzado",
        categoria: "Full Body",
        ejercicios: [
            { nombre: "Burpees con Flexiones", series: 5, repeticiones: 12, peso: 0 },
            { nombre: "Saltos de Caja", series: 5, repeticiones: 12, peso: 0 },
            { nombre: "Dominadas con Lastre", series: 5, repeticiones: 3, peso: 10 },
            { nombre: "Fondos con Lastre", series: 5, repeticiones: 3, peso: 10 },
        ]
    },
    {
        nombre: "Full Body con Enfoque en Fuerza",
        descripcion: "Rutina que trabaja fuerza en todo el cuerpo",
        objetivo: "Ganar peso",
        nivelExperiencia: "Intermedio",
        categoria: "Full Body",
        ejercicios: [
            { nombre: "Sentadillas", series: 4, repeticiones: 8, peso: 70 },
            { nombre: "Press de Banca", series: 4, repeticiones: 8, peso: 60 },
            { nombre: "Remo con Barra", series: 4, repeticiones: 8, peso: 65 },
            { nombre: "Press Militar", series: 4, repeticiones: 8, peso: 55 },
        ]
    },
    {
        nombre: "Full Body para Principiantes Activo",
        descripcion: "Rutina para principiantes para mantenerse activo y saludable",
        objetivo: "Mantener",
        nivelExperiencia: "Principiante",
        categoria: "Full Body",
        ejercicios: [
          { nombre: "Caminadora", series: 2, repeticiones: 20, peso: 0 },
          { nombre: "Elíptica", series: 2, repeticiones: 20, peso: 0 },
          { nombre: "Plancha", series: 2, repeticiones: 45, peso: 0 },
          { nombre: "Natación", series: 2, repeticiones: 15, peso: 0 },
        ],
      },
      {
        nombre: "Rutina Quema Grasa Full Body",
        descripcion: "Rutina diseñada para maximizar la quema de grasa",
        objetivo: "Perder peso",
        nivelExperiencia: "Intermedio",
        categoria: "Full Body",
        ejercicios: [
          { nombre: "Burpees", series: 3, repeticiones: 12, peso: 0 },
          { nombre: "Sentadillas con Salto", series: 3, repeticiones: 10, peso: 0 },
          { nombre: "Flexiones con Palmada", series: 3, repeticiones: 8, peso: 0 },
          { nombre: "Mountain Climbers", series: 3, repeticiones: 20, peso: 0 },
        ],
      },
      {
        nombre: "Rutina de Acondicionamiento Full Body",
        descripcion:
          "Rutina avanzada para mejorar la fuerza y el acondicionamiento físico general",
        objetivo: "Mantener",
        nivelExperiencia: "Avanzado",
        categoria: "Full Body",
        ejercicios: [
          { nombre: "Peso Muerto Sumo", series: 4, repeticiones: 3, peso: 110 },
          { nombre: "Dominadas con Lastre", series: 4, repeticiones: 3, peso: 25 },
          { nombre: "Fondos con Lastre", series: 4, repeticiones: 3, peso: 25 },
          { nombre: "Press Militar con Push Press", series: 4, repeticiones: 5, peso: 65 },
        ],
      },
]);
