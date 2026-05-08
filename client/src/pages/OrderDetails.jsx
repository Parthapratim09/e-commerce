import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "../config/axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Divider
} from "@mui/material";

const steps = [
  "Pending",
  "Accepted",
  "Packed",
  "Shipped",
  "Delivered"
];

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchOrder();

  }, []);

  const fetchOrder = async () => {

    try {

      const res = await axios.get(
        `/api/orders/${id}`
      );

      setOrder(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10
        }}
      >

        <CircularProgress />

      </Box>

    );

  }

  if (!order) {

    return (

      <Typography sx={{ mt: 5 }}>
        Order not found
      </Typography>

    );

  }

  return (

    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>

    

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold"
        }}
      >
        Order Details
      </Typography>

      

      <Card elevation={3} sx={{ mb: 4 }}>

        <CardContent>

          <Typography
            variant="h6"
            sx={{ mb: 4 }}
          >
            Delivery Progress
          </Typography>

          <Stepper
            activeStep={
              steps.indexOf(
                order.orderStatus
              )
            }
            alternativeLabel
          >

            {steps.map(step => (

              <Step key={step}>

                <StepLabel>
                  {step}
                </StepLabel>

              </Step>

            ))}

          </Stepper>

        </CardContent>

      </Card>

   

      <Card elevation={3} sx={{ mb: 4 }}>

        <CardContent>

          <Typography
            variant="h6"
            sx={{ mb: 3 }}
          >
            Order Information
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Order ID:</strong>{" "}
            {order._id}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Order Date:</strong>{" "}
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </Typography>

          <Typography sx={{ mb: 2 }}>
            <strong>Total Amount:</strong>{" "}
            ₹{order.totalPrice}
          </Typography>

          

          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap"
            }}
          >

            <Box>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Payment Method
              </Typography>

              <Chip
                label={
                  order.paymentMethod
                }
                color={
                  order.paymentMethod === "COD"
                    ? "warning"
                    : "success"
                }
              />

            </Box>

            <Box>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Payment Status
              </Typography>

              <Chip
                label={
                  order.paymentStatus
                }
                color={
                  order.paymentStatus === "Paid"
                    ? "success"
                    : "error"
                }
              />

            </Box>

            <Box>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Order Status
              </Typography>

              <Chip
                label={
                  order.orderStatus
                }
                color="primary"
              />

            </Box>

          </Box>

        </CardContent>

      </Card>


      <Card elevation={3} sx={{ mb: 4 }}>

        <CardContent>

          <Typography
            variant="h6"
            sx={{ mb: 3 }}
          >
            Shipping Address
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Name:</strong>{" "}
            {order.shippingAddress?.fullName}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Phone:</strong>{" "}
            {order.shippingAddress?.phone}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Address:</strong>{" "}
            {order.shippingAddress?.address}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>City:</strong>{" "}
            {order.shippingAddress?.city}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Postal Code:</strong>{" "}
            {order.shippingAddress?.postalCode}
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Country:</strong>{" "}
            {order.shippingAddress?.country}
          </Typography>

        </CardContent>

      </Card>

     

      <Card elevation={3}>

        <CardContent>

          <Typography
            variant="h6"
            sx={{ mb: 3 }}
          >
            Ordered Products
          </Typography>

          {order.orderItems?.map(
            (item, index) => (

              <Box key={index}>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    py: 2
                  }}
                >

                  

                  <img
                    src={item.image}
                    alt={item.name}
                    width="90"
                    height="90"
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                      border:
                        "1px solid #ddd"
                    }}
                  />

                 

                  <Box>

                    <Typography
                      fontWeight="bold"
                    >
                      {item.name}
                    </Typography>

                    <Typography>
                      Quantity:{" "}
                      {item.quantity}
                    </Typography>

                    <Typography>
                      Price: ₹{item.price}
                    </Typography>

                    <Typography>
                      Subtotal: ₹
                      {item.quantity *
                        item.price}
                    </Typography>

                  </Box>

                </Box>

                {index !==
                  order.orderItems.length -
                    1 && <Divider />}

              </Box>

            )
          )}

        </CardContent>

      </Card>

    </Container>

  );

};

export default OrderDetails;