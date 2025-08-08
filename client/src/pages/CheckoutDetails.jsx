import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography,Snackbar,Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
export default function CheckoutDetails() {
const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [cart, setCart] = useState([]);
  const totalAmount = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  useEffect(() => {
    fetchCart();    
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setCart(data.items);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(totalAmount) })
      });
      const data = await res.json();
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "My E-Commerce Store",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/create`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
            body: JSON.stringify({
              userId: localStorage.getItem("userId"),
              items: cart.map(item => ({
                product: item.product._id,
                quantity: item.quantity
              })),
              totalAmount,
              customerDetails: formData,
              paymentId: response.razorpay_payment_id
            })
          });

          setSnackbar({ open: true, message: 'Payment Successful', severity: 'success' });
          setCart([]);
          setTimeout(() => {
              navigate("/home");
            }, 2000);
        },
        modal: {
          ondismiss: function () {
            setSnackbar({ open: true, message: 'Payment Failed', severity: 'error' });
            setTimeout(() => {
              navigate("/cart");
            }, 2000);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
    }
  };

  return (
    <>
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Checkout Details</Typography>

      <TextField fullWidth label="Name" name="name" onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Email" name="email" onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Phone" name="phone" onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Address" name="address" onChange={handleChange} sx={{ mt: 2 }} />

      <Typography variant="h5" sx={{ mt: 2 }}>Total: ₹{totalAmount}</Typography>

      <Button 
        variant="contained" 
        color="success" 
        sx={{ mt: 3 }}
        onClick={handlePayment}
      >
        Pay Now
      </Button>
    </Container>
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
}
