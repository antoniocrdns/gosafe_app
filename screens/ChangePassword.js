import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const ChangePassword = () => {
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
            <Text style={{color:"#fffafa"}}>Cambiar Contraseña</Text>
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
        width: 200,
        marginTop:50
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
        marginTop:50
        
    },


})
export default ChangePassword;
