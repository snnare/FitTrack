// components/common/BackButton.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface BackButtonProps {
  to?: string;
  label?: string;
}

export default function BackButton({ to = '/(tabs)/profile', label = 'Volver' }: BackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(to)} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#374151',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#22c55e',
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
},
});
