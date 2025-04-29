// components/workouts/WorkoutRoutinesForLevel.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../app/context/authContext'; //Importamos el contexto de autenticacion

interface Workout {
  id: string;
  nombre: string;
  descripcion: string;
  nivelExperiencia: 'Principiante' | 'Intermedio' | 'Avanzado';
  // Agrega aquí otros campos de tu modelo de rutina
}

interface WorkoutRoutinesForLevelProps {
    nivelExperiencia: 'Principiante' | 'Intermedio' | 'Avanzado';
}
const WorkoutRoutinesForLevel: React.FC<WorkoutRoutinesForLevelProps> = ({nivelExperiencia}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authState } = useAuth(); // Usamos el contexto para obtener el estado de autenticación

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);
      try {

      } catch (err: any) {
        setError(err.message || 'Error al cargar las rutinas.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [nivelExperiencia]);

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
        <Text style={styles.noWorkoutsText}>No hay rutinas disponibles para este nivel.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {workouts.map((workout) => (
        <View key={workout.id} style={styles.workoutCard}>
          <Text style={styles.workoutName}>{workout.nombre}</Text>
          <Text style={styles.workoutDescription}>{workout.descripcion}</Text>
          {/* Muestra otros detalles de la rutina */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
