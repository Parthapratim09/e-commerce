import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import CheckoutDetails from "./pages/CheckoutDetails";
import { CartProvider } from './context/CartContext';
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductList from "./pages/admin/ProductList";
import AdminRoute from "./components/AdminRoute";
import ProductCreate from "./pages/admin/ProductCreate";
import ProductEdit from "./pages/admin/ProductEdit";
import AdminOrders from "./pages/admin/AdminOrders";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import MyAddress from "./pages/MyAddress";
import AdminPayments from "./pages/admin/AdminPayments";

const App = () => {
  return (
    <>
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutDetails />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><ProductList /></AdminRoute>} />
        <Route path="/admin/products/create" element={ <AdminRoute> <ProductCreate /></AdminRoute>}/>
        <Route path="/admin/products/edit/:id" element={ <AdminRoute> <ProductEdit /> </AdminRoute>}/>
        <Route path="/admin/orders" element={ <AdminRoute> <AdminOrders /> </AdminRoute>} />
        <Route path="/admin/payments"element={<AdminRoute><AdminPayments /></AdminRoute>}/>
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="//my-orders/:id" element={<OrderDetails />} />
        <Route path="/my-address" element={<MyAddress />} />
      </Routes>
      </CartProvider>
    </>
  );
};

export default App;
