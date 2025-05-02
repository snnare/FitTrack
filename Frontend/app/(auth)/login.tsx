import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';

// Importa el hook de autenticación
import { useAuth } from '../context/authContext';
// Schema de validación para el formulario de inicio de sesión
import { registerAndLoginSchema } from '../validations/registerAndLoginSchema';
// Interface para los datos de inicio de sesión
import { LoginData } from "../types/login";

// Componentes personalizados para la entrada de texto, botón y enlace
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import AuthLink from '../../components/auth/AuthLink';


// Logo de la aplicación
const logo = require('../../assets/logo.png');

export default function LoginScreen() {
    const router = useRouter();
    const { onLogin } = useAuth();
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleLogin = async (values: LoginData) => {
        setLoginError(null);
        try {
            const result = await onLogin(values);
            if (result?.error) {
                Alert.alert(
                    'Error al iniciar sesión',
                    result.msg || 'Credenciales inválidas', // Usa el mensaje del contexto
                    [
                        { text: 'OK', style: 'default' },
                    ],
                    { cancelable: false }
                );
                setLoginError(result.msg);
            } else {
                router.push('/(tabs)/home');
            }
        } catch (error: any) {
            Alert.alert(
                'Error Inesperado',
                error.message || 'Ocurrió un error inesperado.',
                [
                    { text: 'OK', style: 'default' },
                ],
                { cancelable: false }
            );
            setLoginError(error.message);
        }
    };

    return (

        <SafeAreaView style={styles.safeArea}>
            <Formik
                initialValues={{ correo: '', password: '' }}
                validationSchema={registerAndLoginSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.container}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.subtitle}>
                            Fittrack</Text>
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
                        <AuthButton title="Ingresar" onPress={handleSubmit} />
                        <AuthLink title="¿Olvidaste tu contraseña?" onPress={() => router.push('/forgotpassword')} />
                        <AuthLink title="¿No tienes cuenta? Regístrate" onPress={() => router.push('/(auth)/register')} />
                         {loginError && (
                            <Text style={styles.error}>{loginError}</Text> // Muestra el error aquí
                        )}
                    </View>
                )}
            </Formik>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#111827',
        flex: 1,
        justifyContent: 'center',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#111827',
    },
    subtitle: {
        fontSize: 14,
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
    error: {
        color: '#ef4444', // Color de error
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});
