import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import api from '../utils/api'; 
import { useAuth } from '../context/AuthContext'; 

export default function PerfilChofer({ route }) {
  const { user } = useAuth(); 
  const [userInfo, setUserInfo] = useState(null);
  const { id_conductor } = route.params;
  const [isReady, setIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Inter_400Regular,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/conductores/${id_conductor}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        
        if (user) {
          await fetchUserInfo();
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [user, id_conductor]);

  if (!fontsLoaded || !userInfo || !isReady) {
    return null;
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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    padding: width * 0.05, // 5% del ancho de la pantalla
    backgroundColor: '#4ba961',
  },
  profileContainer: {
    backgroundColor: '#fffafa',
    padding: width * 0.05, // 5% del ancho de la pantalla
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    marginBottom: height * 0.03, // 3% de la altura de la pantalla
    width: width * 0.35, // 35% del ancho de la pantalla
    height: width * 0.35, // Mantiene el avatar cuadrado
    borderRadius: width * 0.175, // Hace el avatar circular
    backgroundColor: '#fffafa', // Fondo verde del avatar
    justifyContent: 'center', // Centra el icono verticalmente
    alignItems: 'center', // Centra el icono horizontalmente
    overflow: 'hidden', // Asegura que el icono quede dentro del avatar circular
    alignSelf: 'center', // CENTRA el avatar horizontalmente
  },
  name: {
    fontSize: width * 0.065, // 6.5% del ancho de la pantalla
    fontWeight: 'bold',
    color: '#1c1919',
    marginBottom: height * 0.02, // 2% de la altura de la pantalla
    textAlign: 'center', // Centra el nombre en caso de ser largo
  },
  divider: {
    width: '100%', // Ocupa el ancho completo del contenedor
    height: 1,
    backgroundColor: '#e9e9e9',
    marginVertical: height * 0.025, // 2.5% de la altura de la pantalla
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015, // 1.5% de la altura de la pantalla
  },
  infoTextInter: {
    marginLeft: width * 0.04, // 4% del ancho de la pantalla
    fontSize: width * 0.045, // 4.5% del ancho de la pantalla
    color: '#555',
    fontFamily: 'Inter_400Regular',
  },
});
