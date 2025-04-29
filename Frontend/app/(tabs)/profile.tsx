import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';
import UserProfileHeader from '../../components/user/UserProfileHeader';
import UserProfileActions from '../../components/user/UserProfileActions'; // Asegúrate de que la ruta sea correcta
import UserProfileDetails from '../../components/user/UserProfileDetails';

export default function profileScreen() {
  const router = useRouter();
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    await onLogout();
    router.replace('/(auth)/login');
  };
  const nombre = 'Nombre de Usuario'; 
  const correo = 'email@email.com';
  const imagenPerfil = undefined; 
  const genero = 'Masculino'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del Perfil</Text>
      <UserProfileHeader
        nombre={nombre}
        correo={correo}
        imagenPerfil={imagenPerfil}
        genero={genero}
      />
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // Centra el contenido horizontalmente
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#d1d5db',
  },
  // Puedes agregar más estilos si los necesitas
});
