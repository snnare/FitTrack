import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface ConnectionErrorProps {
  onRetry?: () => void;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({ onRetry }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error de Conexión</Text>
      <Text style={styles.message}>No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e intenta nuevamente.</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.backButtonText}>Volver a Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111827', // Mantén el fondo oscuro
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#f43f5e', // Color rojo para el error
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 25,
    color: '#d1d5db',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#22c55e', // Verde para reintentar
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  backButton: {
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#38bdf8', // Azul para el enlace
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default ConnectionError;