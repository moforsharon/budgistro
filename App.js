import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyComponent from './src/components/LandingPage';
import { NativeBaseProvider } from 'native-base';
import DeviceDetection from './src/components/DeviceDetection';
import { Platform } from 'react-native';

export default function App() {
  return (
    <NativeBaseProvider>
      <DeviceDetection>
        <MyComponent/>
        <StatusBar style="auto" />
      </DeviceDetection>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

if (Platform.OS === 'web') {

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }
}