// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, Image, Alert } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { BarIndicator, BallIndicator } from 'react-native-indicators';
// import { Box, VStack, Button } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { fetchVehicleStatus } from '../utilities/api';

// const LoadingScreen = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const { data } = route.params;
//     const [errMessage, setErrMessage] = useState('')
  
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const result = await fetchVehicleStatus(data);
//             if (result[0].StatusEnCirculation === "Le véhicule n'existe pas") {
//                 setErrMessage("Cette voiture n'a pas d'assurance")
//               navigation.navigate('InputChasisNumber', { errorMessage: errMessage });
//             } else {
//               const mostRecentStatus = result[0].StatusEnCirculation.reduce((prev, current) => {
//                 return new Date(prev.datesais) > new Date(current.datesais) ? prev : current;
//               });
//               navigation.navigate('VehicleInfo', { mostRecentStatus });
//             }
//           } catch (error) {
//             console.log(`The error is : ${error.message}`);
//             setErrMessage("Échec de l'envoi de la demande. Veuillez réessayer.")
//             navigation.navigate('InputChasisNumber', { errorMessage: errMessage });
//           }
//         };
  
//         fetchData();
//       }, [data, navigation, errMessage]);

//   return (
//     <Box flex={1} bg="white">
//       <VStack flex={1} space={4} p={4}>
//         <Box style={styles.header}>
//           <Button onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Icon name="arrow-left" style={styles.backButtonText} onPress={() => navigation.goBack()} resizeMode={'contain'}/>
//           </Button>
//         </Box>
//         <Box justifyContent={'center'} alignItems={'center'} style={styles.container}>
//             <Box justifyContent={'center'} alignItems={'center'} style={styles.centeredContainer}>
//                 <Box justifyContent={'center'} alignItems={'center'} >
//                     <Image source={require('../../assets/progressIndicator.gif')} style={styles.indicator} />
//                     <Text style={styles.text}>Merci de patienter.</Text>
//                 </Box>
//             </Box>
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// const styles = StyleSheet.create({
//     header: {
//         width: wp('100%'),
//         alignItems: 'flex-start',
//         height: hp('6%'),
//         padding: 10,
//       },
//       backButton: {
//         backgroundColor: 'transparent',
//       },
//       backButtonText: {
//         fontSize: 20,
//         color: 'black',
//       },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     height: hp('90%'),
//     flexDirection: 'column',
//     position: 'relative'
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: hp('80%'),
//     position: 'absolute',
//     top: '40%'
//   },
//   indicator: {
//     width: wp('18%'), 
//     height: hp('18%'), 
//   },
//   text: {
//     marginTop: 0,
//     fontSize: 14,
//     color: '#000',
//     fontWeight: '700'
//   },
// });

// export default LoadingScreen;


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, VStack, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fetchVehicleStatus } from '../utilities/api';

const LoadingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { data } = route.params;
    const [errMessage, setErrMessage] = useState('');
    const [mostRecentStatus, setMostRecentStatus] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchVehicleStatus(data);
                console.log('Full API response:', result);

                if (!result.Valeur || !result.Valeur.body || result.Valeur.body.length === 0) {
                    setErrMessage("Aucune information d'assurance trouvée");
                    navigation.navigate('InputChasisNumber', { errorMessage: "Aucune information d'assurance trouvée" });
                    return;
                }

                const insuranceItems = result.Valeur.body;
                
                // Find active insurance (where dateEche is in future)
                const now = new Date();
                const activeInsurance = insuranceItems.find(item => {
                    const expirationDate = new Date(item.dateEche.split('/').reverse().join('-'));
                    return expirationDate > now;
                });

                let selectedInsurance;
                if (activeInsurance) {
                    selectedInsurance = activeInsurance;
                } else {
                    // Find most recent expired insurance
                    selectedInsurance = insuranceItems.reduce((prev, current) => {
                        const prevDate = new Date(prev.dateEche.split('/').reverse().join('-'));
                        const currentDate = new Date(current.dateEche.split('/').reverse().join('-'));
                        return prevDate > currentDate ? prev : current;
                    });
                }

                // Map to the expected format for VehicleInfoScreen
                const formattedData = {
                    numerodimmatriculation: selectedInsurance.immatric,
                    numerodechassis: selectedInsurance.numEchas,
                    datedeffet: selectedInsurance.dateEffe,
                    datedexpiration: selectedInsurance.dateEche,
                    dureedassurance: selectedInsurance.duree,
                    nomdelassure: `${selectedInsurance.raisSoc} ${selectedInsurance.prenAssu}`,
                    adresseassure: selectedInsurance.adreAssu,
                    puissance: selectedInsurance.puisVehi,
                    nombredeplaces: selectedInsurance.nombPlac,
                    zone_circulation: selectedInsurance.codeZone,
                    statutdassurance: selectedInsurance.bloc === 'EMISS' ? 'EN COURS' : 'Expiré',
                    numero_police: selectedInsurance.numePoli,
                    datesais: selectedInsurance.dateComp,
                    droit_timbre: selectedInsurance.drtTmAut,
                    compagnie: selectedInsurance.compgn
                };

                navigation.navigate('InputChasisNumber', { 
                    insuranceStatus: formattedData.statutdassurance,
                    mostRecentStatus: formattedData
                });
            } catch (error) {
                console.error('Error:', error);
                setErrMessage("Échec de l'envoi de la demande. Veuillez réessayer.");
                navigation.navigate('InputChasisNumber', { errorMessage: errMessage });
            }
        };
        fetchData();
    }, [data, navigation, errMessage, mostRecentStatus]);

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
                        <Box justifyContent={'center'} alignItems={'center'}>
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
