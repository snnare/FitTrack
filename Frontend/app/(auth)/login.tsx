import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../services/auth';
import { registerAndLoginSchema } from '../validations/registerSchema';
import { Formik } from 'formik';

const logo = require('../../assets/logo.png');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser({ correo: email, password });
      Alert.alert('Login exitoso');
      router.push('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Error al iniciar sesión', error.message || 'Hubo un problema al iniciar sesión.');
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.subtitle}>Tu progreso es tu mejor motivación. ¡Regístralo y supérate!</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => Alert.alert('Funcionalidad en desarrollo')}>
        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handleRegister}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111827', // Modo oscuro
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#d1d5db', // Modo oscuro
  },
  input: {
    borderWidth: 1,
    borderColor: '#86efac',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000', // texto negro en modo oscuro
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
    color: '#38bdf8', // Modo oscuro
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
});