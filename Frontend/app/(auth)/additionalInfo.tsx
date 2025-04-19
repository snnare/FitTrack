import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import moment from 'moment';

import { updateSchema } from '../validations/userSchema';
import { postRegister } from '../services/auth'; // Asegúrate de usar la función correcta para actualizar los datos adicionales

interface FormValues {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: 'Masculino' | 'Femenino' | null;
  peso: string;
  estatura: string;
  objetivo: "Ganar peso" | "Perder peso" | "Definir" | "Mantener" | null;
  nivelExperiencia: "Principiante" | "Intermedio" | "Avanzado";
  profileComplete: boolean;
}

const initialValues: FormValues = {
  nombre: '',
  apellidos: '',
  fechaNacimiento: '', // YYYY-MM-DD
  genero: null,
  peso: '',
  estatura: '',
  objetivo: null,
  nivelExperiencia: 'Principiante',
  profileComplete: true, // Se marcará como true al enviar exitosamente
};

export default function AdditionalInfo() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      // Formatear la fecha de nacimiento al formato YYYY-MM-DD si no está vacía
      const formattedFechaNacimiento = values.fechaNacimiento
        ? moment(values.fechaNacimiento, 'YYYY-MM-DD').format('YYYY-MM-DD')
        : null;

      const payload = {
        ...values,
        fechaNacimiento: formattedFechaNacimiento,
        peso: values.peso ? parseFloat(values.peso) : null,
        estatura: values.estatura ? parseFloat(values.estatura) : null,
        profileComplete: true,
      };

      const response = await postRegister(payload);
      if (response?.data) {
        Alert.alert('Éxito', 'Información actualizada correctamente.');
        router.replace('/(tabs)/home'); // Navega a la pantalla principal después de guardar
      } else {
        Alert.alert('Error', 'Hubo un problema al guardar la información.');
      }
    } catch (error: any) {
      console.error('Error al guardar información adicional:', error);
      Alert.alert('Error', error.message || 'Hubo un problema al guardar la información.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Información Adicional</Text>

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('nombre')}
            onBlur={handleBlur('nombre')}
            value={values.nombre}
          />
          {touched.nombre && errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

          <Text style={styles.label}>Apellidos</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('apellidos')}
            onBlur={handleBlur('apellidos')}
            value={values.apellidos}
          />
          {touched.apellidos && errors.apellidos && <Text style={styles.error}>{errors.apellidos}</Text>}

          <Text style={styles.label}>Fecha de Nacimiento (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('fechaNacimiento')}
            onBlur={handleBlur('fechaNacimiento')}
            value={values.fechaNacimiento}
            placeholder="YYYY-MM-DD"
          />
          {touched.fechaNacimiento && errors.fechaNacimiento && <Text style={styles.error}>{errors.fechaNacimiento}</Text>}

          <Text style={styles.label}>Género</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={values.genero}
              onValueChange={handleChange('genero')}
            >
              <Picker.Item label="Seleccionar género" value={null} />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
            </Picker>
          </View>
          {touched.genero && errors.genero && <Text style={styles.error}>{errors.genero}</Text>}

          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('peso')}
            onBlur={handleBlur('peso')}
            value={values.peso}
            keyboardType="numeric"
          />
          {touched.peso && errors.peso && <Text style={styles.error}>{errors.peso}</Text>}

          <Text style={styles.label}>Estatura (cm)</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('estatura')}
            onBlur={handleBlur('estatura')}
            value={values.estatura}
            keyboardType="numeric"
          />
          {touched.estatura && errors.estatura && <Text style={styles.error}>{errors.estatura}</Text>}

          <Text style={styles.label}>Objetivo</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={values.objetivo}
              onValueChange={handleChange('objetivo')}
            >
              <Picker.Item label="Seleccionar objetivo" value={null} />
              <Picker.Item label="Ganar peso" value="Ganar peso" />
              <Picker.Item label="Perder peso" value="Perder peso" />
              <Picker.Item label="Definir" value="Definir" />
              <Picker.Item label="Mantener" value="Mantener" />
            </Picker>
          </View>
          {touched.objetivo && errors.objetivo && <Text style={styles.error}>{errors.objetivo}</Text>}

          <Text style={styles.label}>Nivel de Experiencia</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={values.nivelExperiencia}
              onValueChange={handleChange('nivelExperiencia')}
            >
              <Picker.Item label="Principiante" value="Principiante" />
              <Picker.Item label="Intermedio" value="Intermedio" />
              <Picker.Item label="Avanzado" value="Avanzado" />
            </Picker>
          </View>
          {touched.nivelExperiencia && errors.nivelExperiencia && <Text style={styles.error}>{errors.nivelExperiencia}</Text>}

          <Button title={loading ? 'Guardando...' : 'Guardar Información'} onPress={handleSubmit} disabled={loading} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff' },
  error: { color: 'red', marginBottom: 8 },
  pickerContainer: { marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff' },
  picker: {},
  button: { marginTop: 20 },
});