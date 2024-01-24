import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../services/ApiService';

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const image1 = require('../assets/imajeFotbool.png');

  const handleLogin = async () => {
    if (!(name || email) || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    

    try {
      const response = await loginUser(email || name, password);
      console.log(response.data);
      navigation.navigate('Welcome', { username: name });

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <View style={styles.container}>
       <Image source={image1} style={styles.image} />
      <Text style={styles.title}>Login Screen</Text>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 18 }}>
          No tienes una cuenta? Regístrate
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nombre o Correo Electrónico"
        value={name}
        onChangeText={(text) => {
          if (text.includes("@")) {
            setEmail(text);
          } else {
            setName(text);
          }
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  image: {
    width: 390,
    height: 382,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    color: '#84A2C5',
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: 339,
    height: 39,
    borderRadius: 10,
    backgroundColor: '#F3F3F3',
    color: '#666161',
    fontSize: 15,
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
  },
  registerButton: {
    marginBottom: 10,
  },
  loginButton: {
    width: 359,
    height: 59,
    borderRadius: 15,
    backgroundColor: '#84A2C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
