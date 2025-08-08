import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Rating,
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { setCount } = useContext(CartContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setReviews(data.reviews || []);
      });
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSnackbar({ open: true, message: 'Please login or register to add items to cart.', severity: 'warning' });
      return;
    }

    setCount((prevCount) => prevCount + 1);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/add`,
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: 'Product added to cart!', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Failed to add to cart.', severity: 'error' });
    }
  };

  const handleAddReview = () => {
    if (!rating || !reviewText) {
      setSnackbar({ open: true, message: 'Please provide both comment and rating.', severity: 'warning' });
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ comment: reviewText, rating }),
    })
      .then((res) => res.json())
      .then((newReview) => {
        setReviews((prev) => [...prev, newReview]);
        setReviewText('');
        setRating(0);
        setSnackbar({ open: true, message: 'Review submitted!', severity: 'success' });
      })
      .catch((err) => {
        console.error(err);
        setSnackbar({ open: true, message: 'Failed to submit review.', severity: 'error' });
      });
  };

 if (!product) {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );
}

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <CardMedia component="img" image={product.image} height="300" />
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography>₹{product.price}</Typography>
          <Button variant="contained" onClick={handleAddToCart} sx={{ mt: 2 }}>
            Add to Cart
          </Button>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Reviews:
          </Typography>

          {reviews.length === 0 && <Typography>No reviews yet.</Typography>}
          {reviews.map((r, i) => (
            <Box key={i} sx={{ my: 2, borderBottom: '1px solid #ccc', pb: 1 }}>
              <Typography variant="body2">
                🧑 {r.author?.name || 'User'}
              </Typography>
              <Rating value={r.rating} readOnly size="small" />
              <Typography variant="body2">{r.comment}</Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(r.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}

          <Typography variant="h6" sx={{ mt: 3 }}>
            Add a Review:
          </Typography>

          <TextField
            fullWidth
            label="Write a review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            sx={{ mt: 1 }}
          />
          <Button onClick={handleAddReview} variant="outlined" sx={{ mt: 1 }}>
            Submit Review
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </>
  );
};

export default ProductDetail;
