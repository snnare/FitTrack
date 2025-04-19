import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Formik } from 'formik';


import { updateSchema } from '../validations/userSchema';
import { postRegister } from '../services/auth';


export default function AdditionalInfo() {


  return (
   <View style={styles.container}>
    <Text style={styles.title}>Información Adicional</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 },
  error: { color: 'red', marginBottom: 8 },
  pickerContainer: { marginBottom: 10 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
});
