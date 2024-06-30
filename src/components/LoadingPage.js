import React, { useEffect } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarIndicator, BallIndicator } from 'react-native-indicators';
import { Box, VStack, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('VehicleInfo');
    }, 3000);

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
                    <Image source={require('../../assets/progressIndicator.gif')} style={styles.indicator} />
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
    width: wp('18%'), 
    height: hp('18%'), 
  },
  text: {
    marginTop: 0,
    fontSize: 14,
    color: '#000',
    fontWeight: '700'
  },
});

export default LoadingScreen;
