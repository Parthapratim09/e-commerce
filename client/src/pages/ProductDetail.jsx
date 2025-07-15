// // import { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { Typography, Button, Card, CardMedia, CardContent, TextField } from '@mui/material';

// // const ProductDetail = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [reviewText, setReviewText] = useState('');
// //   const [reviews, setReviews] = useState([]);

// //   useEffect(() => {
// //     fetch(`http://localhost:5000/api/products/${id}`)
// //       .then(res => res.json())
// //       .then(data => {
// //         setProduct(data.product);
// //         setReviews(data.reviews || []);
// //       });
// //   }, [id]);

// //   const handleAddToCart = () => {
// //     // POST to /api/cart or trigger redux/state logic
// //   };

// //   const handleAddReview = () => {
// //     fetch(`http://localhost:5000/api/products/${id}/reviews`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${localStorage.getItem('token')}`,
// //       },
// //       body: JSON.stringify({ comment: reviewText }),
// //     })
// //       .then(res => res.json())
// //       .then(newReview => {
// //         setReviews(prev => [...prev, newReview]);
// //         setReviewText('');
// //       });
// //   };

// //   if (!product) return <Typography>Loading...</Typography>;

// //   return (
// //     <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
// //       <CardMedia component="img" image={product.imageUrl} height="300" />
// //       <CardContent>
// //         <Typography variant="h5">{product.name}</Typography>
// //         <Typography>₹{product.price}</Typography>
// //         <Button variant="contained" onClick={handleAddToCart} sx={{ mt: 2 }}>Add to Cart</Button>

// //         <Typography variant="h6" sx={{ mt: 3 }}>Reviews:</Typography>
// //         {reviews.map((r, i) => (
// //           <Typography key={i} variant="body2">🧑 {r.user.name}: {r.comment}</Typography>
// //         ))}

// //         <TextField
// //           fullWidth
// //           label="Write a review"
// //           value={reviewText}
// //           onChange={e => setReviewText(e.target.value)}
// //           sx={{ mt: 2 }}
// //         />
// //         <Button onClick={handleAddReview} variant="outlined" sx={{ mt: 1 }}>Submit Review</Button>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default ProductDetail;


// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   Container,
// //   Typography,
// //   Grid,
// //   Button,
// //   Card,
// //   CardMedia,
// //   CircularProgress,
// // } from "@mui/material";

// // export default function ProductDetail() {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
// //       setProduct(res.data);
// //       setLoading(false);
// //     });
// //   }, [id]);

// //   if (loading) {
// //     return (
// //       <Container sx={{ py: 5, textAlign: "center" }}>
// //         <CircularProgress />
// //       </Container>
// //     );
// //   }
// //   const handleAddToCart = async () => {
// //     // const token = localStorage.getItem("token");
  
// //     // if (!token) {
// //     //   alert("Please log in to add to cart");
// //     //   return;
// //     // }
  
// //     // try {
// //     //   const res = await axios.post(
// //     //     "http://localhost:5000/api/cart/add",
// //     //     {
// //     //       productId: product._id,
// //     //       quantity: 1
// //     //     },
// //     //     {
// //     //       headers: {
// //     //         Authorization: `Bearer ${token}`
// //     //       }
// //     //     }
// //     //   );
// //     //   console.log(res.data);
// //     //   alert("Product added to cart!");
// //     // } catch (err) {
// //     //   console.error(err);
// //     //   alert("Failed to add to cart.");
// //     // }
// //   };
  

// //   return (
// //     <Container sx={{ py: 5 }}>
// //       <Grid container spacing={4}>
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardMedia
// //               component="img"
// //               height="400"
// //               image={product.image}
// //               alt={product.name}
// //               sx={{ objectFit: "contain", p: 2 }}
// //             />
// //           </Card>
// //         </Grid>

// //         <Grid item xs={12} md={6}>
// //           <Typography variant="h4" gutterBottom>
// //             {product.name}
// //           </Typography>
// //           <Typography variant="h6" gutterBottom color="text.secondary">
// //             ${product.price.toFixed(2)}
// //           </Typography>
// //           <Typography variant="body1" paragraph>
// //             {product.description}
// //           </Typography>

// //           <Button variant="contained" size="large" color="primary" onClick={handleAddToCart}>
// //             Add to Cart
// //           </Button>
// //         </Grid>
// //       </Grid>
// //     </Container>
// //   );
// // }











// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Typography,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   TextField,
//   Rating,
//   Box,
// } from '@mui/material';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(0);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProduct(data);
//         setReviews(data.reviews || []);
//       });
//   }, [id]);

//   const handleAddToCart = () => {
//     // Cart logic here
//   };

//   const handleAddReview = () => {
//     if (!rating || !reviewText) {
//       alert("Please provide both comment and rating.");
//       return;
//     }

//     fetch(`http://localhost:5000/api/products/${id}/reviews`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify({ comment: reviewText, rating }),
//     })
//       .then((res) => res.json())
//       .then((newReview) => {
//         setReviews((prev) => [...prev, newReview]);
//         setReviewText('');
//         setRating(0);
//       });
//   };

//   if (!product) return <Typography>Loading...</Typography>;

//   return (
//     <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
//       <CardMedia component="img" image={product.image} height="300" />
//       <CardContent>
//         <Typography variant="h5">{product.name}</Typography>
//         <Typography>₹{product.price}</Typography>
//         <Button variant="contained" onClick={handleAddToCart} sx={{ mt: 2 }}>
//           Add to Cart
//         </Button>

//         <Typography variant="h6" sx={{ mt: 3 }}>
//           Reviews:
//         </Typography>

//         {reviews.length === 0 && <Typography>No reviews yet.</Typography>}
//         {reviews.map((r, i) => (
//           <Box key={i} sx={{ my: 2, borderBottom: '1px solid #ccc', pb: 1 }}>
//             <Typography variant="body2">
//               🧑 {r.author?.name || 'User'}
//             </Typography>
//             <Rating value={r.rating} readOnly size="small" />
//             <Typography variant="body2">{r.comment}</Typography>
//             <Typography variant="caption" color="text.secondary">
//               {new Date(r.createdAt).toLocaleString()}
//             </Typography>
//           </Box>
//         ))}

//         <Typography variant="h6" sx={{ mt: 3 }}>
//           Add a Review:
//         </Typography>

//         <TextField
//           fullWidth
//           label="Write a review"
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           sx={{ mt: 2 }}
//         />
//         <Rating
//           value={rating}
//           onChange={(e, newValue) => setRating(newValue)}
//           sx={{ mt: 1 }}
//         />
//         <Button onClick={handleAddReview} variant="outlined" sx={{ mt: 1 }}>
//           Submit Review
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductDetail;





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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetail;
