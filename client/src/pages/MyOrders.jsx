import { useEffect, useState } from "react";

import axios from "../config/axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        "/api/orders/my-orders"
      );

      setOrders(res.data);

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

  return (

    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold"
        }}
      >
        My Orders
      </Typography>

      {orders.length === 0 ? (

        <Typography>
          No orders found
        </Typography>

      ) : (

        orders.map(order => (

          <Card
            key={order._id}
            elevation={3}
            sx={{ mb: 4 }}
          >

            <CardContent>

              

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2
                }}
              >

                

                <Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Order ID
                  </Typography>

                  <Typography
                    sx={{
                      maxWidth: 220,
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {order._id}
                  </Typography>

                </Box>

              

                <Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total
                  </Typography>

                  <Typography fontWeight="bold">
                    ₹{order.totalPrice}
                  </Typography>

                </Box>

            

                <Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Payment
                  </Typography>

                  <Chip
                    label={
                      order.paymentMethod || "COD"
                    }
                    color={
                      order.paymentMethod === "COD"
                        ? "warning"
                        : "success"
                    }
                    size="small"
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
                    size="small"
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
                    size="small"
                  />

                </Box>

              </Box>

              <Divider sx={{ my: 3 }} />

              

              <Typography
                variant="h6"
                sx={{ mb: 2 }}
              >
                Ordered Products
              </Typography>

              {order.orderItems?.map((item, index) => (

                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2
                  }}
                >

                  

                  <img
                    src={item.image}
                    alt={item.name}
                    width="80"
                    height="80"
                    style={{
                      objectFit: "cover",
                      borderRadius: 8,
                      border: "1px solid #ddd"
                    }}
                  />

                  

                  <Box>

                    <Typography
                      fontWeight="bold"
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                    >
                      Quantity: {item.quantity}
                    </Typography>

                    <Typography
                      variant="body2"
                    >
                      Price: ₹{item.price}
                    </Typography>

                  </Box>

                </Box>

              ))}

              

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                Ordered On:{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </Typography>

          

              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() =>
                  navigate(
                    `/my-orders/${order._id}`
                  )
                }
              >
                View Details
              </Button>

            </CardContent>

          </Card>

        ))

      )}

    </Container>

  );

};

export default MyOrders;