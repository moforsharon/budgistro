import React from 'react';
import { View, Text, StyleSheet, Button, Modal, Image } from 'react-native';
import useIosInstallPrompt from './hooks/useIosInstallPrompt';
import useWebInstallPrompt from './hooks/useWebInstallPrompt';

export const InstallPWA = () => {
  const [iosInstallPrompt, handleIOSInstallDeclined] = useIosInstallPrompt();
  const [webInstallPrompt, handleWebInstallDeclined, handleWebInstallAccepted] = useWebInstallPrompt();

  if (!iosInstallPrompt && !webInstallPrompt) {
    return null;
  }

  return (
    <Modal
      visible={iosInstallPrompt || webInstallPrompt}
      transparent={true}
      animationType="slide"
      onRequestClose={() => { if (iosInstallPrompt) handleIOSInstallDeclined(); if (webInstallPrompt) handleWebInstallDeclined(); }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            style={styles.icon}
            source={{ uri: '../assets/iconImage.png' }} // Replace with your actual icon path
          />
          <Text style={styles.title}>Installer l'application</Text>
          <Text style={styles.text}>Install this application on your Home screen for quick and easy access when you're on the go.</Text>
          {iosInstallPrompt && (
            <Text style={styles.instructions}>
              Tap <Image style={styles.shareIcon} source={{ uri: '../assets/upload-100.png' }} /> then "Add to Home Screen"
            </Text>
          )}
          {webInstallPrompt && (
            <View style={styles.buttonContainer}>
              <Button title="Install" onPress={handleWebInstallAccepted} />
              <Button title="Close" onPress={handleWebInstallDeclined} />
            </View>
          )}
          {iosInstallPrompt && (
            <Button backgroundColor={'#1CA7AE'} title="Close" onPress={handleIOSInstallDeclined} />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center'
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    marginBottom: 14
  },
  instructions: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center'
  },
  shareIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5
  },
  bold: {
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  }
});
