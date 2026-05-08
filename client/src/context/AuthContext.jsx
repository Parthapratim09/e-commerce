import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const logout = () => {
     localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      setLoading(false);
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Token invalid");
          return res.json();
        })
        .then(data => {
          if (!data._id) logout(); 
          else {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading,login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
