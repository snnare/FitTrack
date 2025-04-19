import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext'; // Importa el hook useAuth

export default function ProfileScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { onLogout } = useAuth(); // Obtén la función onLogout del contexto
  const router = useRouter();

  const user = {
    nombre: 'Juan',
    apellidos: 'Pérez',
    correo: 'juanperez@example.com',
    peso: 75,
    objetivo: 'Definir',
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1], // Mantener la imagen cuadrada
        quality: 1,
      });
      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } else {
      alert('Se necesitan permisos para acceder a la galería de imágenes');
    }
  };

  const handleEditProfile = () => {
    // Aquí podrías navegar a otra pantalla para editar el perfil
    alert('Funcionalidad de editar perfil');
  };

  const handleLogoutPress = async () => {
    try {
      await onLogout(); // Llama a la función onLogout del contexto
      router.push('/login'); // Navega a la pantalla de login después del logout
    } catch (error: any) {
      Alert.alert('Error al cerrar sesión', error.message || 'Hubo un problema al cerrar sesión.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>

      {/* Imagen de perfil */}
      <View style={styles.profileImageContainer}>
        <Image
          source={imageUri ? { uri: imageUri } : require('../../assets/default-male-profile.jpg')} // Imagen predeterminada si no hay foto
          style={styles.profileImage}
        />
        <Button title="Subir Foto" onPress={pickImage} />
      </View>

      {/* Información del usuario */}
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

      {/* Botones para editar y cerrar sesión */}
      <View style={styles.buttonsContainer}>
        <Button title="Editar Perfil" onPress={handleEditProfile} />
        <Button title="Cerrar Sesión" onPress={handleLogoutPress} color="red" /> {/* Usa handleLogoutPress */}
      </View>

      <View>
        <Button title='Generar Reporte' onPress={() => { Alert.alert("Reporte Generado") }}>
          <Text>Generar Reporte</Text> {/* Asegúrate de que el texto del botón esté dentro de <Text> */}
        </Button>
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
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Para hacerlo circular
    marginBottom: 10,
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
  buttonsContainer: {
    marginTop: 20,
  },
});