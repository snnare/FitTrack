import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

import colors from '../styles/colors';
import { LogSchema } from '../validations/logSchema';
import { crearLog } from '../services/log';


export default function createLogScreen() {

    // Conectar con la api
    const handleSubmitLog = async (values: any) => {
        try {

        } catch (error) {

        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Formik
                initialValues={{
                    userId: '',
                    fecha: '',
                    ejercicio: '',
                    series: '',
                    repeticiones: '',
                    peso: '',
                    notas: '',
                }}
                validationSchema={LogSchema}
                onSubmit={handleSubmitLog}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <Text style={styles.title}>Registrar Ejercicio</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="ID de Usuario"
                            onChangeText={handleChange('userId')}
                            onBlur={handleBlur('userId')}
                            value={values.userId}
                        />
                        {touched.userId && errors.userId && <Text style={styles.error}>{errors.userId}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha (YYYY-MM-DD)"
                            onChangeText={handleChange('fecha')}
                            onBlur={handleBlur('fecha')}
                            value={values.fecha}
                        />
                        {touched.fecha && errors.fecha && <Text style={styles.error}>{errors.fecha}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Ejercicio"
                            onChangeText={handleChange('ejercicio')}
                            onBlur={handleBlur('ejercicio')}
                            value={values.ejercicio}
                        />
                        {touched.ejercicio && errors.ejercicio && <Text style={styles.error}>{errors.ejercicio}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Series"
                            keyboardType="numeric"
                            onChangeText={handleChange('series')}
                            onBlur={handleBlur('series')}
                            value={values.series}
                        />
                        {touched.series && errors.series && <Text style={styles.error}>{errors.series}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Repeticiones"
                            keyboardType="numeric"
                            onChangeText={handleChange('repeticiones')}
                            onBlur={handleBlur('repeticiones')}
                            value={values.repeticiones}
                        />
                        {touched.repeticiones && errors.repeticiones && <Text style={styles.error}>{errors.repeticiones}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Peso (kg)"
                            keyboardType="numeric"
                            onChangeText={handleChange('peso')}
                            onBlur={handleBlur('peso')}
                            value={values.peso}
                        />
                        {touched.peso && errors.peso && <Text style={styles.error}>{errors.peso}</Text>}

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Notas (opcional)"
                            multiline
                            numberOfLines={4}
                            onChangeText={handleChange('notas')}
                            onBlur={handleBlur('notas')}
                            value={values.notas}
                        />
                        {touched.notas && errors.notas && <Text style={styles.error}>{errors.notas}</Text>}

                        <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
                            <Text style={styles.buttonText}>Registrar Log</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f0fdf4',
      flexGrow: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#15803d',
      textAlign: 'center',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#86efac',
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    error: {
      color: '#ef4444',
      marginBottom: 8,
    },
    button: {
      backgroundColor: '#22c55e',
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