import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Opcional para persistir el estado

// Crear el contexto
const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Efecto para cargar el estado de autenticación desde AsyncStorage
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const storedAuthStatus = await AsyncStorage.getItem('isAuthenticated');
                if (storedAuthStatus === 'true') {
                    setIsAuthenticated(true);
                }
            } catch (e) {
                console.error('Error loading authentication status:', e);
            }
        };

        checkAuthStatus();
    }, []);

    // Función para iniciar sesión
    const login = async () => {
        setIsAuthenticated(true);
        await AsyncStorage.setItem('isAuthenticated', 'true');  // Guardar el estado
    };

    // Función para cerrar sesión
    const logout = async () => {
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('isAuthenticated');  // Eliminar el estado
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);
