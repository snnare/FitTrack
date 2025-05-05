import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSearchParams } from 'expo-router';

interface Props {}

const LogDetailScreen: React.FC<Props> = () => {
  const { log: logString } = useSearchParams<{ log?: string }>();

  const log = logString ? JSON.parse(logString) : null;

  if (!log) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se encontraron detalles del entrenamiento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{log.ejercicio}</Text>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Series:</Text>
        <Text style={styles.value}>{log.series}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Repeticiones:</Text>
        <Text style={styles.value}>{log.repeticiones}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.value}>{log.peso} kg</Text>
      </View>
      {log.notas && (
        <View style={styles.detailItem}>
          <Text style={styles.label}>Notas:</Text>
          <Text style={styles.value}>{log.notas}</Text>
        </View>
      )}
      <View style={styles.detailItem}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>{log.createdAt?.split('T')[0] || 'No disponible'}</Text>
      </View>
      {/* Puedes agregar más detalles aquí */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#86efac',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#d1d5db',
    width: 100,
  },
  value: {
    color: '#9ca3af',
    flex: 1,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LogDetailScreen;