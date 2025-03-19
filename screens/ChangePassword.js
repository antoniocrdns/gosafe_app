import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen'; // Importamos SplashScreen
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const ChangePassword = () => {
    const { user } = useAuth();
    const [contraseña, setContraseña] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isReady, setIsReady] = useState(false); // Para controlar cuándo la app está lista

    const handleChangePassword = async () => {
        if (!contraseña) {
            setError('El campo de contraseña no puede estar vacío.');
            return;
        }
        if (contraseña !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        if (contraseña.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        try {
            const response = await api.put(`/pasajeros/password/${user.id}/`, { contraseña });
            if (response.data.message === "Contaseña actualizada") {
                alert('Contraseña cambiada con éxito!');
                setContraseña('');
                setConfirmPassword('');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Error al cambiar la contraseña. Por favor, inténtelo de nuevo.');
        }
    };

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Inter_400Regular,
    });

    useEffect(() => {
        const prepare = async () => {
            try {
                // Prevenir que la pantalla de inicio se oculte automáticamente
                await SplashScreen.preventAutoHideAsync();
            } catch (e) {
                console.warn(e);
            }
        };

        prepare();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            setIsReady(true); // Marcar que la app está lista cuando las fuentes se carguen
            SplashScreen.hideAsync(); // Ocultar la pantalla de inicio (Splash Screen)
        }
    }, [fontsLoaded]);

    if (!isReady) {
        return null; // No renderizamos nada hasta que las fuentes estén cargadas
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputcontainer}>
                <TextInput
                    placeholder="Ingrese una nueva contraseña"
                    style={styles.input}
                    value={contraseña}
                    onChangeText={setContraseña}
                    secureTextEntry
                />
            </View>

            <View style={styles.inputcontainer}>
                <TextInput
                    placeholder="Confirmar contraseña"
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            </View>

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <TouchableOpacity style={styles.botoncambiar} onPress={handleChangePassword}>
                <Text style={{ color: "#fffafa", fontFamily: "Poppins_700Bold" }}>Cambiar Contraseña</Text>
            </TouchableOpacity>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fffafa',
        padding: width * 0.04, // Ajuste del padding al 4% del ancho
    },
    inputcontainer: {
        backgroundColor: '#e9e9e9',
        width: width * 0.6, // Ajuste del ancho al 60% del ancho de la pantalla
        marginTop: height * 0.07, // Ajuste del margen superior al 7% de la altura
        borderRadius: 5,
    },
    botoncambiar: {
        backgroundColor: "#67a0ff",
        width: width * 0.6, // Ajuste del ancho al 60% del ancho de la pantalla
        height: height * 0.06, // Ajuste de la altura al 6% de la altura
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginTop: height * 0.07, // Ajuste del margen superior al 7% de la altura
    },
    input: {
        fontFamily: "Inter_400Regular",
        fontSize: width * 0.04, // Ajuste del tamaño del texto al 4% del ancho
        padding: height * 0.015, // Ajuste del padding al 1.5% de la altura
    },
    errorText: {
        color: 'red',
        marginTop: height * 0.015, // Ajuste del margen superior al 1.5% de la altura
        fontFamily: "Inter_400Regular",
        fontSize: width * 0.035, // Ajuste del tamaño del texto al 3.5% del ancho
    },
});

export default ChangePassword;
