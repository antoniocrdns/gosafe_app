import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const clearAuthData = async () => {
            try {
                // Limpiar AsyncStorage para siempre empezar desde cero
                await AsyncStorage.clear();  // Esto elimina TODO el almacenamiento local
                console.log('AsyncStorage limpiado');
            } catch (e) {
                console.error('Error al limpiar AsyncStorage:', e);
            }
        };

        // Llamamos a clearAuthData para eliminar la autenticación guardada
        clearAuthData();

        // Por ahora, no verificamos nada de autenticación, ya que siempre queremos redirigir a Login
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);  // Finalizamos la carga

    }, []);  // Este efecto solo se ejecutará una vez al inicio

    const login = async (userId) => {
        setIsAuthenticated(true);
        setUser({ id: userId });  // Solo guardamos el id
        await AsyncStorage.setItem('isAuthenticated', 'true');
        await AsyncStorage.setItem('user', JSON.stringify({ id: userId }));  // Guardamos solo el id
    };

    const logout = async () => {
        setIsAuthenticated(false);
        setUser(null);
        await AsyncStorage.removeItem('isAuthenticated');
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
