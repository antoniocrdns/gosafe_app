import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { useAuth } from '../context/AuthContext'; 


/* //fuentes
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'
 */
const PerfilUsuario = ({ navigation }) => {
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
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    }; 

    return (
        <View style={styles.container}>
            
            <MaterialCommunityIcons name="account-box" size={150} color={"#4ba961"} />
            <Text style={{ fontSize: 24, marginBottom: 20, textAlign:'center', fontFamily: 'Poppins_700Bold' }}>Nombre1 Nombre2 Apellido1 Apellido2</Text>
            

            <View style={styles.lineav} />


            <View style={styles.infocontainer}>
            <View style={styles.icontextcontainer}>
            <MaterialCommunityIcons style={{marginBottom: 20}}name="email" size={40} color={"#4ba961"} />
            <Text style={styles.textInfo}>Nombre@gmail.com</Text>
            </View>
            
            <View style={styles.icontextcontainer}>
                <MaterialCommunityIcons name="phone" size={40} color={"#4ba961"} />
                <Text style={styles.textInfo}>6535314256577</Text>
            </View>
            
            <TouchableOpacity style={styles.botoncambiar} onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={{color:"#fffafa", fontFamily:"Inter_400Regular"}}>Cambiar Contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botoncerrar} onPress={(handleLogout)}>
                <Text style={{color:"#fffafa", fontFamily:"Inter_400Regular"}}>Cerrar Sesión</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' ,
        backgroundColor: '#fffafa', // fondo
        padding: 8,
    },
    lineav: {
        height: 2,
        backgroundColor: '#1c1919',
        marginVertical: 10, 
        paddingHorizontal:150
    },
    infocontainer:{
        flex:1,
        justifyContent:"space-evenly"
    },
    botoncambiar:{
        backgroundColor:"#67a0ff",
        width: 200,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        
    },
    botoncerrar:{
        backgroundColor:"#ff3131",
        width: 200,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        
    },

    icontextcontainer:{
        flexDirection:"row",
    },
    textInfo:{
        padding:10,
        fontFamily:"Inter_400Regular"
    },

})
export default PerfilUsuario;
