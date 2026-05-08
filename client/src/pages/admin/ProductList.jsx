import { useEffect, useState } from "react";
import axios from "../../config/axios";

import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const ProductList = () => {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchProducts = async () => {

    try {

      const res = await axios.get("/api/products");

      setProducts(res.data);

    } catch (err) {

      alert("Failed to load products");

    }

  };

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await axios.delete(`/api/products/${id}`);

      fetchProducts();

    } catch {

      alert("Delete failed");

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <Container>

      <Typography variant="h4" sx={{ mt: 4 }}>
        Manage Products
      </Typography>

      <Button
        sx={{ my: 2 }}
        variant="contained"
        onClick={() => navigate("/admin/products/create")}
      >
        Add Product
      </Button>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>Name</TableCell>

            <TableCell>Price</TableCell>

            <TableCell>Stock</TableCell>

            <TableCell>Actions</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {products.map(product => (

            <TableRow key={product._id}>

              <TableCell>{product.name}</TableCell>

              <TableCell>₹{product.price}</TableCell>

              <TableCell>{product.countInStock}</TableCell>

              <TableCell>

                <Button
                  onClick={() =>
                    navigate(`/admin/products/edit/${product._id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  color="error"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </Button>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Container>

  );

};

export default ProductList;