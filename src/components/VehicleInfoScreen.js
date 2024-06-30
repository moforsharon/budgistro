import React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Box, Text, VStack, HStack, Divider, Button, View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const VehicleInfoScreen = () => {
  return (
    <View>
    <Box flex={1} bg="#D5D5D5" h={hp('100%')}>
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
            <Divider bg="#9F57C0" width={wp('60%')} height={'2px'}/>
          </Box>
          <VStack space={2} p={4}>
            {renderRow('Numéro d\'immatriculation', 'OU 835 AH')}
            {renderRow('Numéro de châssis', 'ABC123456789')}
            {renderRow('Date d\'effet', '01/04/2024')}
            {renderRow('Date d\'expiration', '01/04/2025')}
            {renderRow('Durée', '365 Jours')}
            {renderRow('Nom de l\'assuré', 'Jean Dupont')}
            {renderRow('Adresse', 'Rue de l\'Assurance, Yaoundé')}
            {renderRow('Puissance', '9 CV')}
            {renderRow('Nombre de places dans le véhicule', '5')}
            {renderRow('Zone de circulation', 'Zone A')}
            {renderRow('Contrat', 'Assurances tous risques')}
            {renderRow('Numéro de police', 'POL23456')}
            {renderRow('Date d\'émission', '15/03/2024')}
            {renderRow('DTA payée?', 'Oui')}
            {renderRow('Validité de DTA', '2024')}
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
