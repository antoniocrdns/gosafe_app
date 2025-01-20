import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useFonts } from "@expo-google-fonts/poppins";
import * as SplashScreen from 'expo-splash-screen'

const Monitoreo = () => {
    //cargar fuente
    /* const [fontsLoaded]=useFonts({
        Inter: require("../fonts/Inter_24pt-Regular.ttf"),
        Poppins: require("../fonts/poppins.bold.ttf"),
    });
    //proceso de carga de fuente cuando el proyecto sea lanzado
    useEffect(()=>{
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    },[]);
        
    const onLayout = useCallback(async() => {
        if (fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) return null; */

    const [modalVisible, setModalVisible] = useState(false);

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

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Monitorear</Text>
            <View style={styles.formContainer}>
                <View style={styles.destinationContainer}>
                    <View style={styles.iconContainer}>
                        <Entypo name="location-pin" size={24} color="white" />
                    </View>
                    <TextInput style={styles.input} placeholder="Destino" />
                </View>

                {/* Mapa (placeholder) */}
                <Image
                    source={{
                        uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiracomohacerlo.com%2Fwp-content%2Fuploads%2F2016%2F01%2Fgoogle-maps-2.gif&f=1&nofb=1&ipt=a88a12f6659180afae461105a8ef389948842430faa37e722f797d332c54f450&ipo=images",
                    }}
                    style={styles.map}
                />

                <View style={styles.bottomContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.timeLabel}>Tiempo</Text>
                        <Text style={styles.timeValue}>2:00</Text>
                    </View>

                    <TouchableOpacity style={styles.shareButton} onPress={handleShareLocation}>
                        <Text style={styles.shareButtonText}>Compartir</Text>
                        <Text style={styles.shareButtonText}>ubicación</Text>
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
        //fontFamily: Inter_400Regular,
        fontSize: 18,
        color: "#1c1919",
        marginBottom: -8,
    },
    timeValue: {
        fontSize: 40,
        fontWeight: "bold",
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
        //fontFamily: Poppins_700Bold,
        color: "#fffafa",
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(103, 160, 255, 0.5)",
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
        marginBottom: 80,
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
        fontWeight: "bold",
    },
    titulo: {
        //fontFamily: Poppins_400Regular,
        fontSize: 38,
        color: "#fffafa",
        fontWeight: "bold",
        marginTop: 10,
        alignSelf: "flex-start",
        marginLeft: 1,
    }
});

export default Monitoreo;
