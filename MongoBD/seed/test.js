db.users.insert({
    nombre: "Ángel",
    apellidos: "Pérez",
    correo: "angel@gmail.com",
    password: "1234567890",
    fechaNacimiento: new Date("1990-05-15"),
    genero: "Masculino",
    peso: 75,
    estatura: 1.78,
    objetivo: "Definir",
    nivelExperiencia: "Intermedio"
  });
  


  
  // Inserción de registros de entrenamiento (logs) para el usuario 'angel@gmail.com' en la colección 'logs'
  db.logs.insertMany([
      // Semana 1
      {
        userId: "angel@gmail.com",
        ejercicio: "Press de banca",
        series: 4,
        repeticiones: 10,
        peso: 60,
        notas: "Buen control en todas las series",
        createdAt: new Date("2024-05-01")
      },
      {
        userId: "angel@gmail.com",
        ejercicio: "Sentadillas",
        series: 4,
        repeticiones: 12,
        peso: 70,
        notas: "Última serie con apoyo",
        createdAt: new Date("2024-05-03")
      },
      {
        userId: "angel@gmail.com",
        ejercicio: "Dominadas",
        series: 3,
        repeticiones: 8,
        peso: 0,
        notas: "Primera vez sin asistencia",
        createdAt: new Date("2024-05-05")
      },
  
      // Semana 2 (Progreso)
      {
        userId: "angel@gmail.com",
        ejercicio: "Press de banca",
        series: 4,
        repeticiones: 10,
        peso: 62.5,
        notas: "Aumento de peso exitoso",
        createdAt: new Date("2024-05-08")
      },
      {
        userId: "angel@gmail.com",
        ejercicio: "Peso muerto",
        series: 3,
        repeticiones: 8,
        peso: 90,
        notas: "Enfoque en técnica",
        createdAt: new Date("2024-05-10")
      },
      {
        userId: "angel@gmail.com",
        ejercicio: "Fondos en paralelas",
        series: 3,
        repeticiones: 10,
        peso: 5,
        notas: "Lastre de 5kg agregado",
        createdAt: new Date("2024-05-12")
      },
  
      // Semana 3 (Variación)
      {
        userId: "angel@gmail.com",
        ejercicio: "Press militar",
        series: 4,
        repeticiones: 8,
        peso: 40,
        notas: "Nuevo ejercicio incorporado",
        createdAt: new Date("2024-05-15")
      },
      {
        userId: "angel@gmail.com",
        ejercicio: "Press de banca",
        series: 4,
        repeticiones: 8,
        peso: 65,
        notas: "Menos repeticiones, más peso",
        createdAt: new Date("2024-05-17")
      },
      {
        userId: "angel@gmail.com",
        ejercicio: "Remo con barra",
        series: 4,
        repeticiones: 10,
        peso: 60,
        notas: "Enfoque en retracción escapular",
        createdAt: new Date("2024-05-19")
      },
  
      // Semana 4 (Intensidad)
      {
        userId: "angel@gmail.com",
        ejercicio: "Press de banca",
        series: 5,
        repeticiones: 5,
        peso: 70,
        notas: "Día de fuerza máxima",
        createdAt: new Date("2024-05-22")
      },
      {
        userId: "angel@gmail.com",
        ejercicio: "Sentadillas",
        series: 4,
        repeticiones: 8,
        peso: 80,
        notas: "Profundidad completa",
        createdAt: new Date("2024-05-24")
      },
      {
        userId: "angel@gmail.com",
        ejercicio: "Dominadas",
        series: 4,
        repeticiones: 6,
        peso: 5,
        notas: "Lastre de 5kg - PR",
        createdAt: new Date("2024-05-26")
      },
  
      // Registros adicionales (días 17 al 30)
  {
      userId: "angel@gmail.com",
      ejercicio: "Peso muerto",
      series: 4,
      repeticiones: 6,
      peso: 95,
      notas: "Técnica mejorada, sin dolor lumbar",
      createdAt: new Date("2024-05-07")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Pull-ups",
      series: 4,
      repeticiones: 6,
      peso: 0,
      notas: "Primera vez haciendo 4x6 sin ayuda",
      createdAt: new Date("2024-05-09")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Press militar",
      series: 4,
      repeticiones: 8,
      peso: 42.5,
      notas: "Nuevo PR con buena técnica",
      createdAt: new Date("2024-05-11")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Sentadillas frontales",
      series: 3,
      repeticiones: 8,
      peso: 60,
      notas: "Primer intento con este variante",
      createdAt: new Date("2024-05-14")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Remo con mancuerna",
      series: 4,
      repeticiones: 10,
      peso: 27.5,
      notas: "Mayor control en la fase excéntrica",
      createdAt: new Date("2024-05-16")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Press de banca inclinado",
      series: 4,
      repeticiones: 8,
      peso: 55,
      notas: "Enfoque en pectoral superior",
      createdAt: new Date("2024-05-18")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Zancadas",
      series: 3,
      repeticiones: 12,
      peso: 20,
      notas: "Mancuernas de 10kg cada mano",
      createdAt: new Date("2024-05-20")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Fondos en paralelas",
      series: 4,
      repeticiones: 10,
      peso: 10,
      notas: "Aumento a 10kg de lastre",
      createdAt: new Date("2024-05-21")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Curl martillo",
      series: 3,
      repeticiones: 12,
      peso: 14,
      notas: "Buen pump en brazos",
      createdAt: new Date("2024-05-23")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Peso muerto rumano",
      series: 3,
      repeticiones: 10,
      peso: 80,
      notas: "Excelente conexión mente-músculo",
      createdAt: new Date("2024-05-25")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Press de banca",
      series: 5,
      repeticiones: 5,
      peso: 72.5,
      notas: "Nuevo máximo para 5 repeticiones",
      createdAt: new Date("2024-05-27")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Dominadas",
      series: 4,
      repeticiones: 8,
      peso: 2.5,
      notas: "Día ligero para recuperación",
      createdAt: new Date("2024-05-29")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Sentadillas",
      series: 4,
      repeticiones: 10,
      peso: 75,
      notas: "Último entrenamiento del mes",
      createdAt: new Date("2024-05-31")
  },
  {
      userId: "angel@gmail.com",
      ejercicio: "Push-ups",
      series: 5,
      repeticiones: 20,
      peso: 0,
      notas: "Entrenamiento de mantenimiento en casa",
      createdAt: new Date("2024-05-04")
  }
    ]);
  
  // Inserción de 8 medidas para el usuario 'angel@gmail.com' en la colección 'medidas' a lo largo de dos meses
  db.metricas.insertMany([
    {
      userId: "angel@gmail.com",
      fecha: new Date("2025-03-10"), // Inicio del primer mes
      peso: 75.5,
      altura: 1.78,
      cintura: 85,
      cadera: 98,
      pecho: 102,
      muslo: 58,
      pantorrilla: 38,
      brazoRelajado: 32,
      brazoFlexionado: 34,
      porcentajeGrasaCorporal: 22,
      notas: "Medida inicial"
    },
    {
      userId: "angel@gmail.com",
      fecha: new Date("2025-03-25"),
      peso: 74.8,
      altura: 1.78,
      cintura: 84,
      cadera: 97.5,
      pecho: 101.5,
      muslo: 57.5,
      pantorrilla: 37.8,
      brazoRelajado: 31.8,
      brazoFlexionado: 33.8,
      porcentajeGrasaCorporal: 21.5,
      notas: "Ligera disminución"
    },
    {
      userId: "angel@gmail.com",
      fecha: new Date("2025-04-05"), // Inicio del segundo mes
      peso: 74.2,
      altura: 1.78,
      cintura: 83.5,
      cadera: 97,
      pecho: 101,
      muslo: 57,
      pantorrilla: 37.5,
      brazoRelajado: 31.5,
      brazoFlexionado: 33.5,
      porcentajeGrasaCorporal: 21,
      notas: "Progreso constante"
    },
    {
      userId: "angel@gmail.com",
      fecha: new Date("2025-04-15"),
      peso: 73.8,
      altura: 1.78,
      cintura: 83,
      cadera: 96.5,
      pecho: 100.5,
      muslo: 56.5,
      pantorrilla: 37.3,
      brazoRelajado: 31.3,
      brazoFlexionado: 33.3,
      porcentajeGrasaCorporal: 20.5,
      notas: "Acercándonos al objetivo"
    },
    {
      userId: "angel@gmail.com",
      fecha: new Date("2025-03-18"),
      peso: 75.1,
      altura: 1.78,
      cintura: 84.5,
      cadera: 97.8,
      pecho: 101.8,
      muslo: 57.8,
      pantorrilla: 38,
      brazoRelajado: 31.9,
      brazoFlexionado: 33.9,
      porcentajeGrasaCorporal: 21.8,
      notas: "Fluctuación normal"
    },
    {
      userId: "angel@gmail.com",
      fecha: new Date("2025-04-22"),
      peso: 73.5,
      altura: 1.78,
      cintura: 82.5,
      cadera: 96,
      pecho: 100,
      muslo: 56,
      pantorrilla: 37,
      brazoRelajado: 31,
      brazoFlexionado: 33,
      porcentajeGrasaCorporal: 20,
      notas: "Buen avance"
    },
    {
      userId: "angel@gmail.com",
      fecha: new Date("2025-03-30"),
      peso: 74.5,
      altura: 1.78,
      cintura: 84.2,
      cadera: 97.3,
      pecho: 101.3,
      muslo: 57.3,
      pantorrilla: 37.9,
      brazoRelajado: 31.7,
      brazoFlexionado: 33.7,
      porcentajeGrasaCorporal: 21.2,
      notas: "Cierre del primer mes"
    },
    {
      userId: "angel@gmail.com",
      fecha: new Date("2025-05-02"), // Cierre del segundo mes
      peso: 73.2,
      altura: 1.78,
      cintura: 82,
      cadera: 95.5,
      pecho: 99.5,
      muslo: 55.5,
      pantorrilla: 36.8,
      brazoRelajado: 30.8,
      brazoFlexionado: 32.8,
      porcentajeGrasaCorporal: 19.5,
      notas: "Objetivo casi alcanzado"
    }
  ]);
  
  // Inserción/actualización de la racha de 30 días para el usuario 'angel@gmail.com' en la colección 'streak'
  db.streaks.updateOne(
    { userId: "angel@gmail.com" },
    { $set: { currentStreak: 30, lastLogDate: new Date("2025-05-10") } },
    { upsert: true }
  );