import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { LogSchema } from '../validations/logSchema';
import { crearLog } from '../services/log';
import { updateStreak } from '../services/streak';
import { useRouter } from 'expo-router';
import BackButton from '../../components/utils/BackButton';


const LBS_TO_KG = 0.453592;

export default function RegisterMeasuresScreen() {
    const router = useRouter();
    const [unit, setUnit] = useState('kg');

    const handleSubmitLog = async (values: any, { resetForm }: any) => {
        try {
            let pesoEnKg = parseFloat(values.peso);
            if (unit === 'lb') {
                pesoEnKg = pesoEnKg * LBS_TO_KG;
            }
            const logData = { ...values, peso: pesoEnKg.toString() }; // Guardamos en kg
            const response = await crearLog(logData);
            await updateStreak();
            Alert.alert("Registrado");
            resetForm();
        } catch (error) {
            Alert.alert("Ops hubo un error al guardar tu log")
        }
    };



    const toggleUnit = () => {
        setUnit(prevUnit => (prevUnit === 'kg' ? 'lb' : 'kg'));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BackButton to='/(tabs)/add'/>
            <Text style={styles.logo}> Registra tu entrenamiento</Text>
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
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, resetForm }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder={`Peso (${unit})`}
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('peso')}
                            onBlur={handleBlur('peso')}
                            value={values.peso}
                        />
                        <TouchableOpacity style={styles.unitButton} onPress={toggleUnit}>
                            <Text style={styles.unitButtonText}>{unit.toUpperCase()}</Text>
                        </TouchableOpacity>
                        {touched.peso && errors.peso && <Text style={styles.error}>{errors.peso}</Text>}

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

                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit(values, { resetForm })}>
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
        color: '#ef4444',
        fontSize: 12,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#22c55e',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    unitButton: {
        position: 'absolute',
        right: 10,
        top: 15, // Ajusta según la altura del input
        backgroundColor: '#6b7280',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    unitButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});