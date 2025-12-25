import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { colors, typography, layout } from '../components/styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Login Error', 'Please enter both email and password.');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Login Error', error.message);
      });
  };

  return (
    <View style={layout.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton title="Login" onPress={handleLogin} />
      <CustomButton
        title="Don't have an account? Register"
        onPress={() => navigation.navigate('Register')}
        style={styles.secondaryButton}
        textStyle={styles.secondaryButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: 40,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});

export default LoginScreen;
