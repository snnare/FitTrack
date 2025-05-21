import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getRutinas } from '../../app/services/rutina';
import { Rutina } from '../../app/types/rutinas';

interface WorkoutRoutinesForLevelProps {
  onWorkoutSelect: (workoutId: string) => void;
}

const WorkoutRoutinesForLevel: React.FC<WorkoutRoutinesForLevelProps> = ({ onWorkoutSelect }) => {
  const [workouts, setWorkouts] = useState<Rutina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<Rutina['categoria'] | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Rutina['nivelExperiencia'] | null>(null);
  const [selectedObjective, setSelectedObjective] = useState<Rutina['objetivo'] | null>(null);

  const categories: Rutina['categoria'][] = ["Pecho", "Espalda", "Piernas", "Glúteos", "Brazos", "Hombro", "Abs", "Full Body"];
  const levels: Rutina['nivelExperiencia'][] = ["Principiante", "Intermedio", "Avanzado"];
  const objectives: Rutina['objetivo'][] = ["Ganar peso", "Perder peso", "Definir", "Mantener"];

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentObjective: Rutina['objetivo'] = selectedObjective || "Ganar peso";
        const currentLevel: Rutina['nivelExperiencia'] = selectedLevel || "Principiante";

        if (!currentObjective || !currentLevel) {
            setError("Faltan valores para objetivo o nivel de experiencia.");
            setLoading(false);
            return;
        }

        const params = {
          objetivo: currentObjective,
          nivelExperiencia: currentLevel,
          ...(selectedCategory && { categoria: selectedCategory })
        };

        const fetchedRutinas = await getRutinas(params);
        console.log(fetchedRutinas);
        setWorkouts(fetchedRutinas);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Error al cargar las rutinas.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [selectedCategory, selectedLevel, selectedObjective]);

  const displayWorkouts = workouts;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Cargando rutinas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => {}}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Explorar Rutinas</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue: Rutina['categoria'] | null) => setSelectedCategory(itemValue)}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Todas las categorías" value={null} />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLevel}
          style={styles.picker}
          onValueChange={(itemValue: Rutina['nivelExperiencia'] | null) => setSelectedLevel(itemValue)}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Todos los niveles" value={null} />
          {levels.map((level) => (
            <Picker.Item key={level} label={level} value={level} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedObjective}
          style={styles.picker}
          onValueChange={(itemValue: Rutina['objetivo'] | null) => setSelectedObjective(itemValue)}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Todos los objetivos" value={null} />
          {objectives.map((objective) => (
            <Picker.Item key={objective} label={objective} value={objective} />
          ))}
        </Picker>
      </View>

      {displayWorkouts.length === 0 ? (
        <View style={styles.noWorkoutsContainer}>
          <Text style={styles.noWorkoutsText}>No hay rutinas disponibles para los filtros seleccionados.</Text>
        </View>
      ) : (
        <FlatList
          data={displayWorkouts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.workoutCard}
              onPress={() => onWorkoutSelect(item._id)}
            >
              <Text style={styles.workoutName}>{item.nombre}</Text>
              <Text style={styles.workoutDescription}>{item.descripcion}</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.workoutDetail}>Categoría: {item.categoria}</Text>
                <Text style={styles.workoutDetail}>Nivel: {item.nivelExperiencia}</Text>
              </View>
              <Text style={styles.workoutDetail}>Objetivo: {item.objetivo}</Text>
            </TouchableOpacity>
          )}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#86efac',
    marginBottom: 25,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  loadingText: {
    fontSize: 16,
    color: '#d1d5db',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noWorkoutsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noWorkoutsText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  workoutCard: {
    backgroundColor: '#1f2937',
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#86efac',
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 15,
    color: '#d1d5db',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  workoutDetail: {
    fontSize: 13,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 10,
    backgroundColor: '#1f2937',
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    color: '#d1d5db',
    height: 50,
    width: '100%',
  },
  pickerItem: {
    color: '#d1d5db',
  }
});

export default WorkoutRoutinesForLevel;