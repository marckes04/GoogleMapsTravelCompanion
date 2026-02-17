import React from 'react';
// Cambiamos todos los imports a @mui/material
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Chip,
  Rating 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

// IMPORTANTE: Ya no importamos 'useStyles' ni './styles.js'

const PlaceDetails = ({ place, selected, refProp }) => {
  // Efecto para scroll automático
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (!place) return null;

  return (
    <Card elevation={6} sx={{ borderRadius: '10px' }}>
      <CardMedia
        sx={{ height: 350 }}
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">
            {place.num_reviews} review{place.num_reviews > 1 && 's'}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level || 'N/A'}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking || 'N/A'}
          </Typography>
        </Box>

        {/* Premios/Awards */}
        {place?.awards?.map((award, i) => (
          <Box key={i} display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}

        {/* Cocina/Cuisine */}
        <Box display="flex" flexWrap="wrap" gap={1} my={2}>
          {place?.cuisine?.map(({ name }) => (
            <Chip key={name} size="small" label={name} />
          ))}
        </Box>

        {/* Dirección */}
        {place.address && (
          <Typography 
            gutterBottom 
            variant="body2" 
            color="textSecondary" 
            sx={{ display: 'flex', alignItems: 'center', mt: 2 }}
          >
            <LocationOnIcon sx={{ mr: 1, color: 'gray' }} /> {place.address}
          </Typography>
        )}

        {/* Teléfono */}
        {place.phone && (
          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ display: 'flex', alignItems: 'center', mt: 1 }}
          >
            <PhoneIcon sx={{ mr: 1, color: 'gray' }} /> {place.phone}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;