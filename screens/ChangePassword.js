import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const ChangePassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = () => {
        if (!password) {
            setError('El campo de contraseña no puede estar vacío.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        
        setError('');
        alert('Contraseña cambiada con éxito!');

        setPassword('')
        setConfirmPassword('')
    };

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Inter_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputcontainer}>
                <TextInput
                    placeholder="Ingrese una nueva contraseña"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
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
                <Text style={{ color: "#fffafa", fontFamily: "Inter_400Regular" }}>Cambiar Contraseña</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fffafa',
        padding: 16,
    },
    inputcontainer: {
        backgroundColor: '#e9e9e9',
        width: 220,
        marginTop: 50,
        borderRadius: 5
    },
    botoncambiar: {
        backgroundColor: "#67a0ff",
        width: 220,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginTop: 50
    },
    input: {
        fontFamily: "Inter_400Regular"
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        fontFamily: "Inter_400Regular",
    }
});

export default ChangePassword;
