import React from 'react';
import { Image, StyleSheet, TextInput } from 'react-native';
import { Box, Text, Button, VStack, Center, HStack } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputChasisNumberPage = ({ navigation }) => {

  return (
    <Box flex={1} bg="white">
      <VStack flex={1} space={4} px={4}>
        <Box style={styles.header}>
          <Button onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" style={styles.backButtonText} onPress={() => navigation.goBack()} resizeMode={'contain'}/>
          </Button>
        </Box>
        <Center flex={1} px={4}>
          <Image
            source={require('../../assets/page2.png')} 
            alt="Chasis Number"
            style={styles.chasisImage}
            resizeMode={'contain'}
          />
          <Text  mt={0} mb={8} px={2} textAlign="center" fontWeight={"semibold"} color={"#696969"} fontSize={"14px"}>
            Veuillez saisir l'informations de votre véhicule
          </Text>
          <Box width={wp('90%')} mb={4} h={'20%'} mt={8}>
            <Text fontWeight={"bold"}  fontSize={"15px"} mb={1}>
              Numéro d'immatriculation ou numéro de châssis
            </Text>
            <TextInput
              style={styles.input}
            />
          </Box>
          <Box style={styles.buttonContainer} px={4}>
          <Button style={styles.button} size="lg" colorScheme="teal" _text={{ fontWeight: 'bold' }}  onPress={() => navigation.navigate('Loading')}>
            <Text style={styles.buttonText}>Suivant</Text>
          </Button>
        </Box>
        </Center>
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
  chasisImage: {
    width: wp('90%'),
    height: hp('40%'), // Adjust the height as needed
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: wp('100%'),
    height: hp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
  },
  button: {
    width: wp('90%'),
    position: "absolute",
    bottom: 0,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    
  },
});

export default InputChasisNumberPage;
