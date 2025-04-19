import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getStreak } from '../app/services/streak'; // Asegúrate de que esta ruta sea correcta
const StreakDisplay = () => {
    const [streakData, setStreakData] = useState<{ currentStreak: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStreak = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getStreak();
                setStreakData(data);
            } catch (err: any) {
                setError(err.message || 'Error al cargar la racha.');
                setStreakData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchStreak();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#bbf7d0" />
                <Text style={styles.loadingText}>Cargando racha...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (streakData) {
        return (
            <View style={styles.container}>
                <Text style={styles.streakText}>🔥 Racha actual: {streakData.currentStreak} días</Text>
            </View>
        );
    }

    return null; // Si no hay datos ni error
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    streakText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#facc15', // Amarillo/dorado para el fuego
    },
    loadingText: {
        color: '#d1d5db',
        marginTop: 5,
    },
    errorText: {
        color: '#ef4444',
    },
});

export default StreakDisplay;

