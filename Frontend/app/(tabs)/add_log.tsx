import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import { LogSchema } from '../validations/logSchema';
import { crearLog } from '../services/log';

export default function createLogScreen() {
    const handleSubmitLog = async (values: any) => {
        console.log('Valores del formulario al enviar:', values);
        try {
            const response = await crearLog(values);
            Alert.alert("Registrado");
            console.log("Respuesta del servidor:", response);
        } catch (error) {
            Alert.alert("Error al registrar");
            console.error("Error al registrar log:", error);
            if (error) {
                console.log(error);
            } else if (error) {
                console.error("No se recibió respuesta del servidor:", error);
            } else {
                console.error("Error al configurar la petición:", error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Puedes añadir un logo si lo deseas */}
            {/* <Image source={require('../assets/tu_logo.png')} style={styles.logo} /> */}
            <Text style={styles.logo}>Registro de Ejercicio</Text>
            <Text style={styles.subtitle}>Ingrese los detalles del ejercicio</Text>
            <Formik
                initialValues={{
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
                        <TextInput
                            style={styles.input}
                            placeholder="Ejercicio"
                            placeholderTextColor="#d1d5db"
                            onChangeText={handleChange('ejercicio')}
                            onBlur={handleBlur('ejercicio')}
                            value={values.ejercicio}
                        />
                        {touched.ejercicio && errors.ejercicio && <Text style={styles.error}>{errors.ejercicio}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Series"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('series')}
                            onBlur={handleBlur('series')}
                            value={values.series}
                        />
                        {touched.series && errors.series && <Text style={styles.error}>{errors.series}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Repeticiones"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('repeticiones')}
                            onBlur={handleBlur('repeticiones')}
                            value={values.repeticiones}
                        />
                        {touched.repeticiones && errors.repeticiones && <Text style={styles.error}>{errors.repeticiones}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Peso (kg)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('peso')}
                            onBlur={handleBlur('peso')}
                            value={values.peso}
                        />
                        {touched.peso && errors.peso && <Text style={styles.error}>{errors.peso}</Text>}

                        <TextInput
                            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                            placeholder="Notas (opcional)"
                            placeholderTextColor="#d1d5db"
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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20,
    },
    error: {
        color: '#ef4444', // Color de error
        fontSize: 12,
    },
});