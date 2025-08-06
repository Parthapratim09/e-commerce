import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

export default function CheckoutDetails() {
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
      // ✅ Step 1: Create Razorpay order
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount })
      });
      const data = await res.json();

      // ✅ Step 2: Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "My E-Commerce Store",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          // ✅ Payment successful → save order to DB
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/create`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
            body: JSON.stringify({
              userId: "USER_ID_FROM_CONTEXT", // Replace later with actual logged in user
              items: cart.map(item => ({
                product: item.product._id,
                quantity: item.quantity
              })),
              totalAmount,
              customerDetails: formData,
              paymentId: response.razorpay_payment_id
            })
          });

          alert("✅ Payment Successful! Order Saved.");
          window.location.href = "/success";
        },
        modal: {
          ondismiss: function () {
            // ❌ If user closes payment → go back to cart
            window.location.href = "/cart";
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
  );
}
