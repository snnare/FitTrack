import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function IndexScreen() {
  
  return(
    <Redirect href="/(auth)/register-step1" />
  )
}
