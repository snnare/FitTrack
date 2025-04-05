import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';


import { registerUser } from '../services/auth';
import { useRouter } from 'expo-router';

const RegisterSchema = Yup.object().shape({
  nombre: Yup.string().min(2, 'Muy corto').max(50, 'Muy largo').required('Requerido'),
  apellidos: Yup.string().required('Requerido'),
  correo: Yup.string().email('Correo inválido').required('Requerido'),
  password: Yup.string().min(8, 'Mínimo 8 caracteres').required('Requerido'),
});

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Formik
        initialValues={{ nombre: '', apellidos: '', correo: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, actions) => {
          try {
            await registerUser(values);
            alert('✅ Usuario creado con éxito');
            router.replace('/'); // redirige al login o inicio
          } catch (error: any) {
            console.error(error);
            alert('❌ Error al registrar usuario');
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Nombre"
              style={styles.input}
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              value={values.nombre}
            />
            {touched.nombre && errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

            <TextInput
              placeholder="Apellidos"
              style={styles.input}
              onChangeText={handleChange('apellidos')}
              onBlur={handleBlur('apellidos')}
              value={values.apellidos}
            />
            {touched.apellidos && errors.apellidos && <Text style={styles.error}>{errors.apellidos}</Text>}

            <TextInput
              placeholder="Correo"
              keyboardType="email-address"
              style={styles.input}
              onChangeText={handleChange('correo')}
              onBlur={handleBlur('correo')}
              value={values.correo}
            />
            {touched.correo && errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button title="Registrarse" onPress={handleSubmit as any} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
  error: { color: 'red', marginBottom: 8 },
});
