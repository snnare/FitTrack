// RegisterScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/authContext';
import { registerAndLoginSchema } from '../validations/registerAndLoginSchema';
import { RegisterData } from '../types/register';


import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthLink from '../../components/auth/AuthLink';



const logo = require('../../assets/logo.png');


const initialValues: RegisterData = {
  nombre: '',
  apellidos: '',
  correo: '',
  password: '',
  fechaNacimiento: '',
  genero: null,
  peso: '',
  estatura: '',
  objetivo: null,
  nivelExperiencia: 'Principiante'
};

export default function RegisterScreen() {
  const router = useRouter();
  const { onFullRegister } = useAuth();
  const [registerError, setRegisterError] = React.useState<string | null>(null);


  const handleRegister = async (values: RegisterData) => {
    setRegisterError(null);
    try {
      const result = await onFullRegister(values);
      if (!result?.error) {
        Alert.alert(
          'OK',
          'Usuario registrado.',
          [{ text: 'OK', onPress: () => router.push('/(auth)/login') }], 
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Error de Registro',
          result.msg || 'Hubo un problema al registrar el usuario.',
          [{ text: 'OK', style: 'destructive' }],
          { cancelable: false }
        );
        setRegisterError(result.msg);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Ocurrió un error inesperado.';
      Alert.alert(
        'Error Inesperado',
        errorMessage,
        [{ text: 'OK', style: 'destructive' }],
        { cancelable: false }
      );
      setRegisterError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.subtitle}>¡Únete a nuestra comunidad y alcanza tus metas!</Text>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={registerAndLoginSchema} // Asegúrate de actualizar este schema
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <AuthInput
                label="Nombre"
                placeholder="Tu nombre"
                value={values.nombre}
                onChangeText={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
                error={touched.nombre && errors.nombre}
              />
              <AuthInput
                label="Apellidos"
                placeholder="Tus apellidos"
                value={values.apellidos}
                onChangeText={handleChange('apellidos')}
                onBlur={handleBlur('apellidos')}
                error={touched.apellidos && errors.apellidos}
              />
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
              <AuthInput
                label="Fecha de Nacimiento (YYYY-MM-DD)"
                placeholder="YYYY-MM-DD"
                value={values.fechaNacimiento}
                onChangeText={handleChange('fechaNacimiento')}
                onBlur={handleBlur('fechaNacimiento')}
                error={touched.fechaNacimiento && errors.fechaNacimiento}
                keyboardType="number-pad"
              />
              <Text style={styles.label}>Género</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.genero}
                  onValueChange={handleChange('genero')}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleccionar género" value={null} />
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Femenino" value="Femenino" />
                </Picker>
              </View>
              {touched.genero && errors.genero && <Text style={styles.error}>{errors.genero}</Text>}

              <AuthInput
                label="Peso (kg)"
                placeholder="Peso (kg)"
                value={values.peso}
                onChangeText={handleChange('peso')}
                onBlur={handleBlur('peso')}
                error={touched.peso && errors.peso}
                keyboardType="numeric"
              />
              <AuthInput
                label="Estatura (cm)"
                placeholder="Estatura (cm)"
                value={values.estatura}
                onChangeText={handleChange('estatura')}
                onBlur={handleBlur('estatura')}
                error={touched.estatura && errors.estatura}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Objetivo</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.objetivo}
                  onValueChange={handleChange('objetivo')}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleccionar objetivo" value={null} />
                  <Picker.Item label="Ganar peso" value="Ganar peso" />
                  <Picker.Item label="Perder peso" value="Perder peso" />
                  <Picker.Item label="Definir" value="Definir" />
                  <Picker.Item label="Mantener" value="Mantener" />
                </Picker>
              </View>
              {touched.objetivo && errors.objetivo && <Text style={styles.error}>{errors.objetivo}</Text>}

              <Text style={styles.label}>Nivel de Experiencia</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.nivelExperiencia}
                  onValueChange={handleChange('nivelExperiencia')}
                  style={styles.picker}
                >
                  <Picker.Item label="Principiante" value="Principiante" />
                  <Picker.Item label="Intermedio" value="Intermedio" />
                  <Picker.Item label="Avanzado" value="Avanzado" />
                </Picker>
              </View>
              {touched.nivelExperiencia && errors.nivelExperiencia && <Text style={styles.error}>{errors.nivelExperiencia}</Text>}

              <AuthButton title="Registrarse" onPress={handleSubmit} />
              <AuthLink title="¿Ya tienes cuenta? Inicia sesión" onPress={() => router.push('/login')} />
            </View>
          )}
        </Formik>
      </ScrollView>
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
  formContainer: {
    paddingBottom: 20, 
  },
  subtitle: {
    fontSize: 16,
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
  label: {
    color: '#d1d5db',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    backgroundColor: '#1f2937',
    marginBottom: 10,
    color: '#d1d5db',
  },
  picker: {
    color: '#d1d5db',
  },
  error: {
    color: '#f43f5e',
    marginBottom: 8,
  },
});