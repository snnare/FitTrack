import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

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
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Logs de Ejercicio</Text>
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
