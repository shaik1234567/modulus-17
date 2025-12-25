import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { colors, typography, layout } from '../components/styles';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Registration Error', 'Please enter both email and password.');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Registration Error', error.message);
      });
  };

  return (
    <View style={layout.container}>
      <Text style={styles.title}>Create Account</Text>
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
      <CustomButton title="Register" onPress={handleRegister} />
      <CustomButton
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
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
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});

export default RegisterScreen;
