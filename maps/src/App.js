import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid2 as Grid } from '@mui/material';

import { getPlacesData } from './API/index'; // Asegúrate de que la ruta sea correcta
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Obtener ubicación actual al cargar
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    }, (error) => console.error("Error de ubicación:", error));
  }, []);

  // 2. Llamada a la API cuando el mapa se mueve
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData(bounds.sw, bounds.ne)
        .then((data) => {
          // FILTRO CRÍTICO: Eliminamos lugares sin coordenadas para no romper los índices
          const filteredData = data?.filter((place) => place.name && place.latitude && place.longitude);
          setPlaces(filteredData);
          setChildClicked(null); // Reiniciar selección al cambiar de zona
          setIsLoading(false);
        });
    }
  }, [bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <List 
            places={places} 
            childClicked={childClicked} 
            isLoading={isLoading} 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;