import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Formik } from 'formik';
import { RegisterSchema } from '../validations/userSchema';

export default function RegisterStep2() {
  const router = useRouter();
  const { correo, password } = useLocalSearchParams<{ correo: string; password: string }>();

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
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        const userData = {
          correo,
          password,
          ...values,
          peso: parseFloat(values.peso),
        };

        console.log('Datos a enviar:', userData);
        // Aquí puedes llamar a tu servicio auth.registerUser(userData)
        // y luego redirigir o mostrar feedback
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Registro - Paso 2</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={handleChange('nombre')}
            onBlur={handleBlur('nombre')}
            value={values.nombre}
          />
          {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            onChangeText={handleChange('apellidos')}
            onBlur={handleBlur('apellidos')}
            value={values.apellidos}
          />
          {errors.apellidos && <Text style={styles.error}>{errors.apellidos}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Fecha de nacimiento (YYYY-MM-DD)"
            onChangeText={handleChange('fechaNacimiento')}
            onBlur={handleBlur('fechaNacimiento')}
            value={values.fechaNacimiento}
          />
          {errors.fechaNacimiento && <Text style={styles.error}>{errors.fechaNacimiento}</Text>}

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Género</Text>
            
            {errors.genero && <Text style={styles.error}>{errors.genero}</Text>}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Peso en kg (ej. 70)"
            keyboardType="numeric"
            onChangeText={handleChange('peso')}
            onBlur={handleBlur('peso')}
            value={values.peso}
          />
          {errors.peso && <Text style={styles.error}>{errors.peso}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Objetivo (ej. Ganar masa, Perder grasa)"
            onChangeText={handleChange('objetivo')}
            onBlur={handleBlur('objetivo')}
            value={values.objetivo}
          />
          {errors.objetivo && <Text style={styles.error}>{errors.objetivo}</Text>}

          <Button onPress={handleSubmit} title="Registrarse" />
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
