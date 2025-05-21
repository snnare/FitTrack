import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getProfileUser } from '../services/users';
import { getAllUserMetricas } from '../services/metrica';
import { Metrica } from '../types/metricas';
import FatPercentageChart from '../../components/graphics/FatPercentageChart';
import WeightChart from '../../components/graphics/WeightChart';

import BrazoChart from '../../components/graphics/BrazoChart';
import CaderaChart from '../../components/graphics/CaderaChart';
import CinturaChart from '../../components/graphics/CinturaChart';
import MusloChart from '../../components/graphics/MusloChart';
import PantorrillaChart from '../../components/graphics/PantorrilaChart';
import PechoChart from '../../components/graphics/PechoChart';


const ProgressScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allMetrics, setAllMetrics] = useState<Metrica[]>([]);
  const [userGender, setUserGender] = useState<string | null>(null);
  const router = useRouter();

  const fetchAllMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUserMetricas();
      const userData = await getProfileUser();
      setUserGender(userData?.genero || null);
      setAllMetrics(data.data);
    } catch (err: any) {
      console.error("Error fetching all metrics:", err);
      setError(err.message || 'Error al cargar las métricas.');
      Alert.alert('Error', err.message || 'No se pudieron cargar las métricas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllMetrics();
    }, [fetchAllMetrics])
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Cargando progreso...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchAllMetrics}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Progreso</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FatPercentageChart metrics={allMetrics} />
        <WeightChart metrics={allMetrics} />
        {userGender == 'Masculino' && (
          <>
            <BrazoChart metrics={allMetrics}/>
            <PechoChart metrics={allMetrics}/>
            <PantorrillaChart metrics={allMetrics}/>
          </>
          
        )}
        {userGender === 'Femenino' && (
          <>
            <CaderaChart metrics={allMetrics} />
            <MusloChart metrics={allMetrics}/>
            <CinturaChart metrics={allMetrics}/>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  scrollViewContent: {
    paddingBottom: 20, // Añade padding al final del ScrollView para que el último elemento no quede pegado al borde
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  loadingText: {
    color: '#d1d5db',
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#86efac',
  },
});

export default ProgressScreen;