import React from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { Box, Text, Button, VStack, Center, HStack } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const WelcomePage = () => {
  return (
    <Box flex={1} bg="white">
      <VStack flex={1}>
        <Center flex={1} p={4}>
          <VStack space={4} alignItems="center">
            <Image
              source={require('../../assets/bg1.png')}
              alt="Background"
              style={styles.backgroundImage}
            />
            <Image
              source={require('../../assets/african-american-woman-violet-dress-cap-posed-yellow-car.jpg')}
              alt="Car"
              style={styles.carImage}
            />
            <ImageBackground
              source={require('../../assets/Isolation_Mode.png')}
              style={styles.textBackground}
              resizeMode="contain"
              imageStyle={styles.imageBackground}
            >
              <Text style={styles.text}>
                Vérifier la validité de l’assurance TPV du véhicule en moins d’une minute.
              </Text>
            </ImageBackground>
          </VStack>
        </Center>
        <Box style={styles.buttonContainer} p={4} bg="white" >
          <Button style={styles.button} size="lg" colorScheme="teal" _text={{ fontWeight: 'bold' }}>
            Vérifier mon assurance
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: wp('90%'),
    height: hp('4%'),  // 5% of screen height
    borderRadius: 18,
  },
  carImage: {
    width: wp('90%'),
    height: hp('50%'),  // 50% of screen height
    borderRadius: 15,
  },
  textBackground: {
    width: wp('90%'),
    height: hp('30%'), // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageBackground: {
    height: hp('10%'),
    marginTop: "50%",
    marginLeft: "110px"
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black', // Make sure text is readable on the background image
  },
  buttonContainer: {
    width: wp('100%'),
    height: hp('5%'),
    position: "relative",
  },
  button: {
    width: wp('90%'),
    position: "absolute",
    bottom: 0,
  },
});

export default WelcomePage;
