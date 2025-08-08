import { useEffect, useState } from 'react';
import { Button, Typography, Container, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';    
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { setCount } = useContext(CartContext);


  const goToCheckout = () => {
    navigate("/checkout");
  };

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

  const updateQuantity = async (productId, quantity) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/update`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, quantity })
    });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove/${productId}`, {
      method: "DELETE",
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
        <>
          {cart.map(({ product, quantity }) => (
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
          ))}
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ mt: 2 }} 
            onClick={goToCheckout}
            disabled={cart.length === 0}
          >
            🛒 Buy Now
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
