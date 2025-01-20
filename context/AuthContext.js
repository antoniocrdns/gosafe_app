import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    const login = async () => {
        setIsAuthenticated(true);
        await AsyncStorage.setItem('isAuthenticated', 'true'); 
    };

    const logout = async () => {
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
