import React, { useState, useEffect } from 'react';
import './carousel.scss'; // Import the SCSS file

const ImageCarousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="carousel-container">
        {/* Overlay */}
        <div className="carousel-overlay">
        </div>
        {images.map((image, index) => (
            <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
            />
        ))}
    </div>
  );
};

export default ImageCarousel;
