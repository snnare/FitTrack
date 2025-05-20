import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getProfileUser } from '../../app/services/users';
import { useNavigation } from 'expo-router';

const maleIcon = require('../../assets/man-profile-icon.png');
const femaleIcon = require('../../assets/women-profile-icon.png');

interface UserProfile {
    nombre?: string;
    correo: string;
    objetivo: string;
    nivelExperiencia: string;
    genero: string;
}

const UserProfileHeader: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [logCount, setLogCount] = useState<number>(0);
    const [streak, setStreak] = useState<number | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const userData = await getProfileUser();
                setUserProfile(userData);
            } catch (err: any) {
                setError(err.message || 'Error al obtener el perfil del usuario');
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    const getInitials = (name?: string) => {
        if (!name) return '??';
        const names = name.split(' ');
        let initials = '';
        for (let i = 0; i < Math.min(2, names.length); i++) {
            initials += names[i][0].toUpperCase();
        }
        return initials;
    };

    const getProfileImageSource = () => {
        return userProfile?.genero === 'Masculino' ? maleIcon : femaleIcon;
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando perfil...</Text>
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

    if (!userProfile) {
        return (
            <View style={styles.container}>
                <Text>No se pudo cargar el perfil del usuario.</Text>
            </View>
        );
    }

    const initials = getInitials(userProfile.nombre);
    const profileImageSource = getProfileImageSource();

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={profileImageSource} style={styles.profileImage} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{userProfile.nombre || 'Nombre Desconocido'}</Text>
                <Text style={styles.email}>{userProfile.correo}</Text>
                <Text style={styles.infoText}>
                    <Text style={{ fontWeight: 'bold' }}>Objetivo: </Text>
                    {userProfile.objetivo || 'No definido'}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={{ fontWeight: 'bold' }}>Nivel: </Text>
                    {userProfile.nivelExperiencia || 'No definido'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#1f2937',
        borderRadius: 8,
        marginBottom: 20,
    },
    imageContainer: {
        position: 'relative',
        marginRight: 15,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,  // Cambiado a 60 para hacerlo completamente redondo
        borderWidth: 2,
        borderColor: '#6ee7b7',
        resizeMode: 'contain',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#d1d5db',
        marginBottom: 5
    },
    infoText: {
        fontSize: 16,
        color: '#d1d5db',
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3b82f6',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    errorText: {
        color: '#ef4444',
    },
});

export default UserProfileHeader;
