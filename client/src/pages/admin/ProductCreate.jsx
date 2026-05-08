import { useState } from "react";
import axios from "../../config/axios";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ProductCreate = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    countInStock: ""
  });

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  const uploadImages = async (files) => {

    setUploading(true);

    const uploadedUrls = [];

    for (let file of files) {

      const data = new FormData();

       if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image`);
        continue;
      }

      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data
        }
      );

      const result = await res.json();

      if (result.secure_url) {
        uploadedUrls.push(result.secure_url);
      }

    }

     setImages(prev => [
      ...prev,
      ...uploadedUrls.filter(Boolean)
    ]);

    setUploading(false);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post("/api/products", {

        name: form.name,
        price: Number(form.price),
        description: form.description,
        countInStock: Number(form.countInStock),
        images: images

      });

      alert("Product created successfully");

      navigate("/admin/products");

    } catch {

      alert("Failed to create product");

    }

  };

  return (

    <Container maxWidth="sm">

      <Typography variant="h4" sx={{ mt: 4 }}>
        Create Product
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>

        <TextField
          fullWidth
          label="Product Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          margin="normal"
          multiline
          rows={3}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Stock Quantity"
          name="countInStock"
          type="number"
          margin="normal"
          onChange={handleChange}
        />

        <Button
          variant="outlined"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload Images
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => uploadImages(e.target.files)}
          />
        </Button>

        {uploading && <Typography>Uploading images...</Typography>}

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>

          {images.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              width="80"
              height="80"
              style={{ objectFit: "cover" }}
            />

          ))}

        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
        >
          Create Product
        </Button>

      </Box>

    </Container>

  );

};

export default ProductCreate;