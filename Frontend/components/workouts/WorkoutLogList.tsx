import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Props {
    logs: {
        id: string;
        fecha: string;
        ejercicio: string;
        series: number;
        repeticiones: number;
        peso: number;
    }[];
}

const WorkoutLogList: React.FC<Props> = ({ logs }) => {
    return (
        <FlatList
            data={logs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.logItem}>
                    <Text style={styles.logTitle}>{item.ejercicio}</Text>
                    <Text style={styles.logDetail}>
                        {item.series}x{item.repeticiones} - {item.peso} kg
                    </Text>
                    <Text style={styles.logDate}>{item.fecha?.split('T')[0] || 'Fecha no disponible'}</Text>
                </View>
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