import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getProfileUser } from '../app/services/auth';
import { getStreak } from '../app/services/streak';

export default function UserHeader() {
  const [userName, setUserName] = useState<string>('Usuario');
  const [userGender, setUserGender] = useState<'Masculino' | 'Femenino' | null>(null);
  const [streak, setStreak] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profile, streakData] = await Promise.all([getProfileUser(), getStreak()]);
        setUserName(profile.nombre || 'Usuario');
        setUserGender(profile.genero || null);
        setStreak(streakData.currentStreak || 0);
      } catch (err: any) {
        setError(err.message || 'Error al cargar datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#bbf7d0" />
        <Text style={styles.loadingText}>Cargando información...</Text>
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

  return (
    <View style={styles.container}>
      {/* Puedes reemplazar este emoji por una imagen/gif animado */}
      {/* <Image source={require('../assets/fire.gif')} style={styles.fireGif} /> */}

      <Text style={styles.streakText}>
        🔥 Racha actual: <Text style={styles.highlight}>{streak}</Text> {streak === 1 ? 'día' : 'días'}
      </Text>
      <Text style={styles.welcomeText}>
        {userGender === 'Femenino' ? 'Bienvenida' : 'Bienvenido'} <Text style={styles.username}>{userName}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1f2937',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: '#bbf7d0',
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
  },
  username: {
    color: '#6ee7b7',
  },
  streakText: {
    fontSize: 16,
    color: '#facc15',
    fontWeight: 'bold',
  },
  highlight: {
    color: '#fde68a',
  },
  loadingText: {
    color: '#d1d5db',
    marginTop: 5,
  },
  errorText: {
    color: '#ef4444',
  },
  // fireGif: {
  //   width: 40,
  //   height: 40,
  //   marginBottom: 8,
  // },
});
