import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Log {
  _id: string;
  userId: string;
  ejercicio: string;
  series: number;
  repeticiones: number;
  peso: number;
  notas: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Props {
  logs: Log[];
}

const WorkoutLogList: React.FC<Props> = ({ logs }) => {
  const router = useRouter();

  const handleLogPress = (log: Log) => {
    router.push({
      pathname: '/logDetail',
      params: { log: JSON.stringify(log) },
    });
  };

  return (
    <FlatList
      data={logs}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleLogPress(item)} style={styles.logItem}>
          <Text style={styles.logTitle}>{item.ejercicio}</Text>
          <Text style={styles.logDetail}>
            {item.series}x{item.repeticiones} - {item.peso} kg
          </Text>
          <Text style={styles.logDate}>{item.createdAt?.split('T')[0] || 'Fecha no disponible'}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  logItem: {
    backgroundColor: '#1f2937',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#374151',
  },
  logTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#86efac',
  },
  logDetail: {
    fontSize: 14,
    color: '#d1d5db',
  },
  logDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
});

export default WorkoutLogList;