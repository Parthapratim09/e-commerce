import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "../../config/axios";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from "@mui/material";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ProductEdit = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    countInStock: ""
  });

  const [images, setImages] = useState([]);

  
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await axios.get(`/api/products/${id}`);

        const product = res.data;

        setForm({
          name: product.name,
          price: product.price,
          description: product.description,
          countInStock: product.countInStock
        });

        setImages(
  (product.images || []).filter(
    img => img && img.trim() !== ""
  )
);

      } catch {

        alert("Failed to load product");

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  
  const uploadImages = async (files) => {

    setUploading(true);

    const uploadedUrls = [];

    try {

      for (let file of files) {

        const data = new FormData();

        if (!file.type.startsWith("image/")) {
        alert("Only image files allowed");
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

      
      setImages(prev => [...prev, ...uploadedUrls.filter(Boolean)]);

    } catch {
      console.error(err);
      alert("Image upload failed");

    } finally {

      setUploading(false);

    }

  };


  const removeImage = (img) => {

    setImages(images.filter(image => image !== img));

  };

  
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(`/api/products/${id}`, {

        name: form.name,
        price: Number(form.price),
        description: form.description,
        countInStock: Number(form.countInStock),
        images: images

      });

      alert("Product updated successfully");

      navigate("/admin/products");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Update failed"
      );

    }

  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (

    <Container maxWidth="sm">

      <Typography variant="h4" sx={{ mt: 4 }}>
        Edit Product
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>

        <TextField
          fullWidth
          label="Product Name"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Price"
          type="number"
          name="price"
          margin="normal"
          value={form.price}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          margin="normal"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Stock Quantity"
          type="number"
          name="countInStock"
          margin="normal"
          value={form.countInStock}
          onChange={handleChange}
        />

        
        <Button
          variant="outlined"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload More Images

          <input
            type="file"
            hidden
            multiple
            onChange={(e) => uploadImages(e.target.files)}
          />

        </Button>

        {uploading && (
          <Typography sx={{ mt: 1 }}>
            Uploading images...
          </Typography>
        )}

        {/* Image previews */}
        {/* <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mt: 3
          }}
        > */}

        <Box
      sx={{
       display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 2,
        mt: 3
      }}
    >


          {images.filter(Boolean).map((img, index) => (

            <Box
              key={index}
              sx={{
                position: "relative"
              }}
            >

              <img
                src={img}
                alt=""
                width="100"
                height="100"
                style={{
                  objectFit: "cover",
                  borderRadius: 8
                }}
              />

              <Button
                size="small"
                color="error"
                onClick={() => removeImage(img)}
              >
                Remove
              </Button>

            </Box>

          ))}

        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 4 }}
        >
          Update Product
        </Button>

      </Box>

    </Container>

  );

};

export default ProductEdit;