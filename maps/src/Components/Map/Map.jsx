import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Box, Typography } from "@mui/material";

const Map = ({ setCoordinates, setBounds, coordinates }) => {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBpGJQmVN_W73vk-Cals-0s7HI_H6g6x6M",
  });

  const onIdle = () => {
    if (map) {
      const b = map.getBounds();
      if (b) {
        setBounds({
          ne: { lat: b.getNorthEast().lat(), lng: b.getNorthEast().lng() },
          sw: { lat: b.getSouthWest().lat(), lng: b.getSouthWest().lng() },
        });
      }
    }
  };

  return (
    <Box sx={{ height: "85vh", width: "100%" }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={coordinates}
          zoom={14}
          onLoad={(m) => setMap(m)}
          onIdle={() => {
            const b = map.getBounds();
            if (b) {
              setBounds({
                ne: {
                  lat: b.getNorthEast().lat(),
                  lng: b.getNorthEast().lng(),
                },
                sw: {
                  lat: b.getSouthWest().lat(),
                  lng: b.getSouthWest().lng(),
                },
              });
            }
          }}
        />
      ) : (
        <Typography>Loading Map...</Typography>
      )}
    </Box>
  );
};

export default React.memo(Map);
