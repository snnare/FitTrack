import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik, FormikHelpers } from 'formik';
import { Picker } from "@react-native-picker/picker";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";
import BackButton from '../../components/utils/BackButton';

import { UserProfileData } from "../types/userProfile";
import { updateSchema } from "../validations/userSchema";
import { getProfileUser, updateUser } from "../services/users";
import { formatDate } from '../utils/dateUtils';

export default function EditProfileScreen() {
    const router = useRouter();
    const [initialValues, setInitialValues] = useState<UserProfileData>({
        nombre: '',
        apellidos: '',
        correo: '',
        fechaNacimiento: '',
        genero: null,
        peso: '',
        estatura: '',
        objetivo: null,
        nivelExperiencia: 'Principiante',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const userData = await getProfileUser();
            if (userData) {
                setInitialValues({
                    nombre: userData.nombre,
                    apellidos: userData.apellidos,
                    correo: userData.correo,
                    fechaNacimiento: userData.fechaNacimiento ? formatDate(userData.fechaNacimiento) : '',
                    genero: userData.genero,
                    peso: String(userData.peso),
                    estatura: String(userData.estatura),
                    objetivo: userData.objetivo,
                    nivelExperiencia: userData.nivelExperiencia || 'Principiante',
                });
            } else {
                setError('Error al obtener los datos del perfil.');
                Alert.alert('Error', 'No se pudieron obtener los datos del perfil.');
            }
        } catch (error) {
            setError('Error al obtener los datos del perfil.');
            Alert.alert('Error', 'No se pudieron obtener los datos del perfil.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);
    const handleUpdateProfile = async (values: UserProfileData, { setSubmitting }: FormikHelpers<UserProfileData>) => {
        setSubmitting(true);
        try {
            const updateData = {
                nombre: values.nombre,
                apellidos: values.apellidos,
                fechaNacimiento: values.fechaNacimiento,
                genero: values.genero,
                peso: values.peso ? Number(values.peso) : null,
                estatura: values.estatura ? Number(values.estatura) : null,
                objetivo: values.objetivo,
                nivelExperiencia: values.nivelExperiencia,
                profileComplete: true,
            };
            console.log(updateData);

            const result = await updateUser(updateData);

            if (result && !result.error) {
                Alert.alert('Perfil actualizado correctamente.');
                router.push('/(auth)/profile');
            } else {
                Alert.alert(
                    'Error al actualizar el perfil',
                    result?.msg || 'Hubo un problema al actualizar el perfil.',
                    [{ text: 'OK', style: 'destructive' }],
                    { cancelable: false }
                );
            }
        } catch (error: any) {
            const errorMessage = error.message || 'Ocurrió un error inesperado al actualizar el perfil.';
            Alert.alert(
                'Error Inesperado',
                errorMessage,
                [{ text: 'OK', style: 'destructive' }],
                { cancelable: false }
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <View style={styles.header}>
                    <BackButton />
                    <Text style={styles.title}>Editar Perfil</Text>
                    <View style={{ width: 24 }} />
                </View>
                <Formik
                    initialValues={initialValues}
                    validationSchema={updateSchema}
                    onSubmit={handleUpdateProfile}
                    enableReinitialize
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <View>
                            <AuthInput
                                label="Nombre"
                                placeholder="Tu nombre"
                                value={values.nombre}
                                onChangeText={handleChange('nombre')}
                                error={touched.nombre && errors.nombre}
                            />
                            <AuthInput
                                label="Apellidos"
                                placeholder="Tus apellidos"
                                value={values.apellidos}
                                onChangeText={handleChange('apellidos')}
                                error={touched.apellidos && errors.apellidos}
                            />
                            <AuthInput
                                label="Fecha de Nacimiento (YYYY-MM-DD)"
                                placeholder="YYYY-MM-DD"
                                value={values.fechaNacimiento}
                                onChangeText={handleChange('fechaNacimiento')}
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

                            <AuthButton title="Guardar Cambios" onPress={handleSubmit} disabled={isSubmitting} />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    )
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#374151',
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
    errorText: {
        color: '#ef4444',
    }
});
