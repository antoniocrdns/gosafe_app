import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import moment from 'moment'; // moment en este caso se usa para la fecha y hora
import 'moment/locale/es';
moment.locale('es');
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import api from '../utils/api';

const Rutas = () => {
    const [rutas, setRutas] = useState([]);

    useEffect(() => {
        const fetchRutas = async () => {
            try {
                const response = await api.get('/rutas'); 
                setRutas(response.data);
            } catch (error) {
                console.error('Error fetching rutas:', error);
            }
        };
        fetchRutas();
    }, []);

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
        backgroundColor: '#4ba961',
    },
    header: {
        fontSize: 38,
        color: "#fffafa",
        fontWeight: "bold",
        marginTop: 20,
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
        textAlign: 'left',
        fontFamily: "Inter_400Regular" 
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 50,
        fontFamily: "Inter_400Regular"
    },
});

export default Rutas;