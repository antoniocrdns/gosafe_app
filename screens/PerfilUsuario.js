import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const PerfilUsuario = ({ navigation }) => {
    return (
        <View style={styles.container}>
            
            <MaterialCommunityIcons name="account-box" size={150} color={"#4ba961"} />
            <Text style={{ fontSize: 24, marginBottom: 20, textAlign:'center' }}>Nombre1 Nombre2 Apellido1 Apellido2</Text>
            

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
            <Text style={{color:"#fffafa"}}>Cambiar Contraseña</Text>
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
        padding: 16,
    },
    lineav: {
        height: 2,
        backgroundColor: 'black',
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
    icontextcontainer:{
        flexDirection:"row",
    },
    textInfo:{
        padding:10,
    }


})
export default PerfilUsuario;
