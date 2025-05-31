// // import { AppBar, Toolbar, Button, Typography } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import { useContext } from 'react';
// // import { AuthContext } from '../context/AuthContext';

// // const Navbar = () => {
// //   const { user, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   return (
// //     <AppBar position="static">
// //       <Toolbar>
// //         <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
// //           🛒 MyShop
// //         </Typography>

// //         {!user ? (
// //           <>
// //             <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
// //             <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
// //           </>
// //         ) : (
// //           <>
// //             <Button color="inherit" onClick={() => navigate('/cart')}>Cart</Button>
// //             <Button color="inherit" onClick={logout}>Logout</Button>
// //           </>
// //         )}
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default Navbar;


// import React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <AppBar position="static">
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Typography 
//           variant="h6" 
//           component={Link} 
//           to="/" 
//           sx={{ textDecoration: 'none', color: 'white' }}
//         >
//           🛍️ MyShop
//         </Typography>

//         <div>
//           <Button color="inherit" component={Link} to="/login">Login</Button>
//           <Button color="inherit" component={Link} to="/register">Register</Button>
//           <Button color="inherit" component={Link} to="/cart">Cart</Button>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;



import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'white' }}
        >
          🛍️ MyShop
        </Typography>

        <div>
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/cart">Cart</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
