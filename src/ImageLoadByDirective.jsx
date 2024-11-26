import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

const ImageLoadByDirective = () => {
  const [folders, setFolders] = useState([]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch("http://localhost:5004/api/folders");
        const data = await response.json();
        console.log("Fetched folders:", data.folders);
        setFolders(data.folders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching folders:", error);
        setLoading(false);
      }
    };
    fetchFolders();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading...</p>
      </Container>
    );
  }

  if (!folders.length) {
    return (
      <Container className="text-center mt-5">
        <p>No folders found</p>
      </Container>
    );
  }

  const currentFolder = folders[currentFolderIndex];
  const hasImages = currentFolder.images.length > 0;
  const currentImage = hasImages
    ? currentFolder.images[currentImageIndex]
    : null;

  const handleNextImage = () => {
    if (currentImageIndex < currentFolder.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextFolder = () => {
    if (currentFolderIndex < folders.length - 1) {
      setCurrentFolderIndex(currentFolderIndex + 1);
      setCurrentImageIndex(0);
    }
  };

  const handlePreviousFolder = () => {
    if (currentFolderIndex > 0) {
      setCurrentFolderIndex(currentFolderIndex - 1);
      setCurrentImageIndex(0);
    }
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Totem Navigation</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Button
            variant="primary"
            onClick={handlePreviousFolder}
            disabled={currentFolderIndex === 0}
          >
            ↑ Previous Folder
          </Button>
        </Col>
        <Col xs={6}>
          <div className="image-container">
            <h4>{currentFolder.name}</h4>
            {hasImages ? (
              <>
                <img
                  src={`http://localhost:5004${currentImage}`}
                  alt="Current"
                  style={{ width: "100%", maxHeight: "300px" }}
                />
                <p>{currentImage.split("/").pop()}</p>
              </>
            ) : (
              <p>No images available in this folder</p>
            )}
          </div>
        </Col>
        <Col xs={3}>
          <Button
            variant="primary"
            onClick={handleNextFolder}
            disabled={currentFolderIndex === folders.length - 1}
          >
            ↓ Next Folder
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        {hasImages && (
          <>
            <Col xs={6}>
              <Button
                variant="secondary"
                onClick={handlePreviousImage}
                disabled={currentImageIndex === 0}
              >
                ← Previous Image
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                variant="secondary"
                onClick={handleNextImage}
                disabled={currentImageIndex === currentFolder.images.length - 1}
              >
                Next Image →
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default ImageLoadByDirective;
