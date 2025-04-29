// app/(auth)/forgot-password.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthLink from '../../components/auth/AuthLink';

const logo = require('../../assets/logo.png');

interface ForgotPasswordData {
  correo: string;
}

const validationSchema = Yup.object().shape({
  correo: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
});

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const handleForgotPassword = async (values: ForgotPasswordData) => {
    try {
      // Aquí iría la lógica para enviar un correo de recuperación de contraseña
      console.log('Solicitud de recuperación de contraseña para:', values.correo);
      Alert.alert(
        'Solicitud Enviada',
        `Se ha enviado un correo electrónico a ${values.correo} con instrucciones para restablecer tu contraseña.`
      );
      router.push('/login'); // Redirigir al login después de enviar la solicitud
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Hubo un problema al enviar la solicitud.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.subtitle}>Ingresa tu correo electrónico y te enviaremos instrucciones para restablecerla.</Text>

        <Formik
          initialValues={{ correo: '' }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <AuthInput
                label="Correo electrónico"
                placeholder="Tu correo electrónico"
                value={values.correo}
                onChangeText={handleChange('correo')}
                onBlur={handleBlur('correo')}
                error={touched.correo && errors.correo}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AuthButton title="Enviar Solicitud" onPress={handleSubmit} />
              <AuthLink title="Volver al inicio de sesión" onPress={() => router.push('/login')} />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111827',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 150, // Un poco más pequeño que el login para variar ligeramente
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#d1d5db',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#9ca3af',
  },
});