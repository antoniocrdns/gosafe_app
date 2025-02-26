import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const Historial = () => {
    const { user } = useAuth();
    const [rutas, setRutas] = useState([]);

    const fetchHistorial = async () => {
        try {
            const response = await api.get(`/viajes/pasajero/${user.id}`);
            setRutas(response.data);
        } catch (error) {
            console.error('Error fetching rutas:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (user) {
                fetchHistorial();
            }
        }, [user])
    );

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Inter_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={[styles.header, { fontFamily: 'Poppins_700Bold' }]}>Historial</Text>

                {/* Mapeamos las rutas y las renderizamos manualmente */}
                {rutas.length > 0 ? (
                    rutas.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.dateText}>
                                {moment(item.fecha).format('MMMM Do YYYY, h:mm A')}
                            </Text>
                            <Text style={styles.cardText}>Desde: {item.direccion_inicio}</Text>
                            <Text style={styles.cardText}>Hasta: {item.direccion_fin}</Text>
                            <Text style={styles.cardText}>Tiempo de viaje: {item.tiempo_viaje}</Text>
                            <Text style={styles.cardText}>Distancia: {item.distancia_km} km</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>No hay viajes registrados.</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#4ba961',
    },
    header: {
        fontSize: 38,
        color: "#fffafa",
        fontWeight: "bold",
        marginTop: 25,
        alignSelf: "flex-start",
        marginLeft: 1,
        marginBottom: 30
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dateText: {
        fontSize: 25,
        color: '#1c1919',
        marginBottom: 10,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        textAlign: 'left',
        fontFamily: "Inter_400Regular" 
    },
    emptyText: {
        fontSize: 18,
        color: '#fffafa',
        textAlign: 'center',
        marginTop: 50,
        fontFamily: "Inter_400Regular"
    },
});

export default Historial;
