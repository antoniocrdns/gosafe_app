import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const PerfilUsuario = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Inter_400Regular,
    });

    const { user, logout } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user && user.id) {
            const fetchUserData = async () => {
                try {
                    console.log(`Fetching user data for user ID: ${user.id}`);
                    const response = await api.get(`/pasajeros/${user.id}`);
                    console.log('Response data:', response.data);
                    setUserData(response.data); 
                } catch (error) {
                    console.error('Error al cargar los datos del usuario:', error);
                    Alert.alert("Error", "No se pudieron cargar los datos del usuario.");
                }
            };

            fetchUserData();
        } else {
            console.error('No user ID found');
            Alert.alert("Error", "No se pudo obtener el ID del usuario.");
        }
    }, [user]);

    if (!fontsLoaded || !userData) {
        return <AppLoading />;
    }

    const handleLogout = () => {
        logout();
    };

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="account-box" size={150} color={"#4ba961"} />
            
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{userData.nombre_completo || "Nombre Completo"}</Text>
            </View>

            <View style={styles.lineav} />

            <View style={styles.infocontainer}>
                <View style={styles.icontextcontainer}>
                    <MaterialCommunityIcons style={{ marginBottom: 20 }} name="email" size={40} color={"#4ba961"} />
                    <Text style={styles.textInfo}>{userData.correo || "correo@example.com"}</Text>
                </View>

                <View style={styles.icontextcontainer}>
                    <MaterialCommunityIcons name="phone" size={40} color={"#4ba961"} />
                    <Text style={styles.textInfo}>{userData.telefono || "0000000000"}</Text>
                </View>

                <TouchableOpacity style={styles.botoncambiar} onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={{ color: "#fffafa", fontFamily: "Poppins_700Bold" }}>Cambiar Contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botoncerrar} onPress={handleLogout}>
                    <Text style={{ color: "#fffafa", fontFamily: "Poppins_700Bold" }}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffafa',
        padding: width * 0.02, // Adaptar padding al 2% del ancho
        marginTop: height * 0.05, // Adaptar margen superior al 5% de la altura
    },
    nameContainer: {
        alignItems: 'center',
        marginBottom: height * 0.03, // Margen inferior al 3% de la altura
    },
    nameText: {
        fontSize: width * 0.06, // Adaptar tamaño de fuente al 6% del ancho
        textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
    },
    lineav: {
        height: 2,
        backgroundColor: '#1c1919',
        marginVertical: height * 0.015, // Margen vertical al 1.5% de la altura
        width: '80%',
    },
    infocontainer: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    botoncambiar: {
        backgroundColor: "#67a0ff",
        width: width * 0.55, // Adaptar ancho al 55% del ancho de la pantalla
        height: height * 0.06, // Adaptar altura al 6% de la altura
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: height * 0.025, // Espacio entre botones (2.5% de la altura)
    },
    botoncerrar: {
        backgroundColor: "#ff3131",
        width: width * 0.55, // Adaptar ancho al 55% del ancho de la pantalla
        height: height * 0.06, // Adaptar altura al 6% de la altura
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    icontextcontainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: height * 0.025, // Margen inferior al 2.5% de la altura
    },
    textInfo: {
        padding: width * 0.025, // Adaptar padding al 2.5% del ancho
        fontFamily: "Inter_400Regular",
        fontSize: width * 0.04, // Adaptar tamaño de fuente al 4% del ancho
    },
});

export default PerfilUsuario;
