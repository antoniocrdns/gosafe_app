import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment'; // moment en este caso se usa para la fecha y hora
import 'moment/locale/es';
moment.locale('es');
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const Rutas = () => {
    const [rutas, setRutas] = useState([]);

    useEffect(() => {
        const fetchRutas = async () => {
            const storedRutas = JSON.parse(await AsyncStorage.getItem('rutas')) || [];

            const exampleRutas = [
                {status: 'Finalizado', distance: '5.2 Km', date: new Date()},
                {status: 'Cancelado', distance: '3.2 Km', date: new Date()},
                {status: 'Finalizado', distance: '9.2 Km', date: new Date()},
            ];
            setRutas(storedRutas.length > 0 ? storedRutas : exampleRutas);
        };
        fetchRutas();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.header, { fontFamily: 'Poppins_700Bold' }]}>Historial</Text>

            <FlatList
                data={rutas}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.dateText}>
                            {moment(item.date).format('MMMM Do YYYY, h:mm A')}
                        </Text>
                        <Text style={styles.cardText}>Estado: {item.status}</Text>
                        <Text style={styles.cardText}>Distancia: {item.distance}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay rutas registradas.</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#4ba961', // color verde de fondo de pantalla
    },
    header: {
        fontSize: 38,
        color: "#fffafa",
        fontWeight: "bold",
        marginTop: 10,
        alignSelf: "flex-start",
        marginLeft: 1,
        marginBottom: 60
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
        textAlign: 'left', // Alineación a la izquierda para los campos Estado y Distancia
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default Rutas;
