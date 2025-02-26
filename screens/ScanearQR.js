import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../utils/api';

export default function ScanearQR({ navigation }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState(null);
  let popupTimer;

  const startPopupTimer = () => {
    clearTimeout(popupTimer);
    popupTimer = setTimeout(() => setShowPopup(true), 4500);
  };

  useFocusEffect( 
    React.useCallback(() => {
      startPopupTimer();
      return () => clearTimeout(popupTimer);
    }, [])
  );

  const closeModal = () => {
    setShowModal(false);
    setShowPopup(false);
    setError(null);
    setCodigo("");
  };

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
        closeModal();
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
  

  return (
    <View style={styles.container}>
      <View style={styles.qrFrame}>
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
      <TouchableOpacity
        style={styles.scanButton}
        /* onPress={() => navigation.navigate('PerfilChofer')} */
      />
      {showPopup && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>¿Problemas para scanear? Introduce el código manualmente.</Text>
          <TouchableOpacity style={styles.popupButton} onPress={() => setShowModal(true)}>
            <Text style={styles.popupButtonText}>Introducir código</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
            <Text style={styles.modalTitle}>Introducir Código</Text>
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1919',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrFrame: {
    width: 200,
    height: 200,
    borderColor: '#fffafa',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fffafa',
  },
  topLeft: {
    top: -2,
    left: -2,
    borderLeftWidth: 4,
    borderTopWidth: 4,
  },
  topRight: {
    top: -2,
    right: -2,
    borderRightWidth: 4,
    borderTopWidth: 4,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  scanButton: {
    position: 'absolute',
    bottom: 50,
    width: 70,
    height: 70,
    backgroundColor: '#fffafa',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  popupText: {
    color: '#fffafa',
  },
  popupButton: {
    marginTop: 5,
    backgroundColor: '#4ba961',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',
  },
  popupButtonText: {
    color: 'white',
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#1c1919',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
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
  },
  errorText: {
    color: '#ff3131',
    fontSize: 14,
    marginTop: 10,
  }
});
