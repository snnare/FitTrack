import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native'; 
import { MaterialIcons } from '@expo/vector-icons'; 

import UserStreak from '../../components/user/UserStreak';
import WorkoutLogList from '../../components/workouts/WorkoutLogList';
import LoadingIndicator from '../../components/feedback/LoadingIndicator';
import { getAllLogs } from '../services/log';
import { getStreak } from '../services/streak';

export default function HomeScreen() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [streak, setStreak] = useState<number | null>(null);


 const fetchLogsAndStreak = async () => { 
    setLoading(true);
    setError(null);
    try {
      const logsData = await getAllLogs();
      const streakData = await getStreak();
      setLogs(logsData.data || []);
      setStreak(streakData.currentStreak || 0);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogsAndStreak();
  }, []);


  const handleReload = () => {
    fetchLogsAndStreak();
  };

  if (loading) {
    return (
      <LoadingIndicator message="Cargando..." />
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error al cargar los logs: {error}</Text>
        <TouchableOpacity style={styles.errorButton} onPress={handleReload}>
          <MaterialIcons name="refresh" size={24} color="#fff" />
          <Text style={styles.errorButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserStreak streak={streak} />
      <Text style={styles.subtitle}>Últimos Entrenamientos</Text>
      <WorkoutLogList logs={logs} />
      <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
        <MaterialIcons name="refresh" size={24} color="#fff" />
        <Text style={styles.reloadButtonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#bbf7d0',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#d1d5db',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  loading: {
    color: '#d1d5db',
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 20,
  },
  errorButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 8,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
});
