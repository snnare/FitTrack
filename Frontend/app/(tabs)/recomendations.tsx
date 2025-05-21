import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import WorkoutRoutinesForLevel from "../../components/workouts/WorkoutRoutinesForLevel";

export default function RecomendationScreen() {
  const title = "Explora Rutinas";

  return (
    <View style={styles.container}>
      <WorkoutRoutinesForLevel
        onWorkoutSelect={(workoutId) => console.log('Rutina seleccionada desde RecomendationScreen (sin navegación):', workoutId)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#86efac',
  },
});