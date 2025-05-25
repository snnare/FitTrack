import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import BackButton from '../../components/utils/BackButton';
import { getReporte , createReporte} from '../services/reporte';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
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
    let reporteData = null;

    try {
      try {
        const response = await getReporte(selectedMes, selectedAnio);
        reporteData = response.data;
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          Alert.alert(
            'Reporte no encontrado',
            'No existe un reporte para este mes y año. Intentando crearlo...',
            [{ text: 'OK' }]
          );
          const createResponse = await createReporte(selectedMes, selectedAnio);
          if (createResponse.message === 'OK') {
              Alert.alert('Éxito', 'Reporte creado exitosamente. Obteniendo datos para el PDF...');
              const getAfterCreateResponse = await getReporte(selectedMes, selectedAnio);
              reporteData = getAfterCreateResponse.data;
          } else {
              throw new Error(createResponse.error || "Error desconocido al crear el reporte.");
          }
        } else if (error.response && error.response.status === 200 && error.response.data?.reporteExistente) {
             Alert.alert('Reporte Existente', error.response.data.message);
             setIsLoading(false);
             return;
        } else {
          throw error;
        }
      }

      if (reporteData) {
        const htmlContent = await generateReportHTML(reporteData);

        const file = await printToFileAsync({
          html: htmlContent,
          base64: false,
        });

        await shareAsync(file.uri, {
          mimeType: 'application/pdf',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('Error', 'No se pudo obtener ni crear el reporte.');
      }

    } catch (error: any) {
      let errorMessage = 'Hubo un problema al generar el PDF. Por favor, intenta de nuevo.';

      if (error.response && error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
      } else if (error.message) {
          errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f9fafb',
    textAlign: 'center',
    flex: 1,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});