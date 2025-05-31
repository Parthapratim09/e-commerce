import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, Container, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const CartPage = () => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get('http://localhost:5000/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCart(res.data.items);
  };

  const updateQuantity = async (productId, quantity) => {
    await axios.put('http://localhost:5000/api/cart/update', { productId, quantity }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        cart.map(({ product, quantity }) => (
        <Card key={product._id} sx={{ display: 'flex', mb: 2 }}>
    <CardMedia
      component="img"
      sx={{ width: 150 }}
      image={product.image || 'https://via.placeholder.com/150'}
      alt={product.name}
    />
    <CardContent sx={{ flex: 1 }}>
      <Typography>{product.name} - ₹{product.price} x {quantity}</Typography>
      <Button onClick={() => updateQuantity(product._id, quantity + 1)}>+</Button>
      <Button onClick={() => updateQuantity(product._id, Math.max(1, quantity - 1))}>-</Button>
      <IconButton onClick={() => removeFromCart(product._id)}>
        <DeleteIcon />
      </IconButton>
    </CardContent>
  </Card>

        ))
      )}
    </Container>
  );
};

export default CartPage;
