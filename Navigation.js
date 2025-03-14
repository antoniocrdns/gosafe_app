import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './context/AuthContext'; 

// Iconos
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Screens
import Login from './screens/Login';
import Register from './screens/Register';
import Monitoreo from './screens/Monitoreo';
import ScanearQR from './screens/ScanearQR';
import PerfilChofer from './screens/PerfilChofer';
import Historial from './screens/Historial';
import PerfilUsuario from './screens/PerfilUsuario';
import ChangePassword from './screens/ChangePassword';

// Pantalla de carga
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

function LoadingScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Cargando...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// AuthFlow - Lógica de autenticación
function AuthFlow() {
    const { isAuthenticated, loading } = useAuth(); 

    if (loading) {
        return <LoadingScreen />;
    }

    return isAuthenticated ? <MainTabs /> : <AuthNavigator />;
}

// Authentication Stack
const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
    return (
        <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Register"
                component={Register}
                options={{
                    headerBackVisible: false,
                    headerShown: false
                }}
            />
        </AuthStack.Navigator>
    );
}

// Scanear QR Stack
const ScanQRStack = createNativeStackNavigator();

function ScanQRNavigator() {
    return (
        <ScanQRStack.Navigator initialRouteName="ScanearQR">
            <ScanQRStack.Screen
                name="ScanearQR"
                component={ScanearQR}
                options={{
                    headerTitle: 'Scanear QR',
                    headerShown: false
                }}
            />
            <ScanQRStack.Screen
                name="PerfilChofer"
                component={PerfilChofer}
                options={{
                    headerTitle: 'Perfil del Chofer',
                    headerTitleAlign: 'center',
                }}
            />
        </ScanQRStack.Navigator>
    );
}

// Perfil Usuario Stack
const PerfilStack = createNativeStackNavigator();

function PerfilNavigator() {
    return (
        <PerfilStack.Navigator initialRouteName="PerfilUsuario">
            <PerfilStack.Screen
                name="PerfilUsuario"
                component={PerfilUsuario}
                options={{
                    headerTitle: 'Mi Perfil',
                    headerShown: false
                }}
            />
            <PerfilStack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerTitle: 'Cambiar Contraseña',
                    headerTitleAlign: 'center',
                }}
            />
        </PerfilStack.Navigator>
    );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

function MainTabs() {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <Tab.Navigator
            initialRouteName="Monitoreo"
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    height: 80,
                    alignItems: 'center',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    textAlign: 'center',
                },
                tabBarIconStyle: {
                    size: 30,
                    alignSelf: 'center',
                },
            }}
        >
            <Tab.Screen
                name="Monitoreo"
                component={Monitoreo}
                options={{
                    tabBarLabel: 'Monitorear',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="map-marker-path" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="ScanearQR"
                component={ScanQRNavigator}
                options={{
                    tabBarLabel: 'Introducir código',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="text-box-search-outline" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Historial"
                component={Historial}
                options={{
                    tabBarLabel: 'Historial',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="clock-rotate-left" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilNavigator}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="feed-person" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

// Main Navigation
export default function Navigation() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AuthFlow />
            </NavigationContainer>
        </AuthProvider>
    );
}
