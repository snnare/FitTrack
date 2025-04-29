import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';

import UserProfileHeader from '../../components/user/UserProfileHeader';
import UserStats from '../../components/user/UserStats';

import CustomButton from '../../components/utils/Button';

export default function profileScreen() {
  const router = useRouter();
  const { onLogout } = useAuth();

  const handleLogout = async () => {
    await onLogout();
    router.replace('/(auth)/login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del Perfil</Text>
      <UserProfileHeader/>
      

      <CustomButton  title='Cerrar Sesión' onPress={handleLogout} style={{ marginTop: 20 }} textStyle={{ color: '#fff' }} />
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
