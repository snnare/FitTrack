// components/user/UserProfileHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

// Importa las imágenes desde tus assets
const maleIcon = require('../../assets/man-profile-icon.png'); // Asegúrate de que la ruta sea correcta
const femaleIcon = require('../../assets/women-profile-icon.png'); // Asegúrate de que la ruta sea correcta

interface UserProfileHeaderProps {
  nombre?: string;
  correo: string;
  imagenPerfil?: string;
  genero?: 'Masculino' | 'Femenino' | null;
  onEditProfile?: () => void;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ nombre, correo, imagenPerfil, genero }) => {
  return (
    <View style={styles.container}>
      {/* Imagen de Perfil */}
      <View style={styles.imageContainer}>
        {imagenPerfil ? (
          <Image source={{ uri: imagenPerfil }} style={styles.profileImage} />
        ) : genero === 'Masculino' ? (
          <Image source={maleIcon} style={styles.profileImage} />
        ) : genero === 'Femenino' ? (
          <Image source={femaleIcon} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>
              {nombre ? nombre[0].toUpperCase() : correo[0].toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Nombre y Correo */}
      <View style={styles.infoContainer}>
        {nombre && <Text style={styles.name}>{nombre}</Text>}
        <Text style={styles.email}>{correo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#1f2937',
    borderRadius: 8,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#6ee7b7',
    resizeMode: 'contain', // Importante para que las imágenes de hombre/mujer se ajusten bien
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4b5563',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d1d5db',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#d1d5db',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default UserProfileHeader;
