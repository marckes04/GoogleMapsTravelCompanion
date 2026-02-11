import React, { useState } from "react";
import {
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Grid2 as Grid,
} from "@mui/material";
import { Container, StyledFormControl, ListContainer } from "./Style";

import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = () => {
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const places = [
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
    { name: "Cool Place" },
    { name: "Best Beer" },
    { name: "Best Steak" },
  ];

  // ... existing imports

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Restaurants, Hotels & Attractions
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <StyledFormControl fullWidth variant="standard">
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </StyledFormControl>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <StyledFormControl fullWidth variant="standard">
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </StyledFormControl>
        </Grid>
      </Grid>

      {/* Use ListContainer here for the scrollable area */}
      <ListContainer>
        <Grid container spacing={3}>
          {places?.map((place, i) => (
            /* item prop removed, size={{ xs: 12 }} added */
            <Grid size={{ xs: 12 }} key={i}>
              <PlaceDetails place={place} />
            </Grid>
          ))}
        </Grid>
      </ListContainer>
    </Container>
  );
};

export default List;