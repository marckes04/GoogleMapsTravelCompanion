import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Box, Typography } from '@mui/material';

const Map = () => {
  const coordinates = { lat: 0, lng: 0 }; // We'll update this with real data later

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBpGJQmVN_W73vk-Cals-0s7HI_H6g6x6M" // Replace with your real key
  });

  if (loadError) return <div>Error loading maps</div>;

  return (
    <Box sx={{ height: '85vh', width: '100%' }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={coordinates}
          zoom={14}
        >
          {/* Markers go here */}
        </GoogleMap>
      ) : (
        <Typography>Loading Map...</Typography>
      )}
    </Box>
  );
};

export default React.memo(Map);