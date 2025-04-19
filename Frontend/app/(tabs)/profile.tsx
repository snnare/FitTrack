import React from 'react';
import { View } from 'react-native';
import AdditionalInfoForm from '../../components/AdditionalInfoForm';
import { useRouter } from 'expo-router';

export default function additionalInfoScreen() {
    const router = useRouter();

    const handleProfileComplete = () => {
        // Puedes realizar alguna acción adicional aquí si es necesario
        console.log('Perfil completado, navegando a Home');
    };

    return (
        <View style={{ flex: 1 }}>
            <AdditionalInfoForm onProfileComplete={handleProfileComplete} />
        </View>
    );
}