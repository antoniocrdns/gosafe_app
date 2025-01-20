import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext"; // Importar el hook del contexto
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading"; //para manejar la carga de fuentes

const Login = ({ navigation }) => {
    const { login } = useAuth(); // Obtener la función login desde el contexto

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const handleLogin = () => {
        login(); // Iniciar sesión
        // navigation.navigate('Monitoreo');  // Redirigir a Monitoreo
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleGoSafe}>Go Safe</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <TextInput
                     style={[styles.input, { fontFamily: "Inter_400Regular" }]} 
                    placeholder="Correo"
                    placeholderTextColor="#888"
                />
                <TextInput
                     style={[styles.input, { fontFamily: "Inter_400Regular" }]} 
                    placeholder="Contraseña"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                {/* linea con "O" en el medio */}
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
        backgroundColor: "#4ba961", //fondo verde
        justifyContent: "center", 
        alignItems: "center", 
    },
    innerContainer: {
        backgroundColor: "#fffafa", //fondo blanco
        width: "90%", //contenedor con 90% de la pantalla
        padding: 20, 
        borderRadius: 20,
        justifyContent: "center", 
        alignItems: "center", 
        top: 30,
    },
    titleGoSafe: {
        fontFamily: "Poppins_400Regular", //fuente Poppins
        fontSize: 50,
        padding: 30,
        color: "#fffafa", //color blanco
        fontWeight: "bold", // en negrita
        textAlign: "center", 
        position: "absolute", 
        top: 25, 
        left: 0,
        right: 0,
    },
    title: {
        fontFamily: "Poppins_400Regular", 
        fontSize: 39,
        color: "#1c1919", //color negro
        fontWeight: "bold", 
        textAlign: "center", 
        marginBottom: 0, 
        top: 1,
    },
    input: {
        height: 50, //altura del input
        backgroundColor: "#e9e9e9", //color gris
        borderRadius: 5, 
        marginBottom: 40, //se mueve la separacion de los inputs
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


























































































