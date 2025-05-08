import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { getRutinaById } from '../../app/services/rutina';

interface Workout {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  ejercicios: {
    nombre: string;
    series: number;
    repeticiones: number;
    peso?: number;
    notas?: string;
  }[];
}

interface WorkoutDescriptionProps {
  id: string;
  onBack?: () => void;
}

const WorkoutDescription: React.FC<WorkoutDescriptionProps> = ({ id, onBack }) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: Workout = await getRutinaById(id);
        setWorkout(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los detalles de la rutina.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando detalles de la rutina...</Text>
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

  if (!workout) {
    return (
      <View style={styles.noWorkoutContainer}>
        <Text style={styles.noWorkoutText}>Rutina no encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {onBack && (
        <Button title="Volver a la lista" onPress={onBack} /> // Botón para volver
      )}
      <Text style={styles.title}>{workout.nombre}</Text>
      <Text style={styles.descriptionLabel}>Descripción:</Text>
      <Text style={styles.description}>{workout.descripcion}</Text>

      <Text style={styles.exercisesLabel}>Ejercicios:</Text>
      {workout.ejercicios.map((ejercicio, index) => (
        <View key={index} style={styles.exerciseCard}>
          <Text style={styles.exerciseName}>{ejercicio.nombre}</Text>
          <Text style={styles.exerciseDetails}>Series: {ejercicio.series}</Text>
          <Text style={styles.exerciseDetails}>Repeticiones: {ejercicio.repeticiones}</Text>
          {ejercicio.peso && <Text style={styles.exerciseDetails}>Peso: {ejercicio.peso} kg</Text>}
          {ejercicio.notas && <Text style={styles.exerciseDetails}>Notas: {ejercicio.notas}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111827',
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
  noWorkoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWorkoutText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d1d5db',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 20,
    lineHeight: 24,
  },
  exercisesLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d1d5db',
    marginBottom: 10,
  },
  exerciseCard: {
    backgroundColor: '#1f2937',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 3,
  },
});

export default WorkoutDescription;
