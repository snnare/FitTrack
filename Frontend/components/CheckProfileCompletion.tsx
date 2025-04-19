import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

import { getProfileUser } from '../app/services/auth';




const CheckProfileCompletion = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const profile = await getProfileUser();
                if (!profile?.profileComplete) {
                    router.replace('/(auth)/additionalInfo'); 
                }
            } catch (err: any) {
                setError(err.message || 'Error al verificar el perfil');
            } finally {
                setLoading(false);
            }
        };

        checkProfile();
    }, [router]);

    if (loading) {
        return <ActivityIndicator size="large" color="#bbf7d0" />; // Muestra un indicador de carga mientras se verifica
    }

    if (error) {
        console.error('Error al verificar el perfil:', error);

        return null;
    }

    return null; 
};

export default CheckProfileCompletion;