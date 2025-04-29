import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface StreakProps {
  streak: number | null;
}

const Streak: React.FC<StreakProps> = ({ streak }) => {
  const streakImage =
    streak !== null && streak > 0
      ? require('../../assets/Streak/streak-n.png') 
      : require('../../assets/Streak/streak-0.png');

  return (
    <View style={styles.container}>
      <Image source={streakImage} style={styles.streakImage} />
      <Text style={styles.streakText}>
        🔥 Racha actual: <Text style={styles.streakCount}>{streak !== null ? streak : 0}</Text> {streak === 1 ? 'día' : 'días'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  streakImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  streakText: {
    fontSize: 18,
    color: '#d1d5db',
    fontWeight: 'bold',
    marginTop: 5,
  },
  streakCount: {
    color: '#22c55e',
  },
});

export default Streak;
