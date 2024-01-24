import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WelcomeScreen = ({ route, navigation }) => {
  const { username } = route.params;

  const handleLogout = () => {
    navigation.navigate('Login');
  };
    const handleGoAudio = () => {
    navigation.navigate('Audio');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`¡Bienvenido, ${username}! Con esta aplicación, podrás crear grabaciones y guardarlas fácilmente para que puedas escucharlas en el futuro. ¡Registra tus momentos con facilidad y disfruta de tus grabaciones cuando quieras!`}</Text>
      
      <TouchableOpacity 
      onPress={handleGoAudio} 
      style={styles.goAudio}>
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Ir a grabadora de voz</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={handleLogout} 
      style={styles.logoutButton}>
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Cerrar secion</Text>
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
  logoutButton: {
    width: 359,
    height: 59,
    borderRadius: 15,
    backgroundColor: '#84A2C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  goAudio: {
    width: 359,
    height: 59,
    borderRadius: 15,
    backgroundColor: '#84A2C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});

export default WelcomeScreen;
