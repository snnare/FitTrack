import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


import CheckProfileCompletion from '../../components/CheckProfileCompletion';
import StreakDisplay from '../../components/streakDisplay'; // Asegúrate de que esta ruta sea correcta 
import Welcome from '../../components/Welcome';
import WorkoutLogList from '../../components/WorkoutLogList';

import { getAllLogs } from '../services/log'; // Importa getAllLogs aquí también si quieres mostrar la lista


export default function HomeScreen() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchLogs = async () => {
          setLoading(true);
          setError(null);
          try {
              const data = await getAllLogs();
              setLogs(data.data || []);
          } catch (err: any) {
              setError(err.message || 'Error al cargar los logs');
          } finally {
              setLoading(false);
          }
      };

      fetchLogs();
  }, []);

  if (loading) {
      return <View style={styles.container}><Text style={styles.loading}>Cargando...</Text></View>;
  }

  if (error) {
      return <View style={styles.container}><Text style={styles.error}>Error al cargar los logs: {error}</Text></View>;
  }

  return (
      <View style={styles.container}>
          <StreakDisplay/>
          <Welcome  />
        
          <Text style={styles.subtitle}>Últimos Entrenamientos</Text>
          <WorkoutLogList logs={logs} />
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
});