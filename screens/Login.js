import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import api from "../utils/api";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const { login } = useAuth();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });

    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigation = useNavigation();

    if (!fontsLoaded) {
        return null; // Muestra un estado vacío mientras las fuentes cargan
    }

    const validateForm = () => {
        if (!correo || !contraseña) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})*$/;

        if (!emailPattern.test(correo)) {
            Alert.alert("Error", "Por favor, ingrese un correo válido.");
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        if (validateForm()) {
            try {
                const loginData = { correo, contraseña };
                const apiUrl = "/auth/login/pasajero";

                // Hacemos la petición POST a la API
                const response = await api.post(apiUrl, loginData);

                if (response.data.user && response.data.user.id) {
                    login(response.data.user.id);
                    navigation.navigate("Monitoreo");
                } else {
                    Alert.alert("Error", response.data.message || "Credenciales incorrectas.");
                }
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                Alert.alert("Error", "Error al iniciar sesión. Por favor, inténtelo de nuevo.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/gosafe_logo4.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <TextInput
                    style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
                    placeholder="Correo"
                    placeholderTextColor="#888"
                    value={correo}
                    onChangeText={setCorreo}
                />
                <TextInput
                    style={[styles.input, { fontFamily: "Poppins_400Regular" }]}
                    placeholder="Contraseña"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    value={contraseña}
                    onChangeText={setContraseña}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <View style={styles.separator}>
                    <View style={styles.line}></View>
                    <Text style={styles.orText}>O</Text>
                    <View style={styles.line}></View>
                </View>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.registerButtonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4ba961",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 300,
        height: 150,
        position: "absolute",
        top: 40,
    },
    innerContainer: {
        backgroundColor: "#fffafa",
        width: "90%",
        padding: 20,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        top: 30,
    },
    title: {
        fontFamily: "Poppins_400Regular",
        fontSize: 39,
        color: "#1c1919",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 0,
        top: 1,
    },
    input: {
        height: 50,
        backgroundColor: "#e9e9e9",
        borderRadius: 5,
        marginBottom: 40,
        paddingHorizontal: 15,
        fontSize: 15,
        width: "100%",
        top: 35,
    },
    loginButton: {
        backgroundColor: "#4ba961",
        padding: 13,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
        top: 30,
    },
    loginButtonText: {
        color: "#fffafa",
        fontSize: 20,
        fontWeight: "bold",
    },
    registerButton: {
        backgroundColor: "#67a0ff",
        padding: 13,
        borderRadius: 20,
        alignItems: "center",
        width: "100%",
        top: -13,
        marginBottom: 15,
    },
    registerButtonText: {
        color: "#fffafa",
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#e9e9e9",
    },
    orText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 18,
        color: "#1c1919",
        marginHorizontal: 10,
    },
});

export default Login;
