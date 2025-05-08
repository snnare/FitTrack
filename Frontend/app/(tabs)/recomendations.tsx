import React, { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import WorkoutRoutinesForLevel from "../../components/workouts/WorkoutRoutinesForLevel";
import WorkoutDescription from "../screens/[id]"

export default function recomendationScreen() {
  const router = useRouter();
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const title = "Rutinas para ti";

  const handleWorkoutSelect = (workoutId: string) => {
    setSelectedWorkoutId(workoutId);
  };

  // Función para volver a la lista de rutinas
  const handleBackToList = () => {
    setSelectedWorkoutId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {selectedWorkoutId ? (
        <WorkoutDescription id={selectedWorkoutId} onBack={handleBackToList} /> // Pasa el ID como prop
      ) : (
        <WorkoutRoutinesForLevel onWorkoutSelect={handleWorkoutSelect} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#d1d5db',
  },
});
