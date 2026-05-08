import { useState } from "react";
import { Box } from "@mui/material";

const ProductImageSlider = ({ images }) => {

  const [selectedImage, setSelectedImage] = useState(
    images?.[0] || ""
  );

  if (!images || images.length === 0) {
    return (
      <img
        src="/placeholder.png"
        alt="No product"
        width="400"
      />
    );
  }

  return (

    <Box>

      <Box
        sx={{
          border: "1px solid #ddd",
          padding: "10px",
          textAlign: "center"
        }}
      >

        <img
          src={selectedImage}
          alt="Product"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain"
          }}
        />

      </Box>

    
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginTop: "10px"
        }}
      >

        {images.map((img, index) => (

          <img
            key={index}
            src={img}
            alt="thumbnail"
            onClick={() => setSelectedImage(img)}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              cursor: "pointer",
              border:
                selectedImage === img
                  ? "2px solid blue"
                  : "1px solid #ccc"
            }}
          />

        ))}

      </Box>

    </Box>

  );

};

export default ProductImageSlider;