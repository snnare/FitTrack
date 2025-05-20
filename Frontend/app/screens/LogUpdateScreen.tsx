import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getLogById, updateLog } from '../services/log';
import { Log, LogData } from '../types/logs';
import { Ionicons } from '@expo/vector-icons';

const UpdateLogScreen = () => {
    const { logId } = useLocalSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<LogData>({
        ejercicio: '',
        series: 0,
        repeticiones: 0,
        peso: 0,
        notas: '',
    });

    const [originalLog, setOriginalLog] = useState<Log | null>(null);

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
                const log = fetchedLog.data; // ✅ accede correctamente a los datos

                setOriginalLog(log);

                setFormData({
                    ejercicio: log.ejercicio,
                    series: log.series,
                    repeticiones: log.repeticiones,
                    peso: log.peso,
                    notas: log.notas || '',
                });
            } catch (err: any) {
                setError(err.message || 'Error al cargar los detalles del log para actualizar.');
            } finally {
                setLoading(false);
            }
        };

        fetchLogDetails();
    }, [logId]);

    const handleChange = (name: keyof LogData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!originalLog?._id) {
            Alert.alert("Error", "No se puede actualizar el log: ID no disponible.");
            return;
        }

        // Validación básica
        if (!formData.ejercicio || formData.ejercicio.trim() === '') {
            Alert.alert("Advertencia", "El campo Ejercicio no puede estar vacío.");
            return;
        }
        if (formData.series <= 0) {
            Alert.alert("Advertencia", "Las Series deben ser un número mayor a 0.");
            return;
        }
        if (formData.repeticiones <= 0) {
            Alert.alert("Advertencia", "Las Repeticiones deben ser un número mayor a 0.");
            return;
        }
        if (formData.peso <= 0) {
            Alert.alert("Advertencia", "El Peso debe ser un número mayor a 0.");
            return;
        }

        try {
            setLoading(true);
            await updateLog(originalLog._id, formData);
            Alert.alert("Listo", "Log Actualizado.");
            router.replace('/(tabs)/home');
        } catch (err: any) {
            Alert.alert("Error", err.message || "Fallo al actualizar el registro.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#22c55e" />
                <Text style={styles.loadingText}>Cargando log para edición...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.reloadButton} onPress={() => router.back()}>
                    <Text style={styles.reloadButtonText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!originalLog) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>Log no encontrado para actualizar.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Actualizar Entrenamiento</Text>

            {/* Formulario */}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Ejercicio:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.ejercicio}
                    onChangeText={(text) => handleChange('ejercicio', text)}
                    placeholder="Ej: Press de banca"
                    placeholderTextColor="#9ca3af"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Series:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.series?.toString() || ''}
                    onChangeText={(text) => handleChange('series', parseInt(text) || 0)}
                    keyboardType="numeric"
                    placeholder="Ej: 4"
                    placeholderTextColor="#9ca3af"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Repeticiones:</Text>
                <TextInput
                    style={styles.input}
                    value={formData.repeticiones?.toString() || ''}
                    onChangeText={(text) => handleChange('repeticiones', parseInt(text) || 0)}
                    keyboardType="numeric"
                    placeholder="Ej: 10"
                    placeholderTextColor="#9ca3af"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Peso (kg):</Text>
                <TextInput
                    style={styles.input}
                    value={formData.peso?.toString() || ''}
                    onChangeText={(text) => handleChange('peso', parseFloat(text) || 0)}
                    keyboardType="numeric"
                    placeholder="Ej: 70.5"
                    placeholderTextColor="#9ca3af"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Notas (opcional):</Text>
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    value={formData.notas || ''}
                    onChangeText={(text) => handleChange('notas', text)}
                    placeholder="Ej: Sentí buena conexión"
                    placeholderTextColor="#9ca3af"
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#111827',
    },
    centerContent: {
        flex: 1,
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
        marginBottom: 20,
    },
    reloadButton: {
        backgroundColor: '#22c55e',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    reloadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    header: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#22c55e',
        borderRadius: 30,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#86efac',
        marginBottom: 30,
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#d1d5db',
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#1f2937',
        color: '#e2e8f0',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#22c55e',
    },
    notesInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#22c55e',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default UpdateLogScreen;
