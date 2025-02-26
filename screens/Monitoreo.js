import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Share, Alert, Dimensions } from "react-native";
import * as Location from 'expo-location';
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
    const [viajeData, setViajeData] = useState(null);

    const { user } = useAuth();

    const searchRef = useRef(null);

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
    
            const timeInMinutes = parseInt(duration.split(' ')[0]);  // Convertir el tiempo a número (en minutos)
            const distanceInKm = parseFloat(distance.split(' ')[0]); // Convertir la distancia a número (en kilómetros)
    
            setTime(duration); 
            setDistance(distance);
            setDireccionInicio(data.routes[0].legs[0].start_address);
            setDireccionFin(data.routes[0].legs[0].end_address);
    
            const tripData = {
                direccion_inicio: data.routes[0].legs[0].start_address,
                direccion_fin: data.routes[0].legs[0].end_address,
                fecha: new Date().toISOString(),
                tiempo_viaje: timeInMinutes,
                distancia_km: distanceInKm,
                id_pasajero: user.id,
            };

            setViajeData(tripData);
    
            console.log("Datos listos para enviar a la API:", viajeData)
    
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
        onShare();
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleFinalizarViaje = async () => {
        try {
            console.log('Intentando enviar datos a la API...');
            const response = await api.post(`/viajes/pasajero`, viajeData);
    
            if (response.status === 201) {
                Alert.alert('Éxito', 'Viaje finalizado con éxito');

                console.log('Datos enviados correctamente');
    
                // Limpiar todos los estados relacionados con el viaje
                setDestination(null);
                setTime(""); 
                setDistance("0.00"); 
                setDireccionInicio("");
                setDireccionFin("");
                setViajeData(null);
    
                if (searchRef.current) {
                    searchRef.current.setAddressText("");
                }
            } else {
                setError(response.data.message || "Error al finalizar el viaje.");
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            setError('Error al enviar los datos, inténtelo de nuevo.');
        }
    };

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const locationUrl = `https://www.google.com/maps?q=${origin.latitude},${origin.longitude}`;

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: ('¡Hola! Estoy usando Go Safe y me encuentro ahora mismo en: ' + locationUrl),
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('shared with activity', result.activityType)
                } else {
                    console.log('shared')
                }

            } else if (result.action === Share.dismissedAction) {
                console.log('dismissed');
            }
        }
        catch (error) {
            console.log(error.message)
            Alert("No se pudo compartir la ubicación. Intentelo de nuevo.")
        }
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
                        ref={searchRef}
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

            {/* Botones de Finalizar y Cancelar Viaje */}
            {destination && (
                <View style={styles.buttonsContainer}>
                    {/* Botón para Finalizar Viaje */}
                    <TouchableOpacity
                        style={styles.finalizarButton}
                        onPress={handleFinalizarViaje}
                    >
                        <Text style={styles.buttonText}>Finalizar Viaje</Text>
                    </TouchableOpacity>

                    {/* Botón para Cancelar Viaje */}
                    <TouchableOpacity
                        style={styles.cancelarButton}
                        onPress={() => {
                            setDestination(null);
                            if (searchRef.current) {
                                searchRef.current.clear()
                                setTime("");
                                setDistance("0.00")
                            }
                        }} // Limpia el estado del destino
                    >
                        <Text style={styles.buttonText}>Cancelar Viaje</Text>
                    </TouchableOpacity>
                </View>
            )}

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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4ba961",
        alignItems: "center",
        padding: width * 0.05,
    },
    formContainer: {
        width: "100%",
        backgroundColor: "#fffafa",
        borderRadius: width * 0.04,
        padding: width * 0.05,
        marginVertical: height * 0.02,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    destinationContainer: {
        marginBottom: height * 0.02,
        marginTop: height * 0.015,
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: width * 0.08,
        height: width * 0.08,
        backgroundColor: "#ff3131",
        borderRadius: width * 0.2,
        justifyContent: "center",
        alignItems: "center",
        marginRight: width * 0.03,
    },
    map: {
        width: "100%",
        height: height * 0.25,
        borderRadius: width * 0.02,
        marginTop: height * 0.02,
    },
    bottomContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.03,
    },
    shareButton: {
        backgroundColor: "#67a0ff",
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.04,
        borderRadius: width * 0.04,
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.45,
        marginLeft: width * 0.05,
    },
    shareButtonText: {
        fontFamily: "Poppins_700Bold",
        color: "#fffafa",
        fontSize: width * 0.04,
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
        borderRadius: width * 0.05,
        padding: width * 0.05,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: width * 0.07,
        marginTop: height * 0.04,
        marginBottom: height * 0.06,
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
        paddingVertical: height * 0.015,
        marginHorizontal: width * 0.01,
        borderRadius: width * 0.04,
        alignItems: "center",
    },
    noButtonText: {
        color: "#fffafa",
        fontSize: width * 0.04,
        fontFamily: "Poppins_700Bold",
        fontWeight: "bold",
    },
    yesButton: {
        flex: 1,
        backgroundColor: "#67a0ff",
        paddingVertical: height * 0.015,
        marginHorizontal: width * 0.01,
        borderRadius: width * 0.04,
        alignItems: "center",
    },
    yesButtonText: {
        color: "#fffafa",
        fontSize: width * 0.04,
        fontFamily: "Poppins_700Bold",
        fontWeight: "bold",
    },
    titulo: {
        fontFamily: "Poppins_700Bold",
        fontSize: width * 0.1,
        color: "#fffafa",
        fontWeight: "bold",
        marginTop: height * 0.03,
        alignSelf: "flex-start",
        marginLeft: width * 0.02,
    },
    bubble: {
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderRadius: width * 0.02,
        borderWidth: 0.5,
        padding: width * 0.04,
        width: width * 0.4,
    },
    timeContainer: {
        alignItems: "center",
        marginRight: width * 0.05,
        marginLeft: width * 0.02,
        maxWidth: width * 0.8, // Limitar el ancho máximo del contenedor
    },
    timeLabel: {
        fontFamily: "Inter_400Regular",
        fontSize: width * 0.04,
        color: "#1c1919",
        marginBottom: height * -0.01,
    },
    timeValue: {
        fontSize: width * 0.08,
        fontWeight: "bold",
        fontFamily: "Poppins_700Bold",
        color: "#1c1919",
        maxWidth: width * 0.6, // Limitar el ancho máximo del texto
        flexShrink: 1, // Permitir que el texto se reduzca si es necesario
        overflow: 'hidden', // Evitar desbordamiento
        textAlign: 'center', // Centrar el texto
    },
    buttonsContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: height * 0.005,
    },
    finalizarButton: {
        backgroundColor: "#67a0ff",
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.06,
        borderRadius: width * 0.04,
        marginTop: height * 0.04,
        marginBottom: height * 0.04,
        width: "80%",
        alignItems: "center",
    },
    cancelarButton: {
        backgroundColor: "#ff3131",
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.06,
        borderRadius: width * 0.04,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        fontFamily: "Poppins_700Bold",
        color: "#fffafa",
        fontSize: width * 0.04,
    },
});


export default Monitoreo;
