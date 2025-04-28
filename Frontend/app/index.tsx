import React, {useState, useEffect} from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View, Text } from 'react-native';

import { useAuth } from './context/authContext';
import { testConnection } from './services/api';
import LoadingIndicator from '../components/LoadingIndicator';
import ConnectionError from '../components/ConnectionError';



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
      <LoadingIndicator message='Verificando conexión...' />
    );
  }

  if (!connectionStatus) {
    // La conexión de prueba falló
    return (
      <ConnectionError message='No se pudo conectar a la API. Por favor, verifica tu conexión a Internet.' />
    );
  }

  if (authState?.authenticated === null) {
    // Si el estado de autenticación aún no se ha determinado, muestra un indicador de carga.
    return (
      <LoadingIndicator message='Cargando aplicacion...' />
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