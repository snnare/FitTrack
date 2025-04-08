import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="add_log"
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#22c55e', // verde principal
      }}
    >
      <Tabs.Screen
        name="add_log"
        options={{
          title: 'Agregar Log',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Puedes añadir más pantallas si deseas */}
      {/* <Tabs.Screen name="profile" options={{ title: 'Perfil' }} /> */}
    </Tabs>
  );
}
