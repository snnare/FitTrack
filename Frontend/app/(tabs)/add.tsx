import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const banner = require('../../assets/Logs/Logs-Banner.png'); // Asegúrate de que la ruta sea correcta

const AddLogAndMeasuresScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Registro de Ejercicio y Medidas</Text>
             <View style={styles.bannerContainer}>
            <Image source={banner} style={styles.banner} />
            </View>
            <Text style={styles.subtitle}>Seleccione qué desea registrar</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/screens/registerlog')} // Navega a la pantalla de Agregar Log
            >
                <Text style={styles.buttonText}>Agregar Log de Ejercicio</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/screens/registermeasures')} // Navega a la pantalla de Registrar Medidas
            >
                <Text style={styles.buttonText}>Registrar Metricas</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111827', // Fondo oscuro
        padding: 20,
    },
     logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Texto blanco
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#d1d5db', // Texto gris claro
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#22c55e', // Verde
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center', // Centrar el texto
    },
    buttonText: {
        color: '#fff', // Texto blanco
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
     bannerContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    banner: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default AddLogAndMeasuresScreen;
