db = db.getSiblingDB('fittrack'); // crea o usa 'fittrack' database

db.createUser({
  user: 'fittrack_user',
  pwd: 'claveSegura123',
  roles: [{ role: 'readWrite', db: 'fittrack' }]
});

db.rutinapredefinidas.insertMany([
  {
    nombre: "Rutina Full Body 3x Semana",
    descripcion: "Entrenamiento de cuerpo completo 3 veces por semana para principiantes.",
    objetivo: "Ganar peso",
    nivel: "Principiante",
    ejercicios: [
      { nombre: "Sentadilla", series: 3, repeticiones: 10, descanso: 60, dia: "Lunes" },
      { nombre: "Press banca", series: 3, repeticiones: 10, descanso: 60, dia: "Lunes" },
      { nombre: "Peso muerto", series: 3, repeticiones: 10, descanso: 60, dia: "Miércoles" }
    ]
  },
  {
    nombre: "Push Pull Legs",
    descripcion: "División de empuje, tracción y piernas para intermedios.",
    objetivo: "Ganar peso",
    nivel: "Intermedio",
    ejercicios: [
      { nombre: "Press militar", series: 4, repeticiones: 8, descanso: 90, dia: "Lunes" },
      { nombre: "Remo con barra", series: 4, repeticiones: 10, descanso: 90, dia: "Miércoles" },
      { nombre: "Prensa de pierna", series: 4, repeticiones: 12, descanso: 90, dia: "Viernes" }
    ]
  },
  {
    nombre: "Quema Grasa Full Body",
    descripcion: "Circuito de cuerpo completo para perder grasa.",
    objetivo: "Perder peso",
    nivel: "Principiante",
    ejercicios: [
      { nombre: "Jumping Jacks", series: 3, repeticiones: 30, descanso: 30, dia: "Lunes" },
      { nombre: "Burpees", series: 3, repeticiones: 15, descanso: 30, dia: "Miércoles" }
    ]
  },
  {
    nombre: "Hipertrofia Avanzada",
    descripcion: "Rutina para volumen muscular.",
    objetivo: "Ganar peso",
    nivel: "Avanzado",
    ejercicios: [
      { nombre: "Press banca inclinado", series: 5, repeticiones: 8, descanso: 90, dia: "Lunes" },
      { nombre: "Curl bíceps", series: 5, repeticiones: 10, descanso: 60, dia: "Martes" }
    ]
  },
  {
    nombre: "Full Body con Peso Corporal",
    descripcion: "Entrenamiento sin equipo para mantenerse en forma.",
    objetivo: "Mantenerse",
    nivel: "Principiante",
    ejercicios: [
      { nombre: "Flexiones", series: 4, repeticiones: 15, descanso: 30, dia: "Lunes" },
      { nombre: "Sentadillas libres", series: 4, repeticiones: 20, descanso: 30, dia: "Miércoles" }
    ]
  },
  {
    nombre: "Fuerza 5x5",
    descripcion: "Programa clásico de fuerza.",
    objetivo: "Ganar peso",
    nivel: "Intermedio",
    ejercicios: [
      { nombre: "Peso muerto", series: 5, repeticiones: 5, descanso: 120, dia: "Lunes" },
      { nombre: "Press banca", series: 5, repeticiones: 5, descanso: 120, dia: "Miércoles" },
      { nombre: "Sentadilla", series: 5, repeticiones: 5, descanso: 120, dia: "Viernes" }
    ]
  },
  {
    nombre: "Circuito HIIT",
    descripcion: "Entrenamiento de intervalos para quemar grasa.",
    objetivo: "Perder peso",
    nivel: "Intermedio",
    ejercicios: [
      { nombre: "Mountain Climbers", series: 4, repeticiones: 20, descanso: 20, dia: "Martes" },
      { nombre: "Burpees", series: 4, repeticiones: 15, descanso: 20, dia: "Jueves" }
    ]
  },
  {
    nombre: "División Pecho/Espalda",
    descripcion: "Rutina clásica dividida para volumen.",
    objetivo: "Ganar peso",
    nivel: "Intermedio",
    ejercicios: [
      { nombre: "Press banca", series: 4, repeticiones: 10, descanso: 90, dia: "Lunes" },
      { nombre: "Remo con mancuernas", series: 4, repeticiones: 10, descanso: 90, dia: "Martes" }
    ]
  },
  {
    nombre: "Entrenamiento Funcional",
    descripcion: "Movimientos compuestos y equilibrio.",
    objetivo: "Mantenerse",
    nivel: "Intermedio",
    ejercicios: [
      { nombre: "Kettlebell swings", series: 3, repeticiones: 15, descanso: 60, dia: "Lunes" },
      { nombre: "Zancadas", series: 3, repeticiones: 20, descanso: 60, dia: "Miércoles" }
    ]
  },
  {
    nombre: "Piernas y Glúteos",
    descripcion: "Rutina para tren inferior.",
    objetivo: "Ganar peso",
    nivel: "Principiante",
    ejercicios: [
      { nombre: "Sentadilla", series: 3, repeticiones: 12, descanso: 60, dia: "Martes" },
      { nombre: "Puente de glúteos", series: 3, repeticiones: 15, descanso: 60, dia: "Jueves" }
    ]
  },
  {
    nombre: "Espalda y Bíceps",
    descripcion: "Rutina dividida para hipertrofia.",
    objetivo: "Ganar peso",
    nivel: "Avanzado",
    ejercicios: [
      { nombre: "Dominadas", series: 4, repeticiones: 8, descanso: 90, dia: "Martes" },
      { nombre: "Curl bíceps barra", series: 4, repeticiones: 10, descanso: 90, dia: "Jueves" }
    ]
  },
  {
    nombre: "Abdomen Diario",
    descripcion: "Rutina corta diaria para fortalecer el core.",
    objetivo: "Mantenerse",
    nivel: "Principiante",
    ejercicios: [
      { nombre: "Crunches", series: 3, repeticiones: 20, descanso: 30, dia: "Lunes" },
      { nombre: "Plancha", series: 3, repeticiones: 60, descanso: 30, dia: "Miércoles" }
    ]
  },
  {
    nombre: "Entrenamiento con Bandas",
    descripcion: "Usa bandas elásticas para todo el cuerpo.",
    objetivo: "Perder peso",
    nivel: "Principiante",
    ejercicios: [
      { nombre: "Press con banda", series: 3, repeticiones: 15, descanso: 60, dia: "Lunes" },
      { nombre: "Sentadilla con banda", series: 3, repeticiones: 15, descanso: 60, dia: "Miércoles" }
    ]
  },
  {
    nombre: "Cardio y Pesas",
    descripcion: "Mezcla para quema de grasa y tonificación.",
    objetivo: "Perder peso",
    nivel: "Intermedio",
    ejercicios: [
      { nombre: "Trote", series: 1, repeticiones: 20, descanso: 0, dia: "Lunes" },
      { nombre: "Peso muerto rumano", series: 3, repeticiones: 12, descanso: 60, dia: "Martes" }
    ]
  }
]);
