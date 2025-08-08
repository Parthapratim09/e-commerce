import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import CheckoutDetails from "./pages/CheckoutDetails";
import { CartProvider } from './context/CartContext';


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
      </Routes>
      </CartProvider>
    </>
  );
};

export default App;
