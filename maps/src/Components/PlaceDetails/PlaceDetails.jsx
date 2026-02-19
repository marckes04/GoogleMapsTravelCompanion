import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const PlaceDetails = ({ place, selected, refProp }) => {
  
  useEffect(() => {
    if (selected) {
      refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selected, refProp]);

  return (
    <Card elevation={6} ref={refProp} sx={{ 
        transition: 'all 0.3s', 
        border: selected ? '2px solid #1976d2' : 'none',
        backgroundColor: selected ? '#f0f7ff' : '#fff'
    }}>
      <CardMedia
        sx={{ height: 300 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Rating value={Number(place.rating)} readOnly precision={0.5} />
          <Typography variant="subtitle1">de {place.num_reviews} Reviews</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
        </Box>
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} sx={{ m: '5px 5px 5px 0' }} />
        ))}
        {place.address && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1 }} /> {place.address}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>Trip Advisor</Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>Web</Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;