import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

const Register = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const emailValidator = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (!name || !email || !phone || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!emailValidator(email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setError('');
    alert('Registro exitoso!');
    
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');

    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Registrar</Text>
          
          {/* Nombre */}
          <TextInput
            style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          
          {/* Correo */}
          <TextInput
            style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
            placeholder="Correo"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
          
          {/* Teléfono */}
          <TextInput
            style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
            placeholder="Teléfono"
            placeholderTextColor="#888"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />
          
          {/* Contraseña */}
          <TextInput
            style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          {/* Mensaje de error */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <View style={styles.spacer} />
          
          {/* Botón de registro */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Registrar</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Ingrese Aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4ba961", //verde
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "#fffafa", //fondo blanco
    width: "90%",
    padding: 30, 
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 39,
    color: "#1c1919", // Negro
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50, // Separación del título
  },
  input: {
    height: 50, // Altura del input
    backgroundColor: "#e9e9e9", // Gris
    borderRadius: 5,
    marginBottom: 20, // Separación entre inputs
    paddingHorizontal: 15,
    fontSize: 15,
    width: "100%",
  },
  spacer: {
    height: 20, //espacio entre los inputs y el boton
  },
  registerButton: {
    backgroundColor: "#67a0ff", //azul
    padding: 13,
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  registerButtonText: {
    color: "#fffafa", // Blanco
    fontSize: 20,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 50, //separacion del texto de inicio de sesion
  },
  link: {
    color: "#67a0ff",
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  }
});

export default Register;
