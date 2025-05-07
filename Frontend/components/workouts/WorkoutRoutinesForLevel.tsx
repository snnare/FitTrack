import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de que estás usando @react-native-picker/picker
import { getRutinas } from '../../app/services/rutina'; // Importamos la función getRutinas

interface Workout {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  // nivelExperiencia: 'Principiante' | 'Intermedio' | 'Avanzado'; // Ya no necesitamos esto
}

const WorkoutRoutinesForLevel: React.FC = () => { // Eliminamos la prop nivelExperiencia
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories: string[] = ["Pecho", "Espalda", "Piernas", "Glúteos", "Brazos", "Hombro", "Abs", "Full Body"]; //Lista de las categorias

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
      <FlatList // Usamos FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item._id} // Corregido: Usar item.id o item._id
        renderItem={({ item }) => (
          <View style={styles.workoutCard}>
            <Text style={styles.workoutName}>{item.nombre}</Text>
            <Text style={styles.workoutDescription}>{item.descripcion}</Text>
            {/* Muestra otros detalles de la rutina */}
          </View>
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
        backgroundColor: '#1f2937', // Color de fondo de la tab
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#4b5563', // Color del borde de la tab
    },
    workoutName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // Color del texto activo de la tab
        marginBottom: 8,
    },
    workoutDescription: {
        fontSize: 16,
        color: '#d1d5db', // Color del texto inactivo de la tab
    },
  pickerContainer: { // Agregado para el contenedor del Picker
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    backgroundColor: '#1f2937',
    marginBottom: 20,
    color: '#d1d5db',
    paddingHorizontal: 0, // Ajusta el padding según sea necesario
  },
  picker: {
    color: '#d1d5db',
    height: 50, // Asegura que el Picker tenga una altura definida
    width: '100%',
  },
});

export default WorkoutRoutinesForLevel;

