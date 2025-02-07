import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import * as SplashScreen from 'expo-splash-screen';
import api from '../utils/api';

SplashScreen.preventAutoHideAsync();

const Login = ({ navigation }) => {
    const { login } = useAuth();

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    if (!fontsLoaded) {
        return null;
    }

    const validateForm = () => {
        console.log('Validando formulario');
        if (!correo || !contraseña) {
            Alert.alert("Error", "Por favor, complete todos los campos.");
            return false;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(correo)) {
            Alert.alert("Error", "Por favor, ingrese un correo válido.");
            return false;
        }

        return true;
    };

    const handleLogin = async () => {
        console.log('Intentando iniciar sesión');
        if (validateForm()) {
            try {
                const loginData = { correo, contraseña };
                const apiUrl = '/auth/login/pasajero';
                console.log('Enviando datos a la API:', loginData);
                console.log('URL de la API:', apiUrl);

                const response = await api.post(apiUrl, loginData);
                console.log('Respuesta de la API:', response.data);
                if (response.data.success) {
                    console.log('Inicio de sesión exitoso');
                    login(response.data.user); // Pasa los datos del usuario a la función login
                    console.log('Redirigiendo a Monitoreo');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Monitoreo' }],
                    }); // Redirige a la pantalla Monitoreo y resetea la navegación
                } else {
                    Alert.alert("Error", response.data.message);
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                Alert.alert("Error", "Error al iniciar sesión. Por favor, inténtelo de nuevo.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/gosafe_logo.png")} // Sustituye con tu ruta de imagen
                style={styles.logo}
                resizeMode="contain" // Ajusta la imagen dentro de su contenedor
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

                {/* línea con "O" en el medio */}
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
        backgroundColor: "#4ba961", // fondo verde
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 150, // Ancho de la imagen
        height: 150, // Alto de la imagen
        position: "absolute",
        top: 40,
    },
    innerContainer: {
        backgroundColor: "#fffafa", // fondo blanco
        width: "90%", // contenedor con 90% de la pantalla
        padding: 20,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        top: 30,
    },
    title: {
        fontFamily: "Poppins_400Regular",
        fontSize: 39,
        color: "#1c1919", // color negro
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 0,
        top: 1,
    },
    input: {
        height: 50, // altura del input
        backgroundColor: "#e9e9e9", // color gris
        borderRadius: 5,
        marginBottom: 40, // separacion de los inputs
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
        backgroundColor: "#e9e9e9", // color gris para la linea
    },
    orText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 18,
        color: "#1c1919",
        marginHorizontal: 10,
    },
});

export default Login;