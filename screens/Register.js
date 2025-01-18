import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Hook para la navegación

const Register = () => {
    const navigation = useNavigation(); // Instanciamos el hook de navegación

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar</Text>

            {/* Opción de navegar a la pantalla de login */}
            <View style={styles.loginContainer}>
                <Text>¿Ya tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.link}>Ingrese Aquí</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default Register;
