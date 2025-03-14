import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import api from '../utils/api';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

export default function ScanearQR({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState(null);

  const handleCodigoInput = (text) => {
    setCodigo(text);
  };

  const handleConfirmCode = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.get(`vehiculos/id_conductor/${codigo}`);
  
      if (response.data && response.data.id_conductor) {
        navigation.navigate('PerfilChofer', { id_conductor: response.data.id_conductor });
        setCodigo("");
      } else if (response.data && response.data.message === 'Código no correspondiente') {
        setError('Código incorrecto. No se encontró un conductor asociado.');
      }
    } catch (err) {
      console.error('Error al validar el código:', err);
      if (!error) {
        setError('Hubo un problema al conectar con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titulo}>Introducir Código</Text>
      </View>
      <View style={styles.modalContent}>
        <TextInput 
          style={styles.input} 
          placeholder="Ingrese el código" 
          placeholderTextColor="#888" 
          value={codigo}
          onChangeText={handleCodigoInput}
        />
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCode} disabled={loading}>
          <Text style={styles.confirmButtonText}>
            {loading ? 'Verificando...' : 'Confirmar'}
          </Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}  {/* Mostrar errores */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ba961',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: { // Nuevo contenedor para el título
    marginLeft: 12,
    position: "absolute",
    top: 15,
    left: 12
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fffafa',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "Poppins_700Bold",
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#67a0ff',
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fffafa',
    fontFamily: "Poppins_700Bold",
  },
  errorText: {
    color: '#ff3131',
    fontSize: 14,
    marginTop: 10,
  },
  titulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 35,
    color: "#fffafa",
    fontWeight: "bold",
    marginTop: 30,
  },
});


