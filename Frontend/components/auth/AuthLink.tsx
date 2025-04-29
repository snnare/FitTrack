// AuthLink.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AuthLinkProps {
  title: string;
  onPress: () => void;
}

const AuthLink: React.FC<AuthLinkProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.link} onPress={onPress}>
      <Text style={styles.link}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#38bdf8',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default AuthLink;