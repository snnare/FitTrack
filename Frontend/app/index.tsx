import React, {useState, useEffect} from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View, Text } from 'react-native';
import { useAuth } from './context/authContext';
import { testConnection } from './services/api';

export default function IndexScreen() {
  const { authState } = useAuth(); 
  
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);



  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await testConnection();
      setConnectionStatus(isConnected);
    };

    checkConnection();
  }, []);

  if (connectionStatus === null) {
    // Esperando el resultado de la conexión de prueba
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Verificando conexión...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!connectionStatus) {
    // La conexión de prueba falló
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error de conexión al servidor.</Text>
      </View>
    );
  }

  if (authState?.authenticated === null) {
    // Si el estado de autenticación aún no se ha determinado, muestra un indicador de carga.
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (authState?.authenticated) {
    // Si el usuario está autenticado, redirige a la pantalla de inicio (home).
    return <Redirect href="/(tabs)/home" />;
  } else {
    // Si el usuario no está autenticado, redirige a la pantalla de inicio de sesión (login).
    return <Redirect href="/(auth)/login" />;
  }
}