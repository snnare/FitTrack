// components/user/UserProfileDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface UserProfileDetailsProps {
  profile: {
    fechaNacimiento?: string | null;
    genero?: 'Masculino' | 'Femenino' | null;
    peso?: number | null;
    estatura?: number | null;
    objetivo?: 'Ganar peso' | 'Perder peso' | 'Definir' | 'Mantener' | null;
    nivelExperiencia?: 'Principiante' | 'Intermedio' | 'Avanzado';
  } | null;
}

const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({ profile }) => {
  if (!profile) {
    return <Text style={styles.noInfo}>No hay detalles de perfil disponibles</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Detalles del Perfil</Text>
      {profile.fechaNacimiento && (
        <View style={styles.detailItem}>
          <Text style={styles.label}>Fecha de Nacimiento:</Text>
          <Text style={styles.value}>{profile.fechaNacimiento}</Text>
        </View>
      )}
      {profile.genero && (
        <View style={styles.detailItem}>
          <Text style={styles.label}>Género:</Text>
          <Text style={styles.value}>{profile.genero}</Text>
        </View>
      )}
      {profile.peso && (
        <View style={styles.detailItem}>
          <Text style={styles.label}>Peso:</Text>
          <Text style={styles.value}>{profile.peso} kg</Text>
        </View>
      )}
      {profile.estatura && (
        <View style={styles.detailItem}>
          <Text style={styles.label}>Estatura:</Text>
          <Text style={styles.value}>{profile.estatura} cm</Text>
        </View>
      )}
      {profile.objetivo && (
        <View style={styles.detailItem}>
          <Text style={styles.label}>Objetivo:</Text>
          <Text style={styles.value}>{profile.objetivo}</Text>
        </View>
      )}
      {profile.nivelExperiencia && (
        <View style={styles.detailItem}>
          <Text style={styles.label}>Nivel de Experiencia:</Text>
          <Text style={styles.value}>{profile.nivelExperiencia}</Text>
        </View>
      )}
      {/* Agrega aquí más detalles según los campos de tu perfil */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1f2937', // Fondo oscuro
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4b5563',
    paddingBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d1d5db',
  },
  value: {
    fontSize: 16,
    color: '#9ca3af',
  },
  noInfo: {
        fontSize: 16,
        color: '#9ca3af',
        textAlign: 'center'
  }
});

export default UserProfileDetails;
