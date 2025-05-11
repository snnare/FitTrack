import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getReporte } from '../services/reporte';
import { generateReportHTML } from '../utils/reporteUtils';

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

const GenerarReporteScreen = () => {
    const [selectedMes, setSelectedMes] = useState<number | null>(new Date().getMonth() + 1);
    const [selectedAnio, setSelectedAnio] = useState<number | null>(new Date().getFullYear());
    const [isGenerating, setIsGenerating] = useState(false);
    const { colors } = useTheme();

    const getAndGenerateReport = async () => {
        setIsGenerating(true);
        try {
            if (selectedMes === null || selectedAnio === null) {
                throw new Error("Mes y Año deben ser seleccionados.");
            }
            const reporteData = await getReporte(selectedMes, selectedAnio);
            const htmlContent = generateReportHTML(reporteData);
            await generarYCompartirPDF(htmlContent);
        } catch (error: any) {
            console.error('Error al obtener y generar el reporte:', error);
            Alert.alert('Error', `Hubo un problema al obtener el reporte: ${error.message || 'Error desconocido'}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const generarYCompartirPDF = async (html: string) => {
        try {
            const file = await printToFileAsync({ html });
            await shareAsync(file.uri, {
                UTI: 'com.adobe.pdf',
                mimeType: 'application/pdf',
            });
        } catch (error) {
            console.error('Error al generar y compartir el PDF:', error);
            Alert.alert('Error', 'No se pudo generar el PDF. Por favor, intenta de nuevo.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView>
                <Text style={[styles.title, { color: colors.text }]}>Generar Reporte Mensual</Text>

                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.text }]}>Mes</Text>
                    <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
                        <Picker
                            selectedValue={selectedMes}
                            onValueChange={(itemValue) => setSelectedMes(itemValue)}
                            style={[styles.picker, { color: colors.primary }]}
                            dropdownIconColor={colors.primary}
                        >
                            {meses.map((mes) => (
                                <Picker.Item key={mes.value.toString()} label={mes.label} value={mes.value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.text }]}>Año</Text>
                    <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
                        <Picker
                            selectedValue={selectedAnio}
                            onValueChange={(itemValue) => setSelectedAnio(itemValue)}
                            style={[styles.picker, { color: colors.primary }]}
                            dropdownIconColor={colors.primary}
                        >
                            {años.map((anio) => (
                                <Picker.Item key={anio.toString()} label={anio.toString()} value={anio} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.generarButton, { backgroundColor: colors.primary }]}
                    onPress={getAndGenerateReport}
                    disabled={isGenerating}
                >
                    <MaterialIcons name="document" size={24} color={colors.card} />
                    <Text style={[styles.generarButtonText, { color: colors.card }]}>
                        {isGenerating ? 'Generando...' : 'Generar Reporte'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pickerContainer: {
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f0f4f8',
    },
    picker: {
        width: '100%',
        height: Platform.OS === 'ios' ? 200 : 40,
    },
    generarButton: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'gap',
        gap: 8,
    },
    generarButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default GenerarReporteScreen;

