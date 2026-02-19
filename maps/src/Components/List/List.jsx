import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid2 as Grid, Typography, Box } from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    // Sincronizamos las referencias con la cantidad de lugares
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <Box sx={{ p: '25px' }}>
      <Typography variant="h5" sx={{ mb: 3 }}></Typography>
      {isLoading ? (
        <Box sx={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <Box sx={{ height: '75vh', overflowY: 'auto', overflowX: 'hidden' }}>
          <Grid container spacing={3}>
            {places?.map((place, i) => (
              <Grid size={{ xs: 12 }} key={i}>
                <PlaceDetails 
                  place={place} 
                  selected={Number(childClicked) === i} 
                  refProp={elRefs[i]} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default List;