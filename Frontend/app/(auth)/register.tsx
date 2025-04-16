import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import { registerAndLoginSchema } from '../validations/registerSchema'; // Importa el esquema combinado
import { registerUser } from '../services/auth';
import { API_URL } from '../services/env';
export default function RegisterScreen() {

  const handleRegister = async (values: any) => {
    try {
      const response = await registerUser(values);
      Alert.alert("¡Éxito!", "Usuario registrado correctamente.");
      console.log("API_URL", API_URL);
      console.log(response);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Hubo un problema registrando el usuario.");
      console.log("API_URL", API_URL);
      
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{
        correo: '',
        password: '',
      }}
      validationSchema={registerAndLoginSchema} // Usa el esquema combinado
      onSubmit={(values) => {
        console.log(values);
        handleRegister(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});