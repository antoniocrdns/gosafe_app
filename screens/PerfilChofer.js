import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

export default function DriverProfile() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <FontAwesome5 name="user-circle" size={100} color="#4ba961" />
        </View>
        <Text style={styles.name}>Jaimito Corrales Carranza</Text>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <MaterialIcons name="credit-card" size={24} color="#4ba961" />
          <Text style={styles.infoTextInter}>JM876431MX</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="phone" size={24} color="#4ba961" />
          <Text style={styles.infoTextInter}>6541647645</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 28, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: 'black',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoTextInter: {
    marginLeft: 8,
    fontSize: 18, 
    color: '#333',
    fontFamily: 'Inter_400Regular',
  },
});