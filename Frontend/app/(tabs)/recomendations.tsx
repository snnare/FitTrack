import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';

import WorkoutRoutinesForLevel from "../../components/workouts/WorkoutRoutinesForLevel";

export default function recomendationScreen(){

    return(
        <View style={styles.container}>
        <Text style={styles.title}>Recomendaciones</Text>
        <WorkoutRoutinesForLevel  />
        </View>
    )
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
  