import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import api from '../utils/api';

const Register = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const [nombre_completo, setNombre_Completo] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const emailValidator = (correo) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(correo);
  };

  const handleRegister = async () => {
    if (!nombre_completo || !correo || !telefono || !contraseña) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!emailValidator(correo)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (contraseña.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      const response = await api.post('/auth/register', { nombre_completo, correo, telefono, contraseña });
      if (response.data.success) {
        Alert.alert('Registro exitoso!');
        setNombre_Completo('');
        setCorreo('');
        setTelefono('');
        setContraseña('');
        navigation.navigate('Login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error al registrar. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#4ba961" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ backgroundColor: "#fffafa", width: "90%", padding: 30, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 39, color: "#1c1919", fontWeight: "bold", textAlign: "center", marginBottom: 50 }}>Registrar</Text>
          
          <TextInput
            style={{ height: 50, backgroundColor: "#e9e9e9", borderRadius: 5, marginBottom: 20, paddingHorizontal: 15, fontSize: 15, width: "100%", fontFamily: "Poppins_400Regular" }}
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={nombre_completo}
            onChangeText={setNombre_Completo}
          />
          
          <TextInput
            style={{ height: 50, backgroundColor: "#e9e9e9", borderRadius: 5, marginBottom: 20, paddingHorizontal: 15, fontSize: 15, width: "100%", fontFamily: "Poppins_400Regular" }}
            placeholder="Correo"
            placeholderTextColor="#888"
            value={correo}
            onChangeText={setCorreo}
          />
          
          <TextInput
            style={{ height: 50, backgroundColor: "#e9e9e9", borderRadius: 5, marginBottom: 20, paddingHorizontal: 15, fontSize: 15, width: "100%", fontFamily: "Poppins_400Regular" }}
            placeholder="Teléfono"
            placeholderTextColor="#888"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="numeric"
          />
          
          <TextInput
            style={{ height: 50, backgroundColor: "#e9e9e9", borderRadius: 5, marginBottom: 20, paddingHorizontal: 15, fontSize: 15, width: "100%", fontFamily: "Poppins_400Regular" }}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry={true}
            value={contraseña}
            onChangeText={setContraseña}
          />

          {error ? (
            <Text style={{ color: 'red', marginBottom: 10, fontFamily: "Poppins_400Regular" }}>{error}</Text>
          ) : null}

          <View style={{ height: 20 }} />
          
          <TouchableOpacity style={{ backgroundColor: "#67a0ff", padding: 13, borderRadius: 20, alignItems: "center", width: "100%" }} onPress={handleRegister}>
            <Text style={{ color: "#fffafa", fontSize: 20, fontWeight: "bold" }}>Registrar</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 50 }}>
            <Text>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#67a0ff", textDecorationLine: "underline", fontFamily: "Poppins_400Regular" }}>Ingrese Aquí</Text>
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
