import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../utils/Button'; // Asegúrate de que la ruta sea correcta

interface ErrorScreenProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || '¡Oops! Algo salió mal'}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <CustomButton
          title="Reintentar"
          onPress={onRetry}
          style={styles.retryButton} // Aplica estilos al botón
          textStyle={styles.retryButtonText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#f87171',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#f87171',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginTop: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default ErrorScreen;
