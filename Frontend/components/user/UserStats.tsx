import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCountLogs } from '../../app/services/log';
import { getStreak } from '../../app/services/streak';

const UserStats: React.FC = () => {
    const [streak, setStreak] = useState<number>(0); // Valor por defecto 0
    const [logCount, setLogCount] = useState<number>(0); // Valor por defecto 0
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const streakData = await getStreak();
                setStreak(streakData?.currentStreak || 0); // Usa 0 si streakData es null o undefined
                const logsData = await getCountLogs();
                setLogCount(logsData?.count || 0); // Usa 0 si logsData es null o undefined
                setError(null); // Limpia cualquier error previo si la carga es exitosa
            } catch (err: any) {
                console.error('Error al obtener datos:', err.message);
                setError(err.message || 'Error al obtener datos.');
                // En caso de error, mantenemos los valores por defecto (0)
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
                📅 Días activos (este mes): <Text style={styles.statsCount}>{streak}</Text> {streak === 1 ? 'día' : 'días'}
            </Text>
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        width: '100%',
        alignItems: 'flex-start',
    },
    statsText: {
        fontSize: 16,
        color: '#d1d5db',
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    statsCount: {
        color: '#6ee7b7',
    },
    errorText: {
        color: '#ef4444',
        marginTop: 5,
    },
});

export default UserStats;