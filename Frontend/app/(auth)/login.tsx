import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser, getProfileUser } from '../services/auth';
import { Formik } from 'formik';
import { registerAndLoginSchema } from '../validations/registerAndLoginSchema'; // Importa el esquema

const logo = require('../../assets/logo.png');

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (values: any) => {
    try {
      await loginUser(values);
      const profileIsComplete = await getProfileUser(values.correo);

      if (!profileIsComplete) {
        router.push('/(tabs)/completeprofile');
      } else {
        router.push('/(tabs)/home');
      }
      Alert.alert('OK');
    } catch (error: any) {
      Alert.alert('Error al iniciar sesión', error.message || 'Hubo un problema al iniciar sesión.');
    }
  };

  return (
    <Formik
      initialValues={{ correo: '', password: '' }}
      validationSchema={registerAndLoginSchema} // Usa el esquema
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.subtitle}>Tu progreso es tu mejor motivación. ¡Regístralo y supérate!</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={values.correo}
            onChangeText={handleChange('correo')}
            onBlur={handleBlur('correo')}
            autoCapitalize="none"
          />
          {touched.correo && errors.correo && <Text style={styles.error}>{errors.correo}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => Alert.alert('Funcionalidad en desarrollo')}>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => router.push('/register')}>
            <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
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