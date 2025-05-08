import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getRutinas } from '../../app/services/rutina';

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

interface WorkoutRoutinesForLevelProps {
  onWorkoutSelect: (workoutId: string) => void;
}

const WorkoutRoutinesForLevel: React.FC<WorkoutRoutinesForLevelProps> = ({ onWorkoutSelect }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories: string[] = ["Pecho", "Espalda", "Piernas", "Glúteos", "Brazos", "Hombro", "Abs", "Full Body"];

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

  const filteredWorkouts = selectedCategory
    ? workouts.filter(workout => workout.categoria === selectedCategory)
    : workouts;

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Todas las categorías" value={null} />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workoutCard}
            onPress={() => onWorkoutSelect(item.id)}
          >
            <Text style={styles.workoutName}>{item.nombre}</Text>
            <Text style={styles.workoutDescription}>{item.descripcion}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    backgroundColor: '#1f2937',
    marginBottom: 20,
    color: '#d1d5db',
    paddingHorizontal: 0,
  },
  picker: {
    color: '#d1d5db',
    height: 50,
    width: '100%',
  },
});

export default WorkoutRoutinesForLevel;
