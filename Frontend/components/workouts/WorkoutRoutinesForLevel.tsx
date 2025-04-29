import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getRutinas } from '../../app/services/rutina'; // Importamos la función getRutinas

interface Workout {
  id: string;
  nombre: string;
  descripcion: string;
  // nivelExperiencia: 'Principiante' | 'Intermedio' | 'Avanzado'; // Ya no necesitamos esto
}

const WorkoutRoutinesForLevel: React.FC = () => { // Eliminamos la prop nivelExperiencia
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);
      try {
        const allWorkouts = await getRutinas();
        setWorkouts(allWorkouts);
      } catch (err: any) {
        setError(err.message || 'Error al cargar las rutinas.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando rutinas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (workouts.length === 0) {
    return (
      <View style={styles.noWorkoutsContainer}>
        <Text style={styles.noWorkoutsText}>No hay rutinas disponibles.</Text>
      </View>
    );
  }

  return (
    <FlatList // Usamos FlatList
      data={workouts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.workoutCard}>
          <Text style={styles.workoutName}>{item.nombre}</Text>
          <Text style={styles.workoutDescription}>{item.descripcion}</Text>
          {/* Muestra otros detalles de la rutina */}
        </View>
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
        flex: 1
      },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#d1d5db',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
  },
  noWorkoutsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWorkoutsText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  workoutCard: {
    backgroundColor: '#1f2937',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 16,
    color: '#d1d5db',
  },
});

export default WorkoutRoutinesForLevel;
