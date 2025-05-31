// // src/pages/Home.jsx
// import { useEffect, useState } from 'react';
// import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// const Home = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/products') // adjust if needed
//       .then(res => res.json())
//       .then(data => setProducts(data))
//       .catch(err => console.error(err));
//   }, []);


//   const handleAddToCart = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setSnackbar({ open: true, message: 'Please login or register to add items to cart.', severity: 'warning' });
//       return;
//     }

//     try {
//       await axios.post(
//         'http://localhost:5000/api/cart/add',
//         { productId: product._id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSnackbar({ open: true, message: 'Product added to cart!', severity: 'success' });
//     } catch (error) {
//       console.error(error);
//       setSnackbar({ open: true, message: 'Failed to add to cart.', severity: 'error' });
//     }
//   };
//   return (
//     <Grid container spacing={2} padding={2}>
//       {products.map(product => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
//           <Card>
//             <Link to={`/products/${product._id}`}>
//             <CardMedia
//               component="img"
//               height="140"
//               image={product.image || 'https://via.placeholder.com/140'}
//               alt={product.name}
//             />
//             </Link>
//             <CardContent>
//               <Typography variant="h6">{product.name}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 ₹{product.price}
//               </Typography>
//               <Button variant="contained" onClick={handleAddToCart} sx={{ mt: 1}}>
//             Add to Cart
//           </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default Home;


import { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setSnackbar({ open: true, message: 'Please login to add items to cart.', severity: 'warning' });
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({ open: true, message: 'Product added to cart!', severity: 'success' });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Failed to add to cart.', severity: 'error' });
    }
  };

  return (
    <>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
