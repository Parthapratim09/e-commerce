// import { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetch('http://localhost:5000/api/auth/me', {
//         headers: { Authorization: token }
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (!data._id) logout(); // Token expired or invalid
//           else setUser(data);
//         });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}` // ✅ Fix: use 'Bearer' scheme
        }
      })
        .then(res => res.json())
        .then(data => {
          if (!data._id) logout(); // Token expired or invalid
          else setUser(data);
        })
        .catch(() => logout()); // Handle network errors or invalid JSON
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
