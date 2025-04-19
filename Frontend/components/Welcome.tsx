import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getProfileUser } from '../app/services/auth';

const Welcome = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [userGender, setUserGender] = useState<'Masculino' | 'Femenino' | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const profile = await getProfileUser(); // Llama a getProfileUser sin argumentos
                setUserName(profile.nombre || null);
                setUserGender(profile.genero || null);
            } catch (err: any) {
                setError(err.message || 'Error al cargar el perfil');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <Text style={styles.loading}>Cargando saludo...</Text>;
    }

    if (error) {
        return <Text style={styles.error}>Error al cargar el saludo: {error}</Text>;
    }

    return (
        <Text style={styles.title}>
            {userGender === 'Femenino' ? 'Bienvenida' : 'Bienvenido'} {userName || 'Usuario'}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        color: '#bbf7d0',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    loading: {
        color: '#d1d5db',
        textAlign: 'center',
        marginBottom: 20,
    },
    error: {
        color: '#ef4444',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default Welcome;