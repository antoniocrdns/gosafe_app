import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import api from '../utils/api';

const Register = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const [nombre_completo, setNombre_Completo] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const emailValidator = (correo) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})*$/;
    const invalidCharsRegex = /[^\x00-\x7F]/;
    return !invalidCharsRegex.test(correo) && emailRegex.test(correo);
  };

  const phoneValidator = () => {
    const phoneRegex = /^\d+$/;
    return !/\s/.test(telefono) && phoneRegex.test(telefono) && telefono.length >= 10 && telefono.length <= 15;
  };

  const handleRegister = async () => {
    if (!nombre_completo || !correo || !telefono || !contraseña) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!emailValidator(correo)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (contraseña.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!phoneValidator(telefono)) {
      setError("Por favor ingresa un número de teléfono válido.");
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = { nombre_completo, correo, telefono, contraseña };
      const response = await api.post('/pasajeros', registrationData);

      if (response.data.message) {
        Alert.alert("Éxito", "¡Registro exitoso!");
        setNombre_Completo("");
        setCorreo("");
        setTelefono("");
        setContraseña("");
        navigation.navigate("Login");
      } else {
        setError(response.data.message || "Error al registrar. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError("Error al registrar. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Registrar</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={nombre_completo}
            onChangeText={setNombre_Completo}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor="#888"
            value={correo}
            onChangeText={setCorreo}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            placeholderTextColor="#888"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#888"
            secureTextEntry={true}
            value={contraseña}
            onChangeText={setContraseña}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fffafa" />
            ) : (
              <Text style={styles.registerButtonText}>Registrar</Text>
            )}
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4ba961",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: "#fffafa",
    width: "90%",
    padding: width * 0.08, // 8% del ancho de la pantalla
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.09, // 9% del ancho de la pantalla
    color: "#1c1919",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.06, // 6% del alto de la pantalla
  },
  input: {
    height: height * 0.07, // 7% del alto de la pantalla
    backgroundColor: "#e9e9e9",
    borderRadius: 5,
    marginBottom: height * 0.025, // 2.5% del alto de la pantalla
    paddingHorizontal: 15,
    fontSize: width * 0.04, // 4% del ancho de la pantalla
    width: "100%",
  },
  spacer: {
    height: height * 0.025, // 2.5% del alto de la pantalla
  },
  registerButton: {
    backgroundColor: "#67a0ff",
    paddingVertical: height * 0.02, // 2% del alto de la pantalla
    borderRadius: 20,
    alignItems: "center",
    width: "100%",
  },
  registerButtonText: {
    color: "#fffafa",
    fontSize: width * 0.05, // 5% del ancho de la pantalla
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: height * 0.06, // 6% del alto de la pantalla
  },
  link: {
    color: "#67a0ff",
    textDecorationLine: "underline",
    fontFamily: "Poppins_400Regular",
  },
  errorText: {
    color: "red",
    marginBottom: height * 0.015, // 1.5% del alto de la pantalla
    fontFamily: "Poppins_400Regular",
  },
});

export default Register;