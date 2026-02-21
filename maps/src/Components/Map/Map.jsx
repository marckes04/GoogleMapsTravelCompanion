import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Rating, Box } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Map = ({ coords, places, setCoords, setBounds, setChildClicked }) => {
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <Box sx={{ height: '85vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDGqLvov5vkkIEq5cv9AUcg0_LbleRSwWk" }}
        center={coords}
        defaultCenter={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          // ENVOLTORIO DIV PARA EVITAR LOS WARNINGS $geoService
          <div
            key={i}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            style={{ position: 'relative' }}
          >
            <Box sx={{ 
              position: 'absolute', 
              transform: 'translate(-50%, -100%)', 
              zIndex: 1, 
              '&:hover': { zIndex: 5 } 
            }}>
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} sx={{ p: '10px', display: 'flex', flexDirection: 'column', width: '100px' }}>
                  <Typography variant="subtitle2">{place.name}</Typography>
                  <img
                    style={{ cursor: 'pointer', height: '70px', borderRadius: '4px', objectFit: 'cover' }}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </Box>
          </div>
        ))}
      </GoogleMapReact>
    </Box>
  );
};

export default Map;