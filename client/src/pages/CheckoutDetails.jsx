// import { useState, useEffect } from "react";
// import { TextField, Button, Container, Typography,Snackbar,Alert } from "@mui/material";
// import { useNavigate } from 'react-router-dom';
// export default function CheckoutDetails() {
// const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
// const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "India"
//   });

//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   const [cart, setCart] = useState([]);
//   const totalAmount = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

//   useEffect(() => {
//     fetchCart();    
//   }, []);

//   const fetchCart = async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const data = await res.json();
//     setCart(data.items);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePlaceOrder = async () => {

//     // CASH ON DELIVERY
// if (paymentMethod === "COD") {

//   try {

//     await fetch(
//       `${import.meta.env.VITE_BACKEND_URL}/api/orders/create`,
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         },

//         body: JSON.stringify({

//           orderItems: cart.map(item => ({
//             product: item.product._id,
//             quantity: item.quantity,
//             price: item.product.price,
//             image: item.product.images?.[0]
//           })),

//           shippingAddress: {
//             fullName: formData.name,
//             phone: formData.phone,
//             address: formData.address,
//             city: formData.city,
//             postalCode: formData.postalCode,
//             country: formData.country
//           },

//           totalPrice: totalAmount,

//           paymentMethod: "COD",

//           paymentStatus: "Pending"

//         })

//       }
//     );

//     setSnackbar({
//       open: true,
//       message: "Order placed successfully (COD)",
//       severity: "success"
//     });

//     setCart([]);

//     setTimeout(() => {
//       navigate("/");
//     }, 2000);

//   } catch (err) {

//     console.error(err);

//     setSnackbar({
//       open: true,
//       message: "Failed to place order",
//       severity: "error"
//     });

//   }

//   return;
// }

