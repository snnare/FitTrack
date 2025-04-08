import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const user = {
    nombre: 'Juan',
    apellidos: 'Pérez',
    correo: 'juanperez@example.com',
    peso: 75,
    objetivo: 'Definir',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{user.nombre} {user.apellidos}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{user.correo}</Text>

        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.value}>{user.peso} kg</Text>

        <Text style={styles.label}>Objetivo:</Text>
        <Text style={styles.value}>{user.objetivo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#166534',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#dcfce7',
    padding: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    color: '#14532d',
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#374151',
  },
});
