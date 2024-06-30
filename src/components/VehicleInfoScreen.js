import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Box, Text, VStack, HStack, Divider, Button, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const VehicleInfoScreen = () => {
    const insuranceData = {
        'Numéro d\'immatriculation': 'OU 835 AH',
        'Numéro de châssis': 'ABC123456789',
        'Date d\'effet': '01/04/2024',
        'Date d\'expiration': '01/04/2025',
        'Durée': '365 Jours',
        'Nom de l\'assuré': 'Jean Dupont',
        'Adresse': 'Rue de l\'Assurance, Yaoundé',
        'Puissance': '9 CV',
        'Nombre de places dans le véhicule': '5',
        'Zone de circulation': 'Zone A',
        'Contrat': 'Assurances tous risques',
        'Numéro de police': 'POL23456',
        'Date d\'émission': '15/03/2024',
        'DTA payée?': 'Oui',
        'Validité de DTA': '2024',
        };
  return (
    <View>
    <Box flex={1} bg="#D3D3D3" h={hp('100%')}>
      <Box style={styles.header}>
        <Button onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" style={styles.backButtonText} />
        </Button>
        <Text style={styles.headerText}>Informations du véhicule</Text>
      </Box>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Box style={styles.card}>
          <Box style={styles.sectionHeader} >
            <Image source={require('../../assets/userManual.png')} style={styles.sectionIcon} />
          </Box>
          <Box justifyContent={'center'} alignItems={'center'}>
            <Divider bg="#9F57C0" width={wp('70%')} height={'2px'}/>
          </Box>
          <Text marginLeft={wp('7%')} fontSize={"lg"} py={2} color={"#9F57C0"} fontWeight={'bold'}>Assurance</Text>
          <VStack space={2} p={4} borderColor={"#9F57C0"} borderWidth={0.5}>
            {Object.entries(insuranceData).map(([label, value], index) => (
              <Box key={index}>
                <HStack justifyContent="space-between" alignItems="center" py={1}>
                  <Text style={styles.label}>{label}</Text>
                  <Text style={styles.value}>{value}</Text>
                </HStack>
                {index < Object.entries(insuranceData).length - 1 && <Divider bg="#9F57C0"  height={'0.5px'}/>}
              </Box>
            ))}
          </VStack>
        </Box>
        {/* Add other sections in a similar way */}
      </ScrollView>
    </Box>
    </View>
  );
};

const renderRow = (label, value) => (
  <HStack justifyContent="space-between" alignItems="center">
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </HStack>
);

const styles = StyleSheet.create({
  header: {
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 4, // for android shadow
    shadowColor: '#000', // for ios shadow
    shadowOffset: { width: 0, height: 2 }, // for ios shadow
    shadowOpacity: 0.2, // for ios shadow
    shadowRadius: 2, // for ios shadow
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  backButtonText: {
    fontSize: 20,
    color: 'black',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    elevation: 1, // for android shadow
    shadowColor: '#000', // for ios shadow
    shadowOffset: { width: 0, height: 1 }, // for ios shadow
    shadowOpacity: 0.1, // for ios shadow
    shadowRadius: 1, // for ios shadow
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: "center",
  },
  sectionIcon: {
    width: 48,
    height: 48
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default VehicleInfoScreen;
