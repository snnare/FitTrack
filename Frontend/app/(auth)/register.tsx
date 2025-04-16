import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { useRouter } from 'expo-router';
import { registerAndLoginSchema } from '../validations/registerAndLoginSchema';
import { registerUser } from '../services/auth';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = async (values: any) => {
    try {
      const response = await registerUser(values);
      Alert.alert('OK', 'Usuario registrado correctamente.');
      console.log(response);
      router.push('/login'); // Redirige al login después del registro exitoso
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Hubo un problema registrando el usuario.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/login')}>
        <Ionicons name="arrow-back" size={24} color="#22c55e" />
      </TouchableOpacity>
      <Formik
        initialValues={{ correo: '', password: '' }}
        validationSchema={registerAndLoginSchema}
        onSubmit={(values) => {
          console.log(values);
          handleRegister(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.title}>Registro</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo"
              onChangeText={handleChange('correo')}
              onBlur={handleBlur('correo')}
              value={values.correo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {touched.correo && errors.correo && <Text style={styles.error}>{errors.correo}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <Button title="REGISTRAR" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0fdf4',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#22c55e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a7f3d0',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  error: {
    color: '#dc2626',
    marginBottom: 8,
    fontSize: 14,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
});