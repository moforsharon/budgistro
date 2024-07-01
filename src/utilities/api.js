import axios from 'axios';

export const fetchVehicleStatus = async (data) => {
  try {
    const { numeroDeChassis, attestation, numeroDImmatriculation } = data;

    const url = `http://41.211.108.123:4053/apiasac/pooltpv/api/save/getStatutVehiculeEncirculationApp?numeroDeChassis=${numeroDeChassis}&attestation=${attestation}&numeroDImmatriculation=${numeroDImmatriculation}`;

    console.log('Sending request to URL:', url);

    const response = await axios({
      method: 'get',
      url: `https://cors-anywhere.herokuapp.com/${url}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Received response:', response);

    if (response.status !== 200) {
      console.error('Failed to fetch vehicle status:', response.status, response.statusText);
      throw new Error(`Failed to fetch vehicle status: ${response.status} ${response.statusText}`);
    }

    const result = response.data;
    console.log('Received result:', result);

    return result;
  } catch (error) {
    console.error('Error occurred while fetching vehicle status:', error);
    throw error;
  }
};
