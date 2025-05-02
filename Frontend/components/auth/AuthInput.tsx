import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

interface AuthInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur: () => void;
    error?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'email-address' | 'numeric' | 'default';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}


const AuthInput: React.FC<AuthInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    error,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
  }) => {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    label: {
      marginBottom: 5,
      color: '#d1d5db', 
    },
    input: {
      borderWidth: 1,
      borderColor: '#86efac',
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: '#fff',
      color: '#000',
    },
    error: {
      color: '#ef4444',
      fontSize: 12,
    },
  });
  
  export default AuthInput;