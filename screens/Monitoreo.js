import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking } from "react-native";
import * as Location from 'expo-location';
import { Sharing } from 'expo';
import Entypo from '@expo/vector-icons/Entypo';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import Mapview, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirecctions from 'react-native-maps-directions';
import api from "../utils/api";
import { useAuth } from '../context/AuthContext';

const Monitoreo = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [origin, setOrigin] = useState({
        latitude: 32.436087,
        longitude: -114.759567
    });
    const [destination, setDestination] = useState();
    const [time, setTime] = useState("");
    const [distance, setDistance] = useState("0.00");
    const [direccionInicio, setDireccionInicio] = useState("");
    const [direccionFin, setDireccionFin] = useState("");

    const { user } = useAuth();

    const GOOGLE_MAP_KEY2 = "AIzaSyAvSJwfk_of_K86P7cy4jAiaKuwXJ7925E";

    // Obtener permisos y la ubicación actual (aun sin funcionar)
    useEffect(() => {
        const getLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            const current = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setOrigin(current);
        };

        getLocationPermission();
    }, []);

    // Obtener tiempo y distancia del viaje
    const getTravelData = async (origin, destination) => {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAP_KEY2}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const duration = data.routes[0].legs[0].duration.text;
            const distance = data.routes[0].legs[0].distance.text;
    
            // Convertir tiempo a minutos (extraemos solo el número) y distancia a formato decimal
            const timeInMinutes = parseInt(duration.split(' ')[0]);  // Convertir el tiempo a número (en minutos)
            const distanceInKm = parseFloat(distance.split(' ')[0]); // Convertir la distancia a número (en kilómetros)
    
            setTime(duration); 
            setDistance(distance);
            setDireccionInicio(data.routes[0].legs[0].start_address);
            setDireccionFin(data.routes[0].legs[0].end_address);
    
            const viajeData = {
                direccion_inicio: data.routes[0].legs[0].start_address,
                direccion_fin: data.routes[0].legs[0].end_address,
                fecha: new Date().toISOString(),
                tiempo_viaje: timeInMinutes,
                distancia_km: distanceInKm,
                id_pasajero: user.id,
            };
    
            console.log("Datos listos para enviar a la API:", viajeData)

            try {
                console.log('Intentado enviar datos a la API...')
                const response = await api.post(`/viajes/pasajero`, viajeData);
                if (response.data.message === 'Viaje creado') {
                    alert('Viaje enviado con éxito!');
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Error al enviar los datos, intentelo de nuevo.');
            }
    
        } catch (error) {
            console.error("Error al obtener los datos del viaje:", error);
        }
    };
    

    // Llamar a la función cada vez que se actualiza el destino
    useEffect(() => {
        if (origin && destination) {
            getTravelData(origin, destination);
        }
    }, [origin, destination]);

    const handleShareLocation = () => {
        setModalVisible(true);
    };

    const handleConfirm = async () => {
        const locationUrl = `https://www.google.com/maps?q=${origin.latitude},${origin.longitude}`;
        alert(`Ubicación: ${locationUrl}`);

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(locationUrl);
        } else {
            Linking.openURL(locationUrl);
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Monitorear</Text>
            <View style={styles.formContainer}>
                <View style={styles.destinationContainer}>
                    <View style={styles.iconContainer}>
                        <Entypo name="location-pin" size={24} color="white" />
                    </View>

                    {/* Buscador de ubicaciones */}
                    <GooglePlacesAutocomplete
                        fetchDetails={true}
                        placeholder="Buscar dirección"
                        onPress={(data, details = null) => {
                            let destinationCoord = {
                                latitude: details?.geometry?.location.lat,
                                longitude: details?.geometry?.location.lng,
                            };
                            setDestination(destinationCoord); // Establecer el destino
                        }}
                        query={{
                            key: GOOGLE_MAP_KEY2,
                            language: 'es',
                        }}
                    />
                </View>

                {/* Mapa */}
                <Mapview
                    style={styles.map}
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04,
                    }}
                    onPress={(e) => {
                        const newCoordinate = e.nativeEvent.coordinate;
                        setDestination(newCoordinate); // Actualiza el destino
                    }}
                >
                    {/* Marcador origen */}
                    <Marker
                        title={"Origen"}
                        description={"Lugar de inicio"}
                        draggable
                        coordinate={origin}
                        onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                    />
                    {/* Marcador destino */}
                    {destination && <Marker coordinate={destination} />}
                    
                    {/* Ruta desde origen a destino */}
                    {origin && destination && (
                        <MapViewDirecctions
                            origin={origin}
                            destination={destination}
                            apikey={GOOGLE_MAP_KEY2}
                            strokeWidth={4}
                            strokeColor='#67a0ff'
                        />
                    )}
                </Mapview>

                {/* Información de tiempo y distancia */}
                <View style={styles.bottomContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeLabel}>Tiempo</Text>
                        <Text style={styles.timeValue}>{time}</Text>
                    </View>
                    <TouchableOpacity style={styles.shareButton} onPress={handleShareLocation}>
                        <Text style={styles.shareButtonText}>Compartir Ubicación</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal de confirmación */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={handleCancel}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>¿Seguro que quieres compartir tu ubicación?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.yesButton} onPress={handleConfirm}>
                                <Text style={styles.yesButtonText}>Sí</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.noButton} onPress={handleCancel}>
                                <Text style={styles.noButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4ba961",
        alignItems: "center",
        padding: 20,
    },
    formContainer: {
        width: "100%",
        backgroundColor: "#fffafa",
        borderRadius: 15,
        padding: 20,
        marginVertical: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    destinationContainer: {
        marginBottom: 16,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 32,
        height: 32,
        backgroundColor: "#ff3131",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    map: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginTop: 15,
    },
    bottomContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    shareButton: {
        backgroundColor: "#67a0ff",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: 170,
    },
    shareButtonText: {
        fontFamily: "Poppins_700Bold",
        color: "#fffafa",
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(28, 25, 25, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fffafa",
        borderRadius: 18,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 26,
        marginTop: 30,
        marginBottom: 50,
        textAlign: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    noButton: {
        flex: 1,
        backgroundColor: "#ff3131",
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 15,
        alignItems: "center",
    },
    noButtonText: {
        color: "#fffafa",
        fontSize: 16,
        fontFamily: "Poppins_700bold",
        fontWeight: "bold",
    },
    yesButton: {
        flex: 1,
        backgroundColor: "#67a0ff",
        paddingVertical: 10,
        marginHorizontal: 5,
        borderRadius: 15,
        alignItems: "center",
    },
    yesButtonText: {
        color: "#fffafa",
        fontSize: 16,
        fontFamily: "Poppins_700bold",
        fontWeight: "bold",
    },
    titulo: {
        fontFamily: "Poppins_700Bold",
        fontSize: 38,
        color: "#fffafa",
        fontWeight: "bold",
        marginTop: 20,
        alignSelf: "flex-start",
        marginLeft: 1,
    },
    bubble: {
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderRadius: 6,
        borderWidth: 0.5,
        padding: 15,
        width: 159,
    },
    timeContainer: {
        alignItems: "center",
        marginRight: 20,
        marginLeft: 5,
    },
    timeLabel: {
        fontFamily: "Inter_400Regular",
        fontSize: 18,
        color: "#1c1919",
        marginBottom: -8,
    },
    timeValue: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Poppins_700Bold",
        color: "#1c1919",
    },
});

export default Monitoreo;
