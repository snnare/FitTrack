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

  // ... (continuar con más inserts hasta completar 30)
  // Ejemplo de cómo continuar:
  {
    userId: "angel@gmail.com",
    ejercicio: "Curl de bíceps",
    series: 3,
    repeticiones: 12,
    peso: 20,
    createdAt: new Date("2024-05-28")
  },
  {
    userId: "angel@gmail.com",
    ejercicio: "Fondos en paralelas",
    series: 4,
    repeticiones: 10,
    peso: 7.5,
    notas: "Aumento de lastre a 7.5kg",
    createdAt: new Date("2024-05-30")
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