import { TextField, Button, Container, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={4}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <TextField fullWidth margin="normal" label="Password" type="password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
    </Container>
  );
};

export default Login;