//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: Math.round(totalAmount) })
//       });
//       const data = await res.json();
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: "INR",
//         name: "My E-Commerce Store",
//         description: "Order Payment",
//         order_id: data.id,
//         handler: async function (response) {
//           try {
//           await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/create`, {
//             method: "POST",
//             headers: { 
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}` 
//             },
//             body: JSON.stringify({
//               orderItems: cart.map(item => ({
//                 product: item.product._id,
//                 quantity: item.quantity,
//                 price: item.product.price,
//                 image: item.product.images?.[0]
//               })),

//               shippingAddress: {
//                   fullName: formData.name,
//                   phone: formData.phone,
//                   address: formData.address,
//                   city: "Default City",
//                   postalCode: formData.postalCode,
//                   country: "India"
//                 },

//               totalPrice: totalAmount,
              
//               paymentId: response.razorpay_payment_id,
//               paymentMethod: "Razorpay",
//               paymentStatus: "Paid"
//             })
//           });

//           setSnackbar({ open: true, message: 'Payment Successful', severity: 'success' });
//           setCart([]);
//           setTimeout(() => {
//               navigate("/");
//             }, 2000);
//         } catch (err) {
//           console.error("Payment Error:", err);
//           setSnackbar({ open: true, message: 'Payment Failed', severity: 'error' });
//         }
//       },
//         modal: {
//           ondismiss: function () {
//             setSnackbar({ open: true, message: 'Payment Cancelled', severity: 'warning' });
//             // setTimeout(() => {
//             //   navigate("/cart");
//             // }, 2000);
//           }
//         },
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: "#3399cc" }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment Error:", err);
//     }
//   };

//   return (
//     <>
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4">Checkout Details</Typography>

//       <TextField fullWidth label="Name" name="name" onChange={handleChange} sx={{ mt: 2 }} />
//       <TextField fullWidth label="Email" name="email" onChange={handleChange} sx={{ mt: 2 }} />
//       <TextField fullWidth label="Phone" name="phone" onChange={handleChange} sx={{ mt: 2 }} />
//       <TextField fullWidth label="Address" name="address" onChange={handleChange} sx={{ mt: 2 }} />
//       <TextField fullWidth label="City" name="city" onChange={handleChange} sx={{ mt: 2 }} />
//       <TextField fullWidth label="Postal Code" name="postalCode" onChange={handleChange} sx={{ mt: 2 }} />
//       <TextField fullWidth label="Country" name="country" onChange={handleChange} sx={{ mt: 2 }} defaultValue="India" />

//       <Typography variant="h5" sx={{ mt: 2 }}>Total: ₹{totalAmount}</Typography>


//       <Typography variant="h6" sx={{ mt: 3 }}>
//   Payment Method
// </Typography>

// <div style={{
//   display: "flex",
//   gap: "10px",
//   marginTop: "10px"
// }}>

//   <Button
//     variant={
//       paymentMethod === "COD"
//         ? "contained"
//         : "outlined"
//     }
//     onClick={() => setPaymentMethod("COD")}
//   >
//     Cash on Delivery
//   </Button>

//   <Button
//     variant={
//       paymentMethod === "Razorpay"
//         ? "contained"
//         : "outlined"
//     }
//     onClick={() => setPaymentMethod("Razorpay")}
//   >
//     Razorpay
//   </Button>

// </div>

//       <Button 
//         variant="contained" 
//         color="success" 
//         sx={{ mt: 3 }}
//         onClick={handlePlaceOrder}
//       >
//         {paymentMethod === "COD"
//   ? "Place Order"
//   : "Pay Now"}
//       </Button>
//     </Container>
//     <Snackbar
//             open={snackbar.open}
//             autoHideDuration={4000}
//             onClose={() => setSnackbar({ ...snackbar, open: false })}
//             anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
//           >
            
//             <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
//               {snackbar.message}
//             </Alert>
//           </Snackbar>
//     </>
//   );
// }



import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  CircularProgress
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function CheckoutDetails() {

  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [placingOrder, setPlacingOrder] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India"
  });

  const [cart, setCart] = useState([]);

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + (item.product?.price || 0) * item.quantity,
    0
  );

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setCart(data.items || []);

    } catch (err) {

      console.error(err);

      setSnackbar({
        open: true,
        message: "Failed to load cart",
        severity: "error"
      });

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const validateForm = () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {

      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "warning"
      });

      return false;

    }

    if (!cart.length) {

      setSnackbar({
        open: true,
        message: "Cart is empty",
        severity: "warning"
      });

      return false;

    }

    return true;

  };

  const createOrderPayload = () => {

    return {

      orderItems: cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images?.[0]
      })),

      shippingAddress: {
        fullName: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country
      },

      totalPrice: totalAmount

    };

  };

  const handlePlaceOrder = async () => {

    if (!validateForm()) return;

    setPlacingOrder(true);


    if (paymentMethod === "COD") {

      try {

        const orderData = {
          ...createOrderPayload(),
          paymentMethod: "COD",
          paymentStatus: "Pending"
        };

        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/create`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },

            body: JSON.stringify(orderData)
          }
        );

        setSnackbar({
          open: true,
          message: "Order placed successfully (COD)",
          severity: "success"
        });

        setCart([]);

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } catch (err) {

        console.error(err);

        setSnackbar({
          open: true,
          message: "Failed to place order",
          severity: "error"
        });

      } finally {

        setPlacingOrder(false);

      }

      return;
    }

    

    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },

          body: JSON.stringify({
            amount: Math.round(totalAmount)
          })
        }
      );

      const data = await res.json();

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: "INR",

        name: "My E-Commerce Store",

        description: "Order Payment",

        order_id: data.id,

        handler: async function (response) {

          try {

            const orderData = {

              ...createOrderPayload(),

              paymentId: response.razorpay_payment_id,

              paymentMethod: "Razorpay",

              paymentStatus: "Paid"

            };

            await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/orders/create`,
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                },

                body: JSON.stringify(orderData)
              }
            );

            setSnackbar({
              open: true,
              message: "Payment Successful",
              severity: "success"
            });

            setCart([]);

            setTimeout(() => {
              navigate("/");
            }, 2000);

          } catch (err) {

            console.error(err);

            setSnackbar({
              open: true,
              message: "Order creation failed",
              severity: "error"
            });

          } finally {

            setPlacingOrder(false);

          }

        },

        modal: {

          ondismiss: function () {

            setPlacingOrder(false);

            setSnackbar({
              open: true,
              message: "Payment Cancelled",
              severity: "warning"
            });

          }

        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },

        theme: {
          color: "#3399cc"
        }

      };

      const rzp = new window.Razorpay(options);

      rzp.open();

    } catch (err) {

      console.error(err);

      setSnackbar({
        open: true,
        message: "Payment Failed",
        severity: "error"
      });

      setPlacingOrder(false);

    }

  };

  return (
    <>

      <Container sx={{ mt: 4, mb: 6 }} maxWidth="sm">

        <Typography variant="h4" gutterBottom>
          Checkout Details
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Postal Code"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <Typography variant="h5" sx={{ mt: 4 }}>
          Total: ₹{totalAmount}
        </Typography>

      

        <Typography variant="h6" sx={{ mt: 4 }}>
          Payment Method
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2
          }}
        >

          <Button
            variant={
              paymentMethod === "COD"
                ? "contained"
                : "outlined"
            }
            onClick={() => setPaymentMethod("COD")}
          >
            Cash on Delivery
          </Button>

          <Button
            variant={
              paymentMethod === "Razorpay"
                ? "contained"
                : "outlined"
            }
            onClick={() => setPaymentMethod("Razorpay")}
          >
            Razorpay
          </Button>

        </Box>

        

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 4, py: 1.5 }}
          onClick={handlePlaceOrder}
          disabled={placingOrder}
        >

          {placingOrder ? (
            <CircularProgress size={24} color="inherit" />
          ) : paymentMethod === "COD" ? (
            "Place Order"
          ) : (
            "Pay Now"
          )}

        </Button>

      </Container>

      

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false
          })
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >

        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false
            })
          }
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

    </>
  );
}