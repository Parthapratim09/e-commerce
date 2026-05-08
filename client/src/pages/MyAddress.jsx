import { useEffect, useState } from "react";

import axios from "../config/axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";

const MyAddress = () => {

  const [address, setAddress] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India"
  });

  useEffect(() => {

    fetchAddress();

  }, []);

  const fetchAddress = async () => {

    try {

      const res = await axios.get(
        "/api/orders/latest-address"
      );

      if (res.data) {

        setAddress(res.data);

        setFormData({
          fullName: res.data.fullName || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          city: res.data.city || "",
          postalCode: res.data.postalCode || "",
          country: res.data.country || "India"
        });

      }

    } catch (err) {

      console.error(err);

      setSnackbar({
        open: true,
        message: "Failed to load address",
        severity: "error"
      });

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSave = async () => {

    try {

      setSaving(true);

      // OPTIONAL FUTURE API
      // await axios.put("/api/users/address", formData);

      setAddress(formData);

      setEditing(false);

      setSnackbar({
        open: true,
        message: "Address updated successfully",
        severity: "success"
      });

    } catch (err) {

      console.error(err);

      setSnackbar({
        open: true,
        message: "Failed to save address",
        severity: "error"
      });

    } finally {

      setSaving(false);

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

    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        mb: 5
      }}
    >

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold"
        }}
      >
        My Address
      </Typography>

      <Card elevation={3}>

        <CardContent>

          {!editing ? (

            <>
              <Typography sx={{ mb: 2 }}>
                <strong>Full Name:</strong>{" "}
                {address?.fullName}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Phone:</strong>{" "}
                {address?.phone}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Address:</strong>{" "}
                {address?.address}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>City:</strong>{" "}
                {address?.city}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                <strong>Postal Code:</strong>{" "}
                {address?.postalCode}
              </Typography>

              <Typography sx={{ mb: 3 }}>
                <strong>Country:</strong>{" "}
                {address?.country}
              </Typography>

              <Button
                variant="contained"
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit Address
              </Button>
            </>

          ) : (

            <>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 2
                }}
              >

                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={saving}
                >

                  {saving
                    ? "Saving..."
                    : "Save"}

                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    setEditing(false)
                  }
                >
                  Cancel
                </Button>

              </Box>
            </>

          )}

        </CardContent>

      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false
          })
        }
      >

        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

    </Container>

  );

};

export default MyAddress;