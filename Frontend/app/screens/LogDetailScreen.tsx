import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getLogById, deleteLog } from '../services/log';
import { Log } from '../types/logs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const LogDetailScreen = () => {
    const { logId } = useLocalSearchParams();
    const [log, setLog] = useState<Log | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchLogDetails = async () => {
            if (!logId || typeof logId !== 'string') {
                setError('ID de log no válido.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const fetchedLog = await getLogById(logId);
                setLog(fetchedLog.data);
            } catch (err: any) {
                setError(err.message || 'Error al cargar los detalles del log.');
            } finally {
                setLoading(false);
            }
        };

        fetchLogDetails();
    }, [logId]);

    const handleDelete = async () => {
        if (!log?._id) {
            Alert.alert("Error", "ID del log no disponible.");
            return;
        }

        Alert.alert(
            "Eliminar Registro",
            "¿Seguro que deseas eliminar este registro de entrenamiento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            await deleteLog(log._id);
                            Alert.alert("Listo", "Registro eliminado correctamente.");
                            router.replace('/(tabs)/home');
                        } catch (err: any) {
                            Alert.alert("Error", err.message || "No se pudo eliminar.");
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const handleUpdate = () => {
        if (log?._id) {
            router.push({
                pathname: '/screens/LogUpdateScreen',
                params: { logId: log._id }
            });
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#22c55e" />
                <Text style={styles.loadingText}>Cargando detalles del log...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!log) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Log no encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>{log.ejercicio}</Text>

                <Text style={styles.detailLine}>Series: {log.series}</Text>
                <Text style={styles.detailLine}>Repeticiones: {log.repeticiones}</Text>
                <Text style={styles.detailLine}>Peso: {log.peso} kg</Text>
                <Text style={styles.detailLine}>Notas: {log.notas || 'Sin notas'}</Text>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <FontAwesome5 name="edit" size={18} color="#fff" />
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Ionicons name="trash" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
        padding: 20,

    },
    formContainer: {
        paddingBottom: 20,
    },
    header: {
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#d1d5db',
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 18,
        textAlign: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#86efac',
        marginBottom: 30,
    },
    detailLine: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop: 40,
        gap: 15,
    },
    backButton: {
        backgroundColor: '#22c55e',
        borderRadius: 30,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    

    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    updateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f59e0b',
        paddingVertical: 14,
        borderRadius: 10,
        gap: 10,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dc2626',
        paddingVertical: 14,
        borderRadius: 10,
        gap: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },


});

export default LogDetailScreen;
