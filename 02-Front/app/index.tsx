import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(auth)/register');
  }, []);

  return null;
}
