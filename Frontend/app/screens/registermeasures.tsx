import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { metricaSchema } from '../validations/metricaSchema';
import { registerMetrica } from '../services/metrica';
import { useRouter } from 'expo-router';
import BackButton from '../../components/utils/BackButton';

export default function registerMeasuresScreen () {
    const router = useRouter();

    const handleSubmitMetrica = async (values: any) => {
        try {
            await registerMetrica(values); 
            Alert.alert('Éxito', 'Medidas registradas correctamente.');
        } catch (error: any) {
            Alert.alert('Error', error?.response?.data?.message || 'Hubo un error al registrar las medidas.');
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BackButton to='/(tabs)/add'/>
            <Text style={styles.logo}>Metricas</Text>
            <Text style={styles.subtitle}>Ingrese sus medidas corporales</Text>
            <Formik
                initialValues={{
                    peso: '',
                    altura: '',
                    cintura: '',
                    cadera: '',
                    pecho: '',
                    muslo: '',
                    pantorrilla: '',
                    brazoRelajado: '',
                    brazoFlexionado: '',
                    porcentajeGrasaCorporal: '',
                    notas: '',
                }}
                validationSchema={metricaSchema}
                onSubmit={handleSubmitMetrica}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
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
                            style={styles.input}
                            placeholder="Altura (cm)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('altura')}
                            onBlur={handleBlur('altura')}
                            value={values.altura}
                        />
                        {touched.altura && errors.altura && <Text style={styles.error}>{errors.altura}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Cintura (cm)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('cintura')}
                            onBlur={handleBlur('cintura')}
                            value={values.cintura}
                        />
                        {touched.cintura && errors.cintura && <Text style={styles.error}>{errors.cintura}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Cadera (cm)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('cadera')}
                            onBlur={handleBlur('cadera')}
                            value={values.cadera}
                        />
                        {touched.cadera && errors.cadera && <Text style={styles.error}>{errors.cadera}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Pecho (cm)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('pecho')}
                            onBlur={handleBlur('pecho')}
                            value={values.pecho}
                        />
                        {touched.pecho && errors.pecho && <Text style={styles.error}>{errors.pecho}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Muslo (cm)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('muslo')}
                            onBlur={handleBlur('muslo')}
                            value={values.muslo}
                        />
                        {touched.muslo && errors.muslo && <Text style={styles.error}>{errors.muslo}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Pantorrilla (cm)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('pantorrilla')}
                            onBlur={handleBlur('pantorrilla')}
                            value={values.pantorrilla}
                        />
                        {touched.pantorrilla && errors.pantorrilla && <Text style={styles.error}>{errors.pantorrilla}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Brazo Relajado (cm)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('brazoRelajado')}
                            onBlur={handleBlur('brazoRelajado')}
                            value={values.brazoRelajado}
                        />
                        {touched.brazoRelajado && errors.brazoRelajado && <Text style={styles.error}>{errors.brazoRelajado}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Brazo Flexionado (cm)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('brazoFlexionado')}
                            onBlur={handleBlur('brazoFlexionado')}
                            value={values.brazoFlexionado}
                        />
                        {touched.brazoFlexionado && errors.brazoFlexionado && <Text style={styles.error}>{errors.brazoFlexionado}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Porcentaje de Grasa Corporal (%) (opcional)"
                            placeholderTextColor="#d1d5db"
                            keyboardType="numeric"
                            onChangeText={handleChange('porcentajeGrasaCorporal')}
                            onBlur={handleBlur('porcentajeGrasaCorporal')}
                            value={values.porcentajeGrasaCorporal}
                        />
                        {touched.porcentajeGrasaCorporal && errors.porcentajeGrasaCorporal && <Text style={styles.error}>{errors.porcentajeGrasaCorporal}</Text>}

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

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Registrar Medidas</Text>
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
});