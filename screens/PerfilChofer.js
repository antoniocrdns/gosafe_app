import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import api from '../utils/api'; 
import { useAuth } from '../context/AuthContext'; 

export default function DriverProfile() {
  const { user } = useAuth(); 
  const [userInfo, setUserInfo] = useState(null);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/conductores/2`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  if (!fontsLoaded || !userInfo) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <FontAwesome5 name="user-circle" size={100} color="#4ba961" />
        </View>
        <Text style={styles.name}>{userInfo.nombre_completo}</Text>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={24} color="#4ba961" />
          <Text style={styles.infoTextInter}>{userInfo.correo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="phone" size={24} color="#4ba961" />
          <Text style={styles.infoTextInter}>{userInfo.telefono}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4ba961',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1919',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e9e9e9',
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTextInter: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },
});