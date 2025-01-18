import React from "react";
import { View, Text, Button } from "react-native";

const PerfilUsuario = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Perfil Usuario</Text>

            <Button
                title="Cambiar Contraseña"
                onPress={() => navigation.navigate('ChangePassword')}
            />
        </View>
    );
}

export default PerfilUsuario;
