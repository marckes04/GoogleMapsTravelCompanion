import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Typography, Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material'; // Usamos Grid estándar
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    // Sincronizamos las referencias con la cantidad de lugares
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <Box sx={{ p: '25px' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Explorar Alrededor</Typography>
      
      {isLoading ? (
        <Box sx={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Tipo</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="standard">
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value={0}>Todos</MenuItem>
                <MenuItem value={3}>+ 3.0</MenuItem>
                <MenuItem value={4}>+ 4.0</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ height: '70vh', overflowY: 'auto' }}>
            <Grid container spacing={3}>
              {places?.map((place, i) => (
                <Grid item xs={12} key={i}> {/* Usamos item xs={12} que es la sintaxis estable */}
                  <PlaceDetails 
                    place={place} 
                    selected={Number(childClicked) === i} 
                    refProp={elRefs[i]} 
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default List;