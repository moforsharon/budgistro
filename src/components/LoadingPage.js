import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarIndicator } from 'react-native-indicators';
import { Box, VStack, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('InputChasisNumber'); // Replace with your next screen name
    }, 30000); // Simulate loading for 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <Box flex={1} bg="white">
      <VStack flex={1} space={4} p={4}>
        <Box style={styles.header}>
          <Button onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" style={styles.backButtonText} onPress={() => navigation.goBack()} resizeMode={'contain'}/>
          </Button>
        </Box>
        <Box justifyContent={'center'} alignItems={'center'} style={styles.container}>
            <Box justifyContent={'center'} alignItems={'center'} style={styles.centeredContainer}>
                <Box justifyContent={'center'} alignItems={'center'} >
                    <BarIndicator color="#D3D3D3" style={styles.indicator}/>
                    <Text style={styles.text}>Merci de patienter.</Text>
                </Box>
            </Box>
        </Box>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
    header: {
        width: wp('100%'),
        alignItems: 'flex-start',
        height: hp('6%'),
        padding: 10,
      },
      backButton: {
        backgroundColor: 'transparent',
      },
      backButtonText: {
        fontSize: 20,
        color: 'black',
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: hp('90%'),
    flexDirection: 'column',
    position: 'relative'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('80%'),
    position: 'absolute',
    top: '40%'
  },
  indicator: {
    width: wp('10%'), // Adjust the width as needed
    height: hp('10%'), // Adjust the height as needed
  },
  text: {
    marginTop: 6,
    fontSize: 16,
    color: '#000',
    fontWeight: '700'
  },
});

export default LoadingScreen;
