import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'; // Importa TouchableOpacity
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../context/authContext';
import { MaterialIcons } from '@expo/vector-icons'; 


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
        router.push('/screens/generarReporte');
    };

    useFocusEffect(
        React.useCallback(() => {
            return () => {
            };
        }, [])
    );

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Información del Perfil</Text>
                <UserProfileHeader />
                <UserStats />

                <View style={styles.buttonContainer}>
                    <View style={styles.topButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.reloadButton, { backgroundColor: '#3b82f6' }]} // Estilo de editar perfil
                            onPress={handleEditProfile}
                        >
                            <MaterialIcons name="edit" size={20} color="#fff" />
                            <Text style={styles.reloadButtonText}>Editar Perfil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.reloadButton, { backgroundColor: '#22c55e' }]} // Estilo de generar reporte
                            onPress={handleGenerateReport}
                        >
                            <MaterialIcons name="print" size={20} color="#fff" />
                            <Text style={styles.reloadButtonText}>Generar Reporte</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomButton
                        title='Cerrar Sesión'
                        onPress={handleLogout}
                        style={[styles.button, styles.logoutButton]}
                        textStyle={styles.buttonText}
                    />
                </View>

                <View style={styles.optionsContainer}>
                    <Text style={styles.optionsTitle}>Opciones Adicionales</Text>
                    <View style={styles.optionItem}>
                        <MaterialIcons name="settings" size={24} color="#d1d5db" style={styles.optionIcon} />
                        <Text style={styles.optionText}>Configuración</Text>
                         {/*<Icon name="chevron-right" size={20} color="#d1d5db" />*/}
                    </View>
                    <View style={styles.optionItem}>
                        <MaterialIcons name="help-circle" size={24} color="#d1d5db" style={styles.optionIcon}/>
                        <Text style={styles.optionText}>Ayuda y Soporte</Text>
                         
                    </View>
                    <View style={styles.optionItem}>
                         <MaterialIcons name="info" size={24} color="#d1d5db" style={styles.optionIcon}/>
                        <Text style={styles.optionText}>Acerca de</Text>
                        
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#111827',
    },
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#111827',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#f9fafb',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 30,
    },
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        width: '100%',
    },
    button: { // Estilo base para el botón (se mantiene para Cerrar Sesión)
        paddingVertical: 16,
        borderRadius: 12,
        flex: 1,
        marginHorizontal: 8,
    },
    logoutButton: {
        backgroundColor: '#dc2626',
        width: '100%',
        marginHorizontal: 0,
    },
    editButton: {
        backgroundColor: '#3b82f6',
    },
    reportButton: {
        backgroundColor: '#16a34a',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'semibold',
        textAlign: 'center',
    },
    optionsContainer: {
        width: '100%',
        marginTop: 40,
    },
    optionsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d1d5db',
        marginBottom: 20,
        textAlign: 'left',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#374151',
    },
    optionText: {
        fontSize: 18,
        color: '#d1d5db',
        marginLeft: 10,
    },
    optionIcon: {
        marginRight: 10,
    },
    reloadButton: {  // Estilo del botón Actualizar (reutilizado)
        backgroundColor: '#22c55e',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        flex: 1, // Para que los botones superiores se expandan
        marginHorizontal: 8,
    },
    reloadButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
