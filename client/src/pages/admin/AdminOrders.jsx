import { useEffect, useState } from "react";

import axios from "../../config/axios";

import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Box,
  Chip,
  Paper
} from "@mui/material";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const res = await axios.get("/api/orders/admin");

      setOrders(res.data);

    } catch (err) {

      console.error(err);

      alert("Failed to load orders");

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `/api/orders/admin/${id}/status`,
        { status }
      );

      fetchOrders();

    } catch {

      alert("Failed to update status");

    }

  };

  return (

    <Container maxWidth="xl">

      <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
        Order Management
      </Typography>

      <Paper elevation={3} sx={{ overflowX: "auto" }}>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell><strong>Customer</strong></TableCell>

              <TableCell><strong>Products</strong></TableCell>

              <TableCell><strong>Total</strong></TableCell>

              <TableCell><strong>Payment</strong></TableCell>

              <TableCell><strong>Payment Status</strong></TableCell>

              <TableCell><strong>Order Status</strong></TableCell>

              <TableCell><strong>Shipping Address</strong></TableCell>

              <TableCell><strong>Date</strong></TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {orders.map(order => (

              <TableRow key={order._id}>

              

                <TableCell>

                  <Typography fontWeight="bold">
                    {order.user?.name}
                  </Typography>

                  <Typography variant="body2">
                    {order.shippingAddress?.phone}
                  </Typography>

                </TableCell>

              

                <TableCell>

                  {order.orderItems?.map((item, index) => (

                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1
                      }}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        width="50"
                        height="50"
                        style={{
                          objectFit: "cover",
                          borderRadius: 6
                        }}
                      />

                      <Box>

                        <Typography variant="body2">
                          {item.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Qty: {item.quantity}
                        </Typography>

                      </Box>

                    </Box>

                  ))}

                </TableCell>

              

                <TableCell>
                  ₹{order.totalPrice}
                </TableCell>

                

                <TableCell>

                  <Chip
                    label={order.paymentMethod}
                    color={
                      order.paymentMethod === "COD"
                        ? "warning"
                        : "success"
                    }
                  />

                </TableCell>

              

                <TableCell>

                  <Chip
                    label={order.paymentStatus}
                    color={
                      order.paymentStatus === "Paid"
                        ? "success"
                        : "error"
                    }
                  />

                </TableCell>

                

                <TableCell>

                  <Select
                    value={order.orderStatus}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    size="small"
                  >

                    <MenuItem value="Pending">
                      Pending
                    </MenuItem>

                    <MenuItem value="Accepted">
                      Accepted
                    </MenuItem>

                    <MenuItem value="Packed">
                      Packed
                    </MenuItem>

                    <MenuItem value="Shipped">
                      Shipped
                    </MenuItem>

                    <MenuItem value="Delivered">
                      Delivered
                    </MenuItem>

                    <MenuItem value="Cancelled">
                      Cancelled
                    </MenuItem>

                  </Select>

                </TableCell>

                

                <TableCell>

                  <Typography variant="body2">
                    {order.shippingAddress?.address}
                  </Typography>

                  <Typography variant="body2">
                    {order.shippingAddress?.city}
                  </Typography>

                  <Typography variant="body2">
                    {order.shippingAddress?.postalCode}
                  </Typography>

                </TableCell>

                

                <TableCell>

                  {new Date(order.createdAt)
                    .toLocaleDateString()}

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

    </Container>

  );

};

export default AdminOrders;