import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../services/ApiService';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const { userData, setCookieHeader } = await registerUser(name, email, password);

      console.log(userData);
      console.log(setCookieHeader);

      navigation.navigate('Welcome', { username: name });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al registrar. Verifica tus datos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Regístrate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Ya tienes una cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    color: '#84A2C5',
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: 339,
    height: 59,
    borderRadius: 15,
    backgroundColor: '#F3F3F3',
    color: '#666161',
    fontSize: 15,
    marginTop: 10,
    padding: 10,
  },
  registerButton: {
    width: 359,
    height: 59,
    borderRadius: 15,
    backgroundColor: '#84A2C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginButton: {
    width: 359,
    height: 59,
    borderRadius: 30,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default RegisterScreen;
