import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Formik } from 'formik';


import { updateSchema } from '../validations/userSchema';
import { postRegister } from '../services/auth';


export default function AdditionalInfo() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

   const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      const userData = {
        ...values,
        peso: parseFloat(values.peso),
      };
      await postRegister(userData);
      Alert.alert('Éxito', 'Información adicional registrada.');
      router.push('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Hubo un problema registrando la información.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        genero: '',
        peso: '',
        objetivo: '',
      }}
      validationSchema={updateSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Registro - Paso 2</Text>

          {/* ... TextInput components ... */}

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Género</Text>
            <Picker
              selectedValue={values.genero}
              style={styles.picker}
              onValueChange={(itemValue: string) => handleChange('genero')(itemValue)}
            >
              <Picker.Item label="Selecciona género" value="" />
              <Picker.Item label="Masculino" value="masculino" />
              <Picker.Item label="Femenino" value="femenino" />
              <Picker.Item label="Otro" value="otro" />
            </Picker>
            {errors.genero && <Text style={styles.error}>{errors.genero}</Text>}
          </View>

          {/* ... TextInput components ... */}

          <Button onPress={handleSubmit} title={loading ? 'Registrando...' : 'Registrarse'} disabled={loading} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
  error: { color: 'red', marginBottom: 8 },
  pickerContainer: { marginBottom: 10 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
});
