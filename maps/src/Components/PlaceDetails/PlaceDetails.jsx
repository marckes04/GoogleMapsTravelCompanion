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

  // LOGICA PARA EXTRAER LA IMAGEN (Especial para hoteles)
  const getImageUrl = () => {
    if (place.photo && place.photo.images) {
      // Intenta obtener la imagen grande, si no la mediana, si no la pequeña
      return place.photo.images.large?.url || 
             place.photo.images.medium?.url || 
             place.photo.images.small?.url;
    }
    // Si la API devuelve un array de fotos (común en algunos endpoints de hoteles)
    if (place.images?.length > 0) {
        return place.images[0].url;
    }
    // Imagen por defecto si no hay nada
    return 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg';
  };

  return (
    <Card elevation={6} ref={refProp} sx={{ 
        mb: 2,
        border: selected ? '2px solid #1976d2' : 'none',
        backgroundColor: selected ? '#f0f7ff' : '#fff'
    }}>
      <CardMedia
        component="img"
        sx={{ height: 300, objectFit: 'cover' }}
        image={getImageUrl()} // Llamamos a nuestra función lógica
        alt={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.name || 'Nombre no disponible'}</Typography>
        
        <Box display="flex" justifyContent="space-between" my={1}>
          <Rating value={Number(place.rating)} readOnly precision={0.5} />
          <Typography variant="subtitle1">{place.num_reviews || 0} reseñas</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography variant="subtitle1">{place.price || place.price_level || 'Contactar'}</Typography>
        </Box>

        {/* Los hoteles a veces no tienen 'cuisine', tienen 'amenities' o nada */}
        <Box display="flex" flexWrap="wrap" gap={1} my={1}>
            {place?.cuisine?.map(({ name }) => (
                <Chip key={name} size="small" label={name} />
            ))}
            {/* Si es hotel, a veces los datos vienen en 'dietary_restrictions' o tags */}
            {place?.special_diets?.map(({ name }) => (
                <Chip key={name} size="small" label={name} color="secondary" />
            ))}
        </Box>

        {place.address && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon fontSize="small" sx={{ mr: 1 }} /> {place.address}
          </Typography>
        )}

        {place.phone && (
          <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <PhoneIcon fontSize="small" sx={{ mr: 1 }} /> {place.phone}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        {place.website && (
          <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
            Sitio Web
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

// Al final de tu archivo PlaceDetails.jsx
export default PlaceDetails;