import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { RegisterSchema } from '../validations/userSchema';

import { registerUser } from '../services/auth';


export default function RegisterScreen() {
  const [selectedGenero, setSelectedGenero] = React.useState('');

  const handleRegister = async (values: any) => {
    try {
      const response = await registerUser(values); // Llama a registerUser
      Alert.alert("¡Éxito!", "Usuario registrado correctamente.");
      console.log(response);
    } catch (error) {
      Alert.alert("Error", "Hubo un problema registrando el usuario.");
      console.error(error);
    }
  };




  return (
    <Formik
      initialValues={{
        nombre: '',
        apellidos: '',
        correo: '',
        password: '',
        fechaNacimiento: '',
        genero: '',
        peso: '',
        objetivo: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        console.log(values); // Verifica los valores antes de enviar
        handleRegister(values); // Llama a la función de registro
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Registro</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={handleChange('nombre')}
            onBlur={handleBlur('nombre')}
            value={values.nombre}
          />
          {touched.nombre && errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Apellidos"
            onChangeText={handleChange('apellidos')}
            onBlur={handleBlur('apellidos')}
            value={values.apellidos}
          />
          {touched.apellidos && errors.apellidos && <Text style={styles.error}>{errors.apellidos}</Text>}

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

          <TextInput
            style={styles.input}
            placeholder="Fecha de nacimiento (YYYY-MM-DD)"
            onChangeText={handleChange('fechaNacimiento')}
            onBlur={handleBlur('fechaNacimiento')}
            value={values.fechaNacimiento}
          />
          {touched.fechaNacimiento && errors.fechaNacimiento && <Text style={styles.error}>{errors.fechaNacimiento}</Text>}

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.genero}
              onValueChange={(itemValue) => {
                setSelectedGenero(itemValue);
                setFieldValue('genero', itemValue);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona tu género" value="" />
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
          </View>
          {touched.genero && errors.genero && <Text style={styles.error}>{errors.genero}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Peso (kg)"
            onChangeText={handleChange('peso')}
            onBlur={handleBlur('peso')}
            value={values.peso}
            keyboardType="numeric"
          />
          {touched.peso && errors.peso && <Text style={styles.error}>{errors.peso}</Text>}

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.objetivo}
              onValueChange={(itemValue) => {
                setSelectedGenero(itemValue);
                setFieldValue('objetivo', itemValue);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Objetivo" value="" />
              <Picker.Item label="Ganar peso" value="Ganar peso" />
              <Picker.Item label="Perder peso" value="Perder peso" />
              <Picker.Item label="Definir" value="Definir" />
              <Picker.Item label="Mantener" value="Mantener" />
            </Picker>
          </View>
          {touched.objetivo && errors.objetivo && <Text style={styles.error}>{errors.objetivo}</Text>}



          <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
            <Text style={styles.buttonText}>REGISTRAR</Text>
          </TouchableOpacity>
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
    backgroundColor: '#f0fdf4', // Verde muy claro
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#22c55e', // Verde vibrante
  },
  input: {
    borderWidth: 1,
    borderColor: '#a7f3d0', // Verde claro
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: Platform.OS === 'android' ? 50 : undefined,
  },
  button: {
    backgroundColor: '#22c55e', // Verde fuerte
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
