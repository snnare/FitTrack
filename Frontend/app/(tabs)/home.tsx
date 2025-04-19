import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export default function HomeScreen() {
  const [logs, setLogs] = useState([
    {
      id: '1',
      fecha: '2025-04-08',
      ejercicio: 'Press de banca',
      series: 4,
      repeticiones: 10,
      peso: 60,
    },
    {
      id: '2',
      fecha: '2025-04-07',
      ejercicio: 'Sentadillas',
      series: 3,
      repeticiones: 12,
      peso: 80,
    },
    {
      id: '3',
      fecha: '2025-04-06',
      ejercicio: 'Pull-up',
      series: 3,
      repeticiones: 8,
      peso: 70,
    },
  ]);

  // Contar los días de entrenamiento
  const uniqueDates = Array.from(new Set(logs.map(log => log.fecha)));
  const workoutDays = uniqueDates.length;

  // Datos para la gráfica
  const data = {
    labels: ['Días Entrenados'], // Etiquetas de las barras
    datasets: [
      {
        data: [workoutDays], // Número de días entrenados
        color: (opacity = 1) => `rgba(22, 101, 52, ${opacity})`, // Color de las barras
        strokeWidth: 2, // Grosor de la barra
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido ANGEL</Text>
      
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.logTitle}>{item.ejercicio}</Text>
            <Text style={styles.logDetail}>
              {item.series}x{item.repeticiones} - {item.peso} kg
            </Text>
            <Text style={styles.logDate}>{item.fecha}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // fondo oscuro
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#bbf7d0', // verde claro
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
  logItem: {
    backgroundColor: '#1f2937', // un gris oscuro
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#86efac', // verde brillante
  },
  logDetail: {
    fontSize: 14,
    color: '#d1d5db', // gris claro
  },
  logDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});