import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useRouter } from 'expo-router';
import * as Yup from 'yup';

const Step1Schema = Yup.object().shape({
  correo: Yup.string().email('Correo inválido').required('Correo obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña obligatoria'),
});

export default function RegisterStep1() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ correo: '', password: '' }}
      validationSchema={Step1Schema}
      onSubmit={(values) => {
        router.push({
          pathname: '/(auth)/register-step2',
          params: { correo: values.correo, password: values.password },
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Registro Nuevo Usuario</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo"
            onChangeText={handleChange('correo')}
            onBlur={handleBlur('correo')}
            value={values.correo}
            keyboardType="email-address"
          />
          {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <Button onPress={handleSubmit} title="Siguiente" />
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
});
