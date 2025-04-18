// LoginScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';

import { useAuth } from '../context/authContext';
import { registerAndLoginSchema } from '../validations/registerAndLoginSchema';
import { LoginAndRegisterData } from "../types/auth";
import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import AuthLink from '../../components/AuthLink';

const logo = require('../../assets/logo.png');

export default function LoginScreen() {
  const router = useRouter();
  const { onLogin } = useAuth();

  const handleLogin = async (values: LoginAndRegisterData) => {
    try {
      const result = await onLogin(values);
      if (!result?.error) {
        Alert.alert('Inicio de sesión exitoso');
        router.push('/(tabs)/home'); // Navega a la pantalla principal aquí
      } else {
        Alert.alert('Error al iniciar sesión', result.msg || 'Hubo un problema al iniciar sesión.');
      }
    } catch (error: any) {
      Alert.alert('Error inesperado', error.message || 'Ocurrió un error inesperado.');
    }
  };

  return (
    <Formik
      initialValues={{ correo: '', password: '' }}
      validationSchema={registerAndLoginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.subtitle}>
            Fittrack</Text>
          <AuthInput
            label="Correo electrónico"
            placeholder="Correo electrónico"
            value={values.correo}
            onChangeText={handleChange('correo')}
            onBlur={handleBlur('correo')}
            error={touched.correo && errors.correo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthInput
            label="Contraseña"
            placeholder="Contraseña"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={touched.password && errors.password}
          />
          <AuthButton title="Ingresar" onPress={handleSubmit} />
          <AuthLink title="¿Olvidaste tu contraseña?" onPress={() => Alert.alert('Funcionalidad en desarrollo')} />
          <AuthLink title="¿No tienes cuenta? Regístrate" onPress={() => router.push('/register')} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111827',
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#d1d5db',
  },
  input: {
    borderWidth: 1,
    borderColor: '#86efac',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  link: {
    color: '#38bdf8',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 5,
    resizeMode: 'stretch',
  },
  error: {
    color: '#ef4444', // Color de error
    fontSize: 12,
  },
});