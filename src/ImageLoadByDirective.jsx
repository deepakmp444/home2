import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";

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

  const handleNextImage = () => {
    if (folders[currentFolderIndex]?.images?.length) {
      setCurrentImageIndex((prev) =>
        prev < folders[currentFolderIndex].images.length - 1 ? prev + 1 : prev
      );
    }
  };

  const handlePreviousImage = () => {
    if (folders[currentFolderIndex]?.images?.length) {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  const handleNextFolder = () => {
    setCurrentFolderIndex((prev) =>
      prev < folders.length - 1 ? prev + 1 : prev
    );
    setCurrentImageIndex(0);
  };

  const handlePreviousFolder = () => {
    setCurrentFolderIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setCurrentImageIndex(0);
  };

  const currentFolder = folders[currentFolderIndex] || {};
  const currentImage =
    currentFolder.images?.[currentImageIndex] ||
    "No image available";

  return (
    <Container className="text-center mt-5">
      <h6>Totem Navigation</h6>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div
          className="image-container"
          style={{
            position: "relative",
            width: "250px",
            height: "500px",
            margin: "0 auto",
            border: "1px solid #ddd",
            background: "#f9f9f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Previous Folder (↑) */}
          <div
            onClick={handlePreviousFolder}
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              color: "#333",
              fontSize: "24px",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            ↑
          </div>

          {/* Next Folder (↓) */}
          <div
            onClick={handleNextFolder}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              color: "#333",
              fontSize: "24px",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            ↓
          </div>

          {/* Previous Image (←) */}
          <div
            onClick={handlePreviousImage}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#333",
              fontSize: "24px",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            ←
          </div>

          {/* Next Image (→) */}
          <div
            onClick={handleNextImage}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#333",
              fontSize: "24px",
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            →
          </div>

          {/* Image or Placeholder */}
          {folders.length > 0 && currentFolder.images?.length ? (
            <img
              src={`http://localhost:5004${currentImage}`}
              alt="Current"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <p style={{ color: "#777" }}>No image available</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default ImageLoadByDirective;
