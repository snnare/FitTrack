import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <>
    <Stack>
      
      <Stack.Screen name="register-step1" options={{ title: 'Crear cuenta' }} />
      <Stack.Screen name="register-step2" options={{ title: 'Datos personales' }} />
    </Stack>
  </>
  )
}
