import axios from 'axios';

export const fetchVehicleStatus = async (data) => {
  try {
    const { numeroDeChassis, attestation, numeroDImmatriculation } = data;

    const url = `https://proxy-server-rouge-eta.vercel.app/api/proxy??numeroDeChassis=${numeroDeChassis}&attestation=${attestation}&numeroDImmatriculation=${numeroDImmatriculation}`;

    console.log('Sending request to URL:', url);

    const response = await axios({
      method: 'get',
      url: url,
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
