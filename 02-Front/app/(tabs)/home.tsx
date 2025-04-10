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
      <BarChart
        style={styles.chart}
        data={data}
        width={350} // Ancho de la gráfica
        height={220} // Alto de la gráfica
        yAxisLabel="" // Etiqueta del eje Y
        chartConfig={{
          backgroundColor: '#f0fdf4',
          backgroundGradientFrom: '#d1fae5',
          backgroundGradientTo: '#d1fae5',
          decimalPlaces: 0, // No decimales
          color: (opacity = 1) => `rgba(22, 101, 52, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(20, 83, 45, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        fromZero={true} // Desde cero en el eje Y
      />
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
    backgroundColor: '#f0fdf4',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#166534',
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center'
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
  logItem: {
    backgroundColor: '#dcfce7',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14532d',
  },
  logDetail: {
    fontSize: 14,
    color: '#374151',
  },
  logDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});
