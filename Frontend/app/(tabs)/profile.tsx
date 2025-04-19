import React from 'react';
import { View , Text, Button, StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/authContext';

export default function additionalInfoScreen() {
    const router = useRouter();
    const { onLogout } = useAuth();

    const handleLogout = async () => {
        await onLogout();
        router.replace('/(auth)/login'); 
      };
    

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Información Adicional</Text>
        {/* Aquí iría tu formulario AdditionalInfoForm */}
        <Button title="Cerrar Sesión" onPress={handleLogout} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center', // Centra el contenido verticalmente
      alignItems: 'center', // Centra el contenido horizontalmente
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    // Puedes agregar más estilos si los necesitas
  });