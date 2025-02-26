import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Dimensions, Platform } from "react-native";
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4ba961",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: width * 0.6, // 60% del ancho de la pantalla
        height: height * 0.2, // 20% del alto de la pantalla
        position: "absolute",
        top: height * 0.02, // Reducido al 2% del alto de la pantalla para subir más el logo
    },    
    innerContainer: {
        backgroundColor: "#fffafa",
        width: "90%",
        padding: width * 0.05, // 5% del ancho de la pantalla
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.03, // 3% del alto de la pantalla
    },
    title: {
        fontFamily: "Poppins_400Regular",
        fontSize: width * 0.09, // 9% del ancho de la pantalla
        color: "#1c1919",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: height * 0.02, // 2% del alto de la pantalla
    },
    input: {
        height: height * 0.07, // 7% del alto de la pantalla
        backgroundColor: "#e9e9e9",
        borderRadius: 5,
        marginBottom: height * 0.04, // 4% del alto de la pantalla
        paddingHorizontal: 15,
        fontSize: width * 0.04, // 4% del ancho de la pantalla
        width: "100%",
    },
    loginButton: {
        backgroundColor: "#4ba961",
        paddingVertical: height * 0.02, // 2% del alto de la pantalla
        borderRadius: 20,
        alignItems: "center",
        marginBottom: height * 0.02, // 2% del alto de la pantalla
        width: "100%",
    },
    loginButtonText: {
        color: "#fffafa",
        fontSize: width * 0.05, // 5% del ancho de la pantalla
        fontWeight: "bold",
    },
    registerButton: {
        backgroundColor: "#67a0ff",
        paddingVertical: height * 0.02, // 2% del alto de la pantalla
        borderRadius: 20,
        alignItems: "center",
        width: "100%",
        marginBottom: height * 0.015, // 1.5% del alto de la pantalla
    },
    registerButtonText: {
        color: "#fffafa",
        fontSize: width * 0.05, // 5% del ancho de la pantalla
        fontWeight: "bold",
    },
    separator: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: height * 0.03, // 3% del alto de la pantalla
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#e9e9e9",
    },
    orText: {
        fontFamily: "Poppins_400Regular",
        fontSize: width * 0.045, // 4.5% del ancho de la pantalla
        color: "#1c1919",
        marginHorizontal: 10,
    },
});


export default Login;
