import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

    const handleEditProfile = () => {
        router.push('/screens/editProfile');
    };

    const handleGenerateReport = () => {
        // Aquí iría la lógica para generar el reporte
        console.log('Generar Reporte presionado');
        // Puedes navegar a otra pantalla o mostrar una funcionalidad aquí
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Información del Perfil</Text>
            <UserProfileHeader />
            <UserStats />

            <View style={styles.buttonContainer}>
                <CustomButton
                    title='Cerrar Sesión'
                    onPress={handleLogout}
                    style={styles.logoutButton}
                    textStyle={styles.buttonText}
                />
                <CustomButton
                    title='Editar Perfil'
                    onPress={handleEditProfile}
                    style={styles.editButton}
                    textStyle={styles.buttonText}
                />
                <CustomButton
                    title='Generar Reporte'
                    onPress={handleGenerateReport}
                    style={styles.reportButton}
                    textStyle={styles.buttonText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#111827',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#d1d5db',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 30,
        gap: 15, // Espacio entre los botones
    },
    logoutButton: {
        backgroundColor: '#ef4444',
        paddingVertical: 14,
        borderRadius: 10,
    },
    editButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 14,
        borderRadius: 10,
    },
    reportButton: {
        backgroundColor: '#84cc16',
        paddingVertical: 14,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});