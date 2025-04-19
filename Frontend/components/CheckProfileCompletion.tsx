import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

import { profileStatus} from '../app/services/auth';




const CheckProfileCompletion = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const profile = await profileStatus();
                if(profile){
                    router.push('/(tabs)/home');
                    console.log(profile) 
                } else {
                    router.push('/(auth)/additionalInfo'); 
                    console.log(profile)
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
        return <ActivityIndicator size="large" color="#bbf7d0" />; 
    }

    if (error) {
        console.error('Error al verificar el perfil:', error);

        return null;
    }

    return null; 
};

export default CheckProfileCompletion;