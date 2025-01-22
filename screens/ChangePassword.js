import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
/* import * as SplashScreen from 'expo-splash-screen'*/
const ChangePassword = () => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Inter_400Regular,
    });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }
        /* //cargar fuente
        const [fontsLoaded]=useFonts({
            Inter: require("../fonts/Inter_24pt-Regular.ttf"),
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
        if (!fontsLoaded) return null;
     */


    return (
    <View style={styles.container}>
        
        <View style={styles.inputcontainer}>
            <TextInput
                placeholder="Ingrese una nueva contraseña"
                style={styles.input}
            />
        </View>

        <View style={styles.inputcontainer}>
            <TextInput
                placeholder="Confirmar contraseña"
                style={styles.input}
            />
        </View>

        <TouchableOpacity style={styles.botoncambiar} >
            <Text style={{color:"#fffafa", fontFamily:"Inter_400Regular"}}>Cambiar Contraseña</Text>
        </TouchableOpacity>

    </View>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center' ,
        backgroundColor: '#fffafa', 
        padding: 16,
    },
    inputcontainer: {
        backgroundColor: '#e9e9e9',
        width: 220,
        marginTop:50,
        borderRadius: 5
    },
    botoncambiar:{
        backgroundColor:"#67a0ff",
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
        marginTop:50
        
    },
    input:{
        fontFamily:"Inter_400Regular"

    }


})
export default ChangePassword;
