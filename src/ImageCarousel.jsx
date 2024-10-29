import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ImageCarousel = () => {
  const [imageIndex, setImageIndex] = useState(1);

  const images = [
    "Image 1",
    "Image 2",
    "Image 3",
  ];

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Row>
        <Col className="text-center">
          <div style={{
            width: '200px', height: '300px', backgroundColor: '#007bff',
            color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>Totem</div>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>Sub unit 1</div>
            <Button variant="link" onClick={handlePrev} style={{ position: 'absolute', left: '10px', color: 'white' }}>
              &#9664;
            </Button>
            <div>{images[imageIndex]}</div>
            <Button variant="link" onClick={handleNext} style={{ position: 'absolute', right: '10px', color: 'white' }}>
              &#9654;
            </Button>
            <Button variant="link" onClick={handleNext} style={{ position: 'absolute', bottom: '10px', color: 'white' }}>
              &#9660;
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageCarousel;
