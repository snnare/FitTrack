import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCountLogs } from '../../app/services/log';
import { getStreak } from '../../app/services/streak';

const UserStats: React.FC = () => {
    const [streak, setStreak] = useState<number>(0);
    const [logCount, setLogCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const streakData = await getStreak();
                setStreak(streakData?.currentStreak || 0);
                const logsData = await getCountLogs();
                setLogCount(logsData?.count || 0);
                setError(null);
            } catch (err: any) {
                console.error('Error al obtener datos:', err.message);
                setError(err.message || 'Error al obtener datos.');
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.statsContainer}>
            <Text style={styles.statsText}>
                🔥 Racha actual: <Text style={styles.statsCount}>{streak}</Text> {streak === 1 ? 'día' : 'días'}
            </Text>
            <Text style={styles.statsText}>
                🏋️‍♂️ Ejercicios registrados: <Text style={styles.statsCount}>{logCount}</Text>
            </Text>
            <Text style={styles.statsText}>
                📅 Días activos (este mes): <Text style={styles.statsCount}>{logCount}</Text> {logCount === 1 ? 'día' : 'días'}
            </Text>
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingVertical: 16, // Añadido padding vertical
    },
    statsText: {
        fontSize: 18,  // Aumentado tamaño de fuente
        color: '#e5e7eb', // Cambiado color de texto para mejor contraste
        marginBottom: 12, // Aumentado margen inferior
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: 28, // Aumentado el interlineado para mejor legibilidad
    },
    statsCount: {
        color: '#86efac', // Cambiado a un verde más claro y vibrante
        fontWeight: 'semibold', // Añadido semibold
        fontSize: 20, // Aumentado tamaño de fuente del conteo
    },
    errorText: {
        color: '#f87171', // Cambiado a un rojo más intenso
        marginTop: 10,
        fontSize: 16, // Aumentado tamaño de fuente del error
        fontWeight: 'medium'
    },
});

export default UserStats;
