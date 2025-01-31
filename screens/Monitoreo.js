import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import Mapview, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Monitoreo = () => {

    const [modalVisible, setModalVisible] = useState(false);

    //api de google en caso de no funcionar, borre la api y ponga otra
    const GOOGLE_MAP_KEY = "AIzaSyAovdzv-dciIhuLNI_SlGg8Bz6msikuoo0"


    //coordenadas de inicio para el mapa
    const [origin, setOrigin] = React.useState({
        latitude: 32.436087,
        longitude: -114.759567
    });
    const [destination, setDestination] = React.useState({
        latitude: 32.449849,
        longitude: -114.758752,
    });

    
    //permisos para obtener ubicacion
    React.useEffect(() => {
        getLocationPermission();
    }, []
    )
    async function getLocationPermission() {
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
    }




    const handleShareLocation = () => {
        setModalVisible(true);
    };

    const handleConfirm = () => {
        setModalVisible(false);
        console.log("Ubicación compartida");
    };

    const handleCancel = () => {
        setModalVisible(false);
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
            <Text style={styles.titulo}>Monitorear</Text>
            <View style={styles.formContainer}>
                <View style={styles.destinationContainer}>
                    <View style={styles.iconContainer}>
                        <Entypo name="location-pin" size={24} color="white" />
                    
                    </View >
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            console.log(data, details);
                        }}
                        query={{
                            key: GOOGLE_MAP_KEY,
                            language: 'en',
                        }}
                    />
                    
                </View>



                {/* Mapa */}
                <Mapview style={styles.map}
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04
                    }}>

                    <Marker
                        draggable
                        coordinate={origin}
                        onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                    />

                    <Marker
                        draggable
                        coordinate={destination}
                        onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
                    />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAP_KEY}
                        strokeColor='blue'
                        strokeWidth={5}
                    />

                </Mapview>

                <View style={styles.bottomContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeLabel}>Tiempo</Text>
                        <Text style={styles.timeValue}>2:00</Text>
                    </View>

                    <TouchableOpacity style={styles.shareButton} onPress={handleShareLocation}>
                        <Text style={styles.shareButtonText}>Compartir</Text>
                        <Text style={styles.shareButtonText}>Ubicación</Text>
                    </TouchableOpacity>
                </View>
            </View>

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
    input: {
        backgroundColor: "#e9e9e9",
        borderRadius: 15,
        height: 40,
        paddingHorizontal: 16,
        fontSize: 16,
        flex: 1,
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
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    timeContainer: {
        alignItems: "center",
        marginRight: 20,
        marginLeft: 20
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
    googlePlacesText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
      },
      textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        height: 50,
        borderRadius: 25,
        paddingLeft: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      inputContainer: {
        width: "95%",
      },
      textInputFocused: {
        borderWidth: 1,
        borderColor: "darkblue",
        height: 50,
        borderRadius: 25,
        paddingLeft: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },

});

export default Monitoreo;
