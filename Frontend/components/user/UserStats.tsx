import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCountLogs } from '../../app/services/log';
import { getStreak } from '../../app/services/streak';

const UserStats: React.FC = () => {
  const [streak, setStreak] = useState<number | null>(null);
  const [logCount, setLogCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const streakData = await getStreak();
        const logsData = await getCountLogs();
        setStreak(streakData.currentStreak);
        setLogCount(logsData.count);
      } catch (err: any) {
        setError(err.message || 'Error al obtener datos.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <View style={styles.statsContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsText}>
        🔥 Racha actual: <Text style={styles.statsCount}>{streak !== null ? streak : 0}</Text> {streak === 1 ? 'día' : 'días'}
      </Text>
      <Text style={styles.statsText}>
        🏋️‍♂️ Ejercicios registrados: <Text style={styles.statsCount}>{logCount}</Text>
      </Text>
      <Text style={styles.statsText}>
        📅 Días activos (este mes): <Text style={styles.statsCount}>17</Text>
      </Text>
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
  },
});

export default UserStats;
