import React, { useEffect, useState } from "react";
import { CssBaseline, Grid2 as Grid } from "@mui/material";

import { getPlacesData } from "./API";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({});
  // Inside App.js
const [isLoading, setIsLoading] = useState(false);

  // Get initial user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  // App.js
useEffect(() => {
  // 1. GATEKEEPER: Don't run if bounds are missing or if we are already loading
  if (bounds?.sw && bounds?.ne && !isLoading) {
    
    // 2. DEBOUNCE: Wait 1 second after the map stops before calling the API
    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      
      getPlacesData(bounds.sw, bounds.ne)
        .then((data) => {
          setPlaces(data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }, 1000); 

    return () => clearTimeout(delayDebounceFn);
  }
}, [bounds]); // <--- ONLY bounds. NO coordinates.

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Passing places to the list */}
          <List places={places} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;