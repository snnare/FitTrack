import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getMetricaForUser } from '../services/metrica';
import { Feather } from '@expo/vector-icons';
import UserPesoAndPorcentajeGrasa from '../../components/graphics/UserPesoAndPorcentajeGrasa'; // Importa el nuevo componente
import { Picker } from '@react-native-picker/picker';

interface Filter {
  mes: number | null;
  anio: number | null;
}

const ProgressScreen = () => {
  const [metricas, setMetricas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Filter>({ mes: null, anio: null });
  const [aniosDisponibles, setAniosDisponibles] = useState<number[]>([]);
  const [mesSeleccionado, setMesSeleccionado] = useState<number | null>(null);
  const [anioSeleccionado, setAnioSeleccionado] = useState<number | null>(null);

  const fetchMetricas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMetricaForUser();
      if (response?.data && Array.isArray(response.data)) {
        setMetricas(response.data);
        const anios = [...new Set(response.data.map(m => new Date(m.fecha).getFullYear()))];
        setAniosDisponibles(anios.sort((a, b) => b - a));
      } else {
        setError('No se pudieron cargar las métricas.');
      }
    } catch (error: any) {
      console.error('Error fetching métricas:', error);
      setError(error?.response?.data?.message || 'Hubo un error al cargar las métricas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetricas();
  }, [fetchMetricas]);

  const handleMesChange = (itemValue: number | null) => {
    setMesSeleccionado(itemValue);
    setFiltro(prev => ({ ...prev, mes: itemValue }));
  };

  const handleAnioChange = (itemValue: number | null) => {
    setAnioSeleccionado(itemValue);
    setFiltro(prev => ({ ...prev, anio: itemValue }));
  };

  const metricasFiltradas = metricas.filter(m => {
    const fecha = new Date(m.fecha);
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return (filtro.mes === null || filtro.mes === mes) && (filtro.anio === null || filtro.anio === anio);
  });

  if (loading) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.loadingContainer}>
        <Text style={styles.noDataText}>Cargando datos...</Text>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.errorContainer}>
        <Text style={styles.noDataText}>{error}</Text>
        <TouchableOpacity style={styles.reloadButton} onPress={fetchMetricas}>
          <Feather name="rotate-cw" size={20} color="#fff" />
          <Text style={styles.reloadButtonText}>Recargar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>Progreso</Text>

      <View style={styles.filterContainer}>
        <Picker
          style={styles.picker}
          selectedValue={mesSeleccionado}
          onValueChange={handleMesChange}
        >
          <Picker.Item label="Todos los Meses" value={null} />
          {Array.from({ length: 12 }, (_, i) => i + 1).map(mes => (
            <Picker.Item key={mes} label={new Date(2000, mes - 1, 1).toLocaleDateString('es-MX', { month: 'long' })} value={mes} />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={anioSeleccionado}
          onValueChange={handleAnioChange}
        >
          <Picker.Item label="Todos los Años" value={null} />
          {aniosDisponibles.map(anio => (
            <Picker.Item key={anio} label={String(anio)} value={anio} />
          ))}
        </Picker>
      </View>

      <UserPesoAndPorcentajeGrasa metricas={metricasFiltradas} />
      {/* Otros componentes de gráficas irían aquí */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 20,
  },
  loadingContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#d1d5db',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  noDataText: {
    color: '#9ca3af',
    textAlign: 'center',
    fontSize: 16,
  },
  reloadButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  reloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    backgroundColor: '#22c55e',
    color: '#d1d5db',
    borderRadius: 8,
    marginHorizontal: 5,
  },
});

export default ProgressScreen;