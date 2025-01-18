import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../context/AuthContext";  // Importar el hook del contexto

const Login = ({ navigation }) => {
    const { login } = useAuth();  // Obtener la función login desde el contexto

    const handleLogin = () => {
        login();  // Iniciar sesión
        //navigation.navigate('Monitoreo');  // Redirigir a Monitoreo
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar sesión</Text>
            <Button
                title="Iniciar sesión"
                onPress={handleLogin}
            />
            <View style={{ marginVertical: 10 }} />
            <Button
                title="Registrar"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

export default Login;
