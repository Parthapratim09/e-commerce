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
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
        .then(res => res.json())
        .then(data => {
          if (!data._id) logout(); 
          else setUser(data);
        })
        .catch(() => logout()); 
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
