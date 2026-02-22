import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const isHotel = type === 'hotels';
    
    // URL común y Headers comunes para evitar repetición
    const URL = isHotel 
      ? `https://travel-advisor.p.rapidapi.com/hotels/v2/list` 
      : `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;


    const headers = {
      'x-rapidapi-key': process.env.REACT_APP_PLACES_KEY,
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    };

    if (isHotel) {
      // Endpoint V2 (POST)
      const { data } = await axios.post(
        URL,
        {
          boundingBox: {
            northEast: { lat: ne.lat, lon: ne.lng },
            southWest: { lat: sw.lat, lon: sw.lng }
          }
        },
        { headers: { ...headers, 'content-type': 'application/json' } }
      );
      // La estructura de V2 suele ser data.data.data o similar, ajustamos:
      return data?.data?.data || []; 
    }

    // Restaurantes y Atracciones (GET)
    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: headers,
    });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.response ? error.response.data : error.message);
  }
};