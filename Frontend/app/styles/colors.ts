import { StyleSheet } from 'react-native';

const colors = StyleSheet.create({
  primary: { color: '#22c55e' },           // Verde lima
  primaryLight: { color: '#86efac' },      // Verde menta
  primaryDark: { color: '#15803d' },       // Verde oscuro

  background: { backgroundColor: '#f0fdf4' }, // Fondo general
  card: { backgroundColor: '#ffffff' },       // Tarjetas, inputs

  textPrimary: { color: '#1f2937' },       // Texto principal
  textSecondary: { color: '#6b7280' },     // Texto secundario

  success: { color: '#4ade80' },           // Mensajes de éxito
  error: { color: '#ef4444' },             // Mensajes de error

  accent: { color: '#38bdf8' },            // Color opcional (azul claro)
});
export default colors;
