import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import api from '../utils/api';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen'; // Importar SplashScreen
import { Image } from 'expo-image';

export default function ScanearQR({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isReady, setIsReady] = useState(false); // Para manejar si la app está lista

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
    setShowModal(false);
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        // Prevenir que la pantalla de inicio se oculte automáticamente
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    prepare();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setIsReady(true); // Cuando las fuentes estén cargadas, se marca que la app está lista
      SplashScreen.hideAsync(); // Ocultar la splash screen
    }
  }, [fontsLoaded]);

  if (!isReady) {
    return null; // No mostramos nada hasta que las fuentes se carguen
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titulo}>Introducir Código</Text>
      </View>

      {/* Mostrar instrucciones y gif solo encima del botón */}
      <View style={styles.instructionsContainer}>
        <View style={styles.gifContainer}>
          <Image
            source={require('../assets/Codigo.gif')}
            style={styles.gif}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.instructionText}>1. Pidele a tu conductor que te de el código.</Text>
        <Text style={styles.instructionText}>2. Ingresa el código del vehículo</Text>
        <Text style={styles.instructionText}>3. Presiona "Introducir código" para continuar</Text>
      </View>

      {/* Botón para mostrar el modal */}
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setShowModal(true)} // Cambiar estado a true para mostrar el modal
      >
        <Text style={styles.openModalButtonText}>Introducir código</Text>
      </TouchableOpacity>

      {/* Modal flotante, visible solo si showModal es true */}
      {showModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* "X" en la esquina superior derecha para cerrar el modal */}
            <TouchableOpacity
              onPress={() => setShowModal(false)} // Cerrar el modal al hacer clic en la "X"
              style={styles.closeIcon}
            >
              <Text style={styles.closeIconText}>X</Text>
            </TouchableOpacity>

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
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </View>
      )}
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
  titleContainer: {
    marginLeft: 12,
    position: "absolute",
    top: 15,
    left: 12
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gifContainer: {
    width: '100%',  // Asegura que el contenedor se expanda
    alignItems: 'center',  // Centra el GIF horizontalmente
  },
  gif: {
    width: 200,  // Valor fijo para evitar que desaparezca
    height: 150, 
    marginBottom: 10,
  },
  instructionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#fffafa',
    marginVertical: 2,
  },
  openModalButton: {
    backgroundColor: '#67a0ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  openModalButtonText: {
    color: '#fffafa',
    fontFamily: "Poppins_700Bold",
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalContent: {
    backgroundColor: '#fffafa',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    zIndex: 2,
    position: 'relative',
    paddingTop: 50,  // Aumenta el espacio superior
    minHeight: 180,  // Asegura que haya espacio suficiente
  },    
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 3,
  },
  closeIconText: {
    color: 'gray',
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },  
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#67a0ff',
    paddingVertical: 15, // Hace el botón más alto
    paddingHorizontal: 40, // Hace el botón más ancho
    borderRadius: 10, // Bordes más suaves
    marginTop: 10, // Más separación con el input
    width: '80%', // Para que se vea más proporcionado en el modal
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fffafa',
    fontFamily: "Poppins_700Bold",
    fontSize: 18, // Texto más grande
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
