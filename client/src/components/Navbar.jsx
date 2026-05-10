import React, { useContext, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Drawer,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import {
  Link,
  useNavigate
} from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { AuthContext } from "../context/AuthContext";

import { CartContext } from "../context/CartContext";

const Navbar = () => {

  const { user, logout } = useContext(AuthContext);

  const { count } = useContext(CartContext);

  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <>

      <AppBar position="static">

        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >

        

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold"
            }}
          >
            🛍️ MyShop
          </Typography>

        

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >

            {!user ? (

              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>

                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>

            ) : (

              <>

              

                <Button
                  color="inherit"
                  component={Link}
                  to="/cart"
                >

                  <Badge
                    badgeContent={count}
                    color="secondary"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                  >

                    <ShoppingCartIcon />

                  </Badge>

                  <Box sx={{ ml: 1 }}>
                    Cart
                  </Box>

                </Button>

                

                <IconButton
                  color="inherit"
                  onClick={() =>
                    setDrawerOpen(true)
                  }
                >

                  <AccountCircleIcon
                    fontSize="large"
                  />

                </IconButton>

              </>

            )}

          </Box>

        </Toolbar>

      </AppBar>

      

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() =>
          setDrawerOpen(false)
        }
      >

        <Box sx={{ width: 280 }}>

  

          <Box
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              gap: 2
            }}
          >

            <Avatar
              sx={{
                width: 56,
                height: 56
              }}
            >
              {user?.name?.charAt(0)}
            </Avatar>

            <Box>

              <Typography fontWeight="bold">
                {user?.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {user?.email}
              </Typography>

            </Box>

          </Box>

          <Divider />

          

          <List>

{user?.isAdmin === true && (
<ListItem disablePadding>
              <ListItemButton
                onClick={() => {

                  navigate("/admin");

                  setDrawerOpen(false);

                }}
              >

                <ListItemText
                  primary="Admin Panel"
                />

              </ListItemButton>

            </ListItem>
)}

            <ListItem disablePadding>

              <ListItemButton
                onClick={() => {

                  navigate("/my-orders");

                  setDrawerOpen(false);

                }}
              >

                <ListItemText
                  primary="My Orders"
                />

              </ListItemButton>

            </ListItem>



            <ListItem disablePadding>

              <ListItemButton
                onClick={() => {

                  navigate("/my-address");

                  setDrawerOpen(false);

                }}
              >

                <ListItemText
                  primary="My Address"
                />

              </ListItemButton>

            </ListItem>

          

            <ListItem disablePadding>

              <ListItemButton
                onClick={handleLogout}
              >

                <ListItemText
                  primary="Logout"
                />

              </ListItemButton>

            </ListItem>

          </List>

        </Box>

      </Drawer>

    </>

  );

};

export default Navbar;