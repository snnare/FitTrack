// components/user/UserProfileActions.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AuthButton from '../../components/auth/AuthButton'; // Reutilizamos el botón
import { useAuth } from '../../app/context/authContext'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'expo-router';

interface UserProfileActionsProps {
  onLogout: () => Promise<void>; // La función de logout del contexto
}

const UserProfileActions: React.FC<UserProfileActionsProps> = ({ onLogout }) => {
  const router = useRouter();

  const handleEditProfile = () => {
    // Navegar a la pantalla de edición del perfil (debes crearla)
    router.push('/(tabs)/edit-profile'); // Ajusta la ruta si es diferente
  };

  const handleSettings = () => {
    // Navegar a la pantalla de configuración (debes crearla)
    router.push('/(tabs)/settings'); // Ajusta la ruta si es diferente
  };

  return (
    <View style={styles.container}>
      <AuthButton title="Editar Perfil" onPress={handleEditProfile} style={styles.editButton} />
      <AuthButton title="Configuración" onPress={handleSettings} style={styles.settingsButton} />
      <AuthButton title="Cerrar Sesión" onPress={onLogout} style={styles.logoutButton} />
      {/* Agrega aquí otros botones para las acciones del usuario */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  editButton: {
    marginBottom: 10,
  },
  settingsButton: {
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#ef4444', // Rojo para cerrar sesión
  },
});

export default UserProfileActions;
