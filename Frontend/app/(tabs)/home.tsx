import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import UserStreak from '../../components/user/UserStreak';
import WorkoutLogList from '../../components/workouts/WorkoutLogList';
import LoadingIndicator from '../../components/feedback/LoadingIndicator';
import ErrorScreen from '../../components/feedback/ErrorScreen';
import { getAllLogs } from '../services/log';
import { getStreak } from '../services/streak';
import { Log } from '../types/logs';
import { router } from 'expo-router';

export default function HomeScreen() {
    const [logs, setLogs] = useState([]);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const [errorLogs, setErrorLogs] = useState<string | null>(null);
    const [streak, setStreak] = useState<number | null>(null);
    const [loadingStreak, setLoadingStreak] = useState(true);
    const [errorStreak, setErrorStreak] = useState<string | null>(null);

    const fetchLogs = async () => {
        setLoadingLogs(true);
        setErrorLogs(null);
        try {
            const logsData = await getAllLogs();
            setLogs(logsData.data || []);
        } catch (err: any) {
            setErrorLogs(err.message || 'Error al cargar los entrenamientos');
        } finally {
            setLoadingLogs(false);
        }
    };

    const fetchStreak = async () => {
        setLoadingStreak(true);
        setErrorStreak(null);
        try {
            const streakData = await getStreak();
            setStreak(streakData.currentStreak || 0);
        } catch (err: any) {
            // Verifica si el error indica un 404 (Not Found)
            if (err.message && err.message.includes('404')) {
                setStreak(0); // Establece la racha en 0 si es un 404
            } else {
                setErrorStreak(err.message || 'Error al cargar la racha');
            }
        } finally {
            setLoadingStreak(false);
        }
    };


    useEffect(() => {
        fetchLogs();
    }, []);

    useEffect(() => {
        fetchStreak();
    }, []);

    const handleReload = () => {
        fetchLogs();
        fetchStreak();
    };

    const handleLogsPress = (log: Log) => {
        router.push({
            pathname: '/screens/LogDetailScreen',
            params: { logId: log._id }
        })
    }
    if (loadingLogs || loadingStreak) {
        return <LoadingIndicator message="Cargando datos..." />;
    }

    if (errorLogs) {
        return (
            <ErrorScreen
                message={`Error al cargar los entrenamientos: ${errorLogs}`}
                onRetry={handleReload}
            />
        );
    }


    return (
        <View style={styles.container}>
            {/* MUestra la racha del usuario */}
            <UserStreak streak={streak} />

            <Text style={styles.subtitle}>Últimos Entrenamientos</Text>
            {logs.length > 0 ? (
                <WorkoutLogList
                    logs={logs}
                    onLogPress={handleLogsPress}
                />
            ) : (
                <Text style={styles.noDataText}>Sin registros de entrenamiento por el momento.</Text>
            )}
            <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
                <MaterialIcons name="refresh" size={24} color="#fff" />
                <Text style={styles.reloadButtonText}>Actualizar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#d1d5db',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    noDataText: {
        color: '#9ca3af',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    reloadButton: {
        backgroundColor: '#22c55e',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    reloadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});