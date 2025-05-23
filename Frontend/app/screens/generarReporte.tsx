import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import BackButton from '../../components/utils/BackButton';
import { createReporte, getReporte } from '../services/reporte';


const meses = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value: 2 },
    { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 },
    { label: 'Noviembre', value: 11 },
    { label: 'Diciembre', value: 12 },
];

const años = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

export default function GenerarReporteScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMes, setSelectedMes] = useState<number | null>(new Date().getMonth() + 1);
    const [selectedAnio, setSelectedAnio] = useState<number | null>(new Date().getFullYear());

    const handleGenerarPDF = async () => {
        if (selectedMes === null || selectedAnio === null) {
            Alert.alert('Error', 'Por favor, selecciona un mes y un año.');
            return;
        }

        setIsLoading(true);
        try {
            const res = await createReporte(selectedMes, selectedAnio);
            console.log(res)
            Alert.alert('Éxito', `Reporte para ${meses.find(m => m.value === selectedMes)?.label} ${selectedAnio} generado.`);
        } catch (error) {
            console.error('Error al generar PDF:', error);
            Alert.alert('Error', 'Hubo un problema al generar el PDF. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollView}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton to='/(tabs)/profile' />
                    <Text style={styles.title}>Generar Reporte</Text>
                </View>


                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mes</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedMes}
                            onValueChange={(itemValue: number | null) => setSelectedMes(itemValue)}
                            style={styles.picker}
                        >
                            {meses.map((mes) => (
                                <Picker.Item
                                    key={mes.value.toString()}
                                    label={mes.label}
                                    value={mes.value}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Año</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedAnio}
                            onValueChange={(itemValue: number | null) => setSelectedAnio(itemValue)}
                            style={styles.picker}
                        >
                            {años.map((anio) => (
                                <Picker.Item
                                    key={anio.toString()}
                                    label={anio.toString()}
                                    value={anio}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.generateButton}
                    onPress={handleGenerarPDF}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <MaterialIcons name="print" size={24} color="#fff" />
                            <Text style={styles.buttonText}>Generar PDF</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#111827',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
        // Removed alignItems: 'center' from here to allow header to stretch
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%', // Ensure header takes full width
        marginBottom: 30, // Adjust spacing as needed
        paddingHorizontal: 0, // No extra padding here if container already has it
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#f9fafb',
        textAlign: 'center', // Keep title centered within the header's available space
        flex: 1, // Allow title to take available space
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d1d5db',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#374151',
        borderRadius: 12,
        backgroundColor: '#1f2937',
        overflow: 'hidden',
        paddingHorizontal: 10,
    },
    picker: {
        width: '100%',
        height: 50,
    },
    generateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#22c55e',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 20,
        width: '100%',
    },
    // Removed backButton style as it's replaced by BackButton component
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
