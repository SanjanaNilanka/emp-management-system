import { Box, Button, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const EmpSlideShow = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <Box sx={{position: 'relative', mb: 3}}>
      <Box sx={{width:'100%'}}>
        <img width='100%' src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={prevSlide}><ArrowBackIosIcon/></IconButton>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 3,
          right: 0,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={nextSlide}><ArrowForwardIosIcon/></IconButton>
      </Box>
      
      
    </Box>
  );
};

export default EmpSlideShow;
