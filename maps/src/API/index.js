import axios from "axios";

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlacesData = async (sw, ne) => {
  try {
    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': '24d54e64demsh536a6b2379f80d3p187d79jsn22b3045ede39',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      },
    });
    return data?.filter((place) => place.name);
  } catch (error) {
    // If we hit a 429, we stop immediately
    if (error.response?.status === 429) {
      console.error("API QUOTA EXHAUSTED OR RATE LIMITED.");
    }
    return []; // Return empty array so the app doesn't crash
  }
};