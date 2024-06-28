import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Box, Text, Button, VStack, Center } from 'native-base';

const WelcomePage = () => {
  return (
    <Box flex={1} bg="white" position="relative">
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
          <Text fontSize="lg" fontWeight="bold" textAlign="center" pt={60}>
            Vérifier la validité de l’assurance TPV du véhicule en moins d’une minute.
          </Text>
        </VStack>
      </Center>
      <Box position="absolute" bottom={-250} left={0} right={0} px={4}>
        <Button size="lg" colorScheme="teal" _text={{ fontWeight: 'bold' }}>
          Vérifier mon assurance
        </Button>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: 350,
    height: 30,
    borderRadius: 15,
  },
  carImage: {
    width: 350,
    height: 400,
    borderRadius: 15,
  },
});

export default WelcomePage;
