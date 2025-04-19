// RegisterScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { registerAndLoginSchema } from '../validations/registerAndLoginSchema';
import { registerUser } from '../services/auth';

import AuthInput from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import AuthLink from '../../components/AuthLink'; 



const logo = require('../../assets/logo.png');



export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = async (values: any) => {
    try {
      await registerUser(values);
      Alert.alert('OK', 'Usuario registrado correctamente.');
      router.push('/login');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Hubo un problema registrando el usuario.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.subtitle}>¡Únete a nuestra comunidad y alcanza tus metas!</Text>
      <Formik
        initialValues={{ correo: '', password: '' }}
        validationSchema={registerAndLoginSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
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
            <AuthButton title="Registrarse" onPress={handleSubmit} />
            <AuthLink title="¿Ya tienes cuenta? Inicia sesión" onPress={() => router.push('/login')} />
          </View>
        )}
      </Formik>
    </View>
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
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 5,
    resizeMode: 'stretch',
  },
});