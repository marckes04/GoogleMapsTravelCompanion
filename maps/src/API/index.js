import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const isHotel = type === 'hotels';
    
    // Si es hotel, usamos el nuevo endpoint POST v2
    if (isHotel) {
      const { data: { data } } = await axios.post(
        `https://travel-advisor.p.rapidapi.com/hotels/v2/list`,
        {
          boundingBox: {
            northEast: { lat: ne.lat, lon: ne.lng },
            southWest: { lat: sw.lat, lon: sw.lng }
          }
        },
        {
          headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': '24d54e64demsh536a6b2379f80d3p187d79jsn22b3045ede39',
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          }
        }
      );
      return data?.data || [];
    }

    // Para Restaurantes y Atracciones seguimos con GET (por ahora)
    const { data: { data } } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'x-rapidapi-key': '24d54e64demsh536a6b2379f80d3p187d79jsn22b3045ede39',
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};