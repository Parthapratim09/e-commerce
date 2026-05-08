import React from "react";
import { 
  Container, Typography, Button, Box, Grid, Card, CardContent, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Inventory, AddCircle, Assessment } from "@mui/icons-material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  
  const stats = [
    { label: "Total Sales", value: "$12,450", icon: <Assessment color="primary" />, color: "#e3f2fd" },
    { label: "Active Orders", value: "24", icon: <ShoppingCart color="secondary" />, color: "#f3e5f5" },
    { label: "Stock Alerts", value: "5 Items", icon: <Inventory color="error" />, color: "#ffebee" },
  ];

  const recentOrders = [
    { id: "#1024", customer: "John Doe", status: "Pending", total: "$120.00" },
    { id: "#1023", customer: "Jane Smith", status: "Shipped", total: "$450.00" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Admin Overview
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddCircle />} 
          onClick={() => navigate("/admin/products/create")}
        >
          Quick Add Product
        </Button>
      </Box>


      <Grid container spacing={3} mb={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card sx={{ backgroundColor: stat.color, boxShadow: 0 }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {stat.icon}
                <Box>
                  <Typography variant="body2" color="textSecondary">{stat.label}</Typography>
                  <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
      <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => navigate("/admin/products")}>
          Manage Inventory
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate("/admin/orders")}>
          View All Orders
        </Button>
        <Button variant="contained" onClick={() => navigate("/admin/payments")}>
          Payment Management
        </Button>
      </Box>

      
      <Typography variant="h6" gutterBottom>Recent Orders</Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/orders/${order.id}`)}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    color={order.status === "Shipped" ? "success" : "warning"} 
                    size="small" 
                  />
                </TableCell>
                <TableCell align="right">{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;