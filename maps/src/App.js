import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid2 as Grid } from '@mui/material';
import { LoadScript } from '@react-google-maps/api';

import { getPlacesData } from './API';
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';

// Importante: Definir las librerías fuera del componente para evitar re-renders infinitos
const libraries = ['places'];

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para filtros
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // 1. Obtener la ubicación inicial del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  // 2. Filtrado por Rating (Estrellas)
  useEffect(() => {
    const filtered = places?.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating, places]);

  // 3. Llamada a la API cuando cambian las coordenadas, el zoom o el tipo (Hoteles/Restaurantes)
  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          // Filtramos datos basura o anuncios que no traen nombre ni coordenadas
          const validData = data?.filter((place) => place.name && place.latitude && place.longitude);
          setPlaces(validData);
          setFilteredPlaces([]); // Limpiamos filtros anteriores
          setRating('');
          setIsLoading(false);
        });
    }
  }, [type, bounds]);

  return (
    <LoadScript 
      googleMapsApiKey="AIzaSyDGqLvov5vkkIEq5cv9AUcg0_LbleRSwWk" 
      libraries={libraries}
    >
      <CssBaseline />
      <Header setCoords={setCoords} />
      
      <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <List 
            places={filteredPlaces?.length ? filteredPlaces : places} 
            childClicked={childClicked} 
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </LoadScript>
  );
};

export default App;