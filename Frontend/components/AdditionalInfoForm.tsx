import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { Formik } from 'formik';
import { updateSchema } from '../app/validations/userSchema'; // Ajusta la ruta
import { postRegister } from '../app/services/auth'; // Ajusta la ruta
import { useRouter, useLocalSearchParams } from 'expo-router';



interface AdditionalInfoFormProps {
    onProfileComplete: () => void; // Callback para indicar que el perfil se completó
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ onProfileComplete }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { correo } = useLocalSearchParams<{ correo: string }>();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const userData = {
                correo: correo,
                nombre: values.nombre,
                apellidos: values.apellidos,
                fechaNacimiento: values.fechaNacimiento,
                genero: values.genero,
                peso: parseFloat(values.peso),
                estatura: parseFloat(values.estatura),
                objetivo: values.objetivo,
                nivelExperiencia: values.nivelExperiencia,
                profileComplete: true, // Marcamos el perfil como completo
            };
            await postRegister(userData);
            Alert.alert('Éxito', 'Información adicional registrada.');
            onProfileComplete(); // Llama al callback para indicar que el perfil se completó
            router.push('/(tabs)/home');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Hubo un problema registrando la información.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{
                nombre: '',
                apellidos: '',
                fechaNacimiento: '',
                genero: '',
                peso: '',
                estatura: '',
                objetivo: '',
                nivelExperiencia: 'Principiante',
            }}
            validationSchema={updateSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Completa tu Perfil</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        onChangeText={handleChange('nombre')}
                        onBlur={handleBlur('nombre')}
                        value={values.nombre}
                        placeholderTextColor="#d1d5db"
                    />
                    {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Apellidos"
                        onChangeText={handleChange('apellidos')}
                        onBlur={handleBlur('apellidos')}
                        value={values.apellidos}
                        placeholderTextColor="#d1d5db"
                    />
                    {errors.apellidos && <Text style={styles.error}>{errors.apellidos}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
                        onChangeText={handleChange('fechaNacimiento')}
                        onBlur={handleBlur('fechaNacimiento')}
                        value={values.fechaNacimiento}
                        placeholderTextColor="#d1d5db"
                    />
                    {errors.fechaNacimiento && <Text style={styles.error}>{errors.fechaNacimiento}</Text>}

                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>Género</Text>
                        <Picker
                            selectedValue={values.genero}
                            style={styles.picker}
                            onValueChange={(itemValue) => handleChange('genero')(itemValue)}
                        >
                            <Picker.Item label="Selecciona género" value="" />
                            <Picker.Item label="Masculino" value="Masculino" />
                            <Picker.Item label="Femenino" value="Femenino" />
                        </Picker>
                        {errors.genero && <Text style={styles.error}>{errors.genero}</Text>}
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Peso (kg)"
                        keyboardType="numeric"
                        onChangeText={handleChange('peso')}
                        onBlur={handleBlur('peso')}
                        value={values.peso}
                        placeholderTextColor="#d1d5db"
                    />
                    {errors.peso && <Text style={styles.error}>{errors.peso}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Estatura (cm)"
                        keyboardType="numeric"
                        onChangeText={handleChange('estatura')}
                        onBlur={handleBlur('estatura')}
                        value={values.estatura}
                        placeholderTextColor="#d1d5db"
                    />
                    {errors.estatura && <Text style={styles.error}>{errors.estatura}</Text>}

                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>Objetivo</Text>
                        <Picker
                            selectedValue={values.objetivo}
                            style={styles.picker}
                            onValueChange={(itemValue) => handleChange('objetivo')(itemValue)}
                        >
                            <Picker.Item label="Selecciona objetivo" value="" />
                            <Picker.Item label="Ganar peso" value="Ganar peso" />
                            <Picker.Item label="Perder peso" value="Perder peso" />
                            <Picker.Item label="Definir" value="Definir" />
                            <Picker.Item label="Mantener" value="Mantener" />
                        </Picker>
                        {errors.objetivo && <Text style={styles.error}>{errors.objetivo}</Text>}
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text style={styles.label}>Nivel de Experiencia</Text>
                        <Picker
                            selectedValue={values.nivelExperiencia}
                            style={styles.picker}
                            onValueChange={(itemValue) => handleChange('nivelExperiencia')(itemValue)}
                        >
                            <Picker.Item label="Principiante" value="Principiante" />
                            <Picker.Item label="Intermedio" value="Intermedio" />
                            <Picker.Item label="Avanzado" value="Avanzado" />
                        </Picker>
                        {errors.nivelExperiencia && <Text style={styles.error}>{errors.nivelExperiencia}</Text>}
                    </View>

                    <Button onPress={handleSubmit} title={loading ? 'Guardando...' : 'Guardar Información'} disabled={loading} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#111827' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#bbf7d0' },
    input: { borderWidth: 1, borderColor: '#86efac', padding: 10, marginBottom: 10, borderRadius: 8, backgroundColor: '#fff', color: '#000' },
    error: { color: '#ef4444', marginBottom: 8 },
    pickerContainer: { marginBottom: 10 },
    label: { fontWeight: 'bold', marginBottom: 5, color: '#d1d5db' },
    picker: { borderWidth: 1, borderColor: '#86efac', borderRadius: 8, backgroundColor: '#fff', color: '#000' },
});

export default AdditionalInfoForm;