import { useEffect, useState } from "react";
import axios from "../../config/axios";
import {
Container,
Typography,
Grid,
Card,
CardContent,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
Chip,
Select,
MenuItem,
Paper,
Box,
Button
} from "@mui/material";
const AdminPayments = () => {
const [orders, setOrders] = useState([]);
const [filter, setFilter] = useState("All");
useEffect(() => {
fetchPayments();
}, []);
const fetchPayments = async () => {
try {
const res = await axios.get(
"/api/orders/admin/payments"
);
setOrders(res.data);
} catch (err) {
console.error(err);
alert("Failed to load payments");
}
};
const markCODPaid = async (id) => {
try {
await axios.put(
`/api/orders/admin/${id}/payment`,
{
paymentStatus: "Paid"
}
);
fetchPayments();
} catch (err) {

console.error(err);
alert("Failed to update payment");
}
};
const filteredOrders = orders.filter(order => {
if (filter === "All") return true;
return order.paymentMethod === filter;
});
const totalRevenue = orders
.filter(order => order.paymentStatus === "Paid")
.reduce((sum, order) => sum + order.totalPrice, 0);
const codRevenue = orders
.filter(order =>
order.paymentMethod === "COD" &&
order.paymentStatus === "Paid"
)
.reduce((sum, order) => sum + order.totalPrice, 0);
const onlineRevenue = orders
.filter(order =>
order.paymentMethod === "Razorpay" &&
order.paymentStatus === "Paid"
)
.reduce((sum, order) => sum + order.totalPrice, 0);
return (
<Container maxWidth="xl" sx={{ mt: 4, mb: 5 }}>
<Typography
variant="h4"
sx={{ mb: 4, fontWeight: "bold" }}
>
Payment Management
</Typography>


<Grid container spacing={3} sx={{ mb: 4 }}>
<Grid item xs={12} md={4}>
<Card>
<CardContent>
<Typography color="text.secondary">
Total Revenue
</Typography>
<Typography variant="h4">
₹{totalRevenue}
</Typography>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} md={4}>
<Card>
<CardContent>
<Typography color="text.secondary">
COD Revenue
</Typography>
<Typography variant="h4">
₹{codRevenue}
</Typography>
</CardContent>
</Card>
</Grid>
<Grid item xs={12} md={4}>
<Card>
<CardContent>

<Typography color="text.secondary">
Online Revenue
</Typography>
<Typography variant="h4">
₹{onlineRevenue}
</Typography>
</CardContent>
</Card>
</Grid>
</Grid>

<Box sx={{ mb: 3 }}>
<Select
value={filter}
onChange={(e) =>
setFilter(e.target.value)
}
>
<MenuItem value="All">
All Payments
</MenuItem>
<MenuItem value="COD">
COD
</MenuItem>
<MenuItem value="Razorpay">
Razorpay
</MenuItem>
</Select>
</Box>

<Paper elevation={3}>

<Table>
<TableHead>
<TableRow>
<TableCell>
<strong>Customer</strong>
</TableCell>
<TableCell>
<strong>Amount</strong>
</TableCell>
<TableCell>
<strong>Payment Method</strong>
</TableCell>
<TableCell>
<strong>Payment Status</strong>
</TableCell>
<TableCell>
<strong>Order Status</strong>
</TableCell>
<TableCell>
<strong>Date</strong>
</TableCell>
<TableCell>
<strong>Action</strong>
</TableCell>
</TableRow>
</TableHead>
<TableBody>
{filteredOrders.map(order => (
<TableRow key={order._id}>
<TableCell>
{order.user?.name}
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
<Chip
label={order.orderStatus}
color="primary"
/>
</TableCell>
<TableCell>
{new Date(order.createdAt)
.toLocaleDateString()}
</TableCell>
<TableCell>

{order.paymentMethod === "COD" &&
order.paymentStatus !== "Paid" ? (
<Button
variant="contained"
size="small"
onClick={() =>
markCODPaid(order._id)
}
>
Mark Paid
</Button>
) : (
<Typography
variant="body2"
color="green"
>
Completed
</Typography>
)}
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</Paper>
</Container>
);
};
export default AdminPayments