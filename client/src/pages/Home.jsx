import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Snackbar, Alert,Container } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const { setCount } = useContext(CartContext);

   const fetchCart = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCart(data.items);
    console.log("Cart items:", data.items);
    const totalItems = data.items.length;
    setCount(totalItems);
    console.log("Total items in cart:", totalItems);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("An error occurred while fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnackbar({
        open: true,
        message: "Please login to add items to cart.",
        severity: "warning",
      });
      return;
    }
    setCount((prevCount) => prevCount + 1);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: "Product added to cart!", severity: "success" });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setSnackbar({ open: true, message: "Failed to add to cart.", severity: "error" });
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      {loading ? (
        <>
          <Loader />
          <p>Loading products...</p>
        </>
      ) : (
        <Grid container spacing={2} padding={2}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card>
                <Link to={`/products/${product._id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image || 'https://via.placeholder.com/140'}
                    alt={product.name}
                  />
                </Link>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₹{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(product._id)}
                    sx={{ mt: 1 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
