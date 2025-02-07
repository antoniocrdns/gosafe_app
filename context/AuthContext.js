import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const storedAuthStatus = await AsyncStorage.getItem('isAuthenticated');
                const storedUser = await AsyncStorage.getItem('user');
                console.log('Estado de autenticación almacenado:', storedAuthStatus);
                console.log('Usuario almacenado:', storedUser);
                if (storedAuthStatus === 'true' && storedUser) {
                    setIsAuthenticated(true);
                    setUser(JSON.parse(storedUser));
                    console.log('Usuario autenticado:', JSON.parse(storedUser));
                }
            } catch (e) {
                console.error('Error loading authentication status:', e);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (userData) => {
        console.log('Actualizando estado de autenticación');
        setIsAuthenticated(true);
        setUser(userData);
        await AsyncStorage.setItem('isAuthenticated', 'true');
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        console.log('Usuario autenticado:', userData);
    };

    const logout = async () => {
        console.log('Cerrando sesión');
        setIsAuthenticated(false);
        setUser(null);
        await AsyncStorage.removeItem('isAuthenticated');
        await AsyncStorage.removeItem('user');
        console.log('Sesión cerrada');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);