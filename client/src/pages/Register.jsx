import { TextField, Button, Container, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mt={4}>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <TextField fullWidth margin="normal" label="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <TextField fullWidth margin="normal" label="Password" type="password"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Register</Button>
      </form>
    </Container>
  );
};

export default Register;
