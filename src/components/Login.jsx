import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { loginUser } from '../utils/authUtils';

const Login = ({ isAuthenticated, setIsAuthenticated, setToken }) => {
  const [{ email, password }, setFormState] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!email || !password) return toast.error('Please fill out all the fields');
      const { token } = await loginUser({ email, password });
      localStorage.setItem('token', token);
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response?.data.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (isAuthenticated) return <Navigate to='/app/create' />;

  return (
    <form
      className='row flex-column align-items-center justify-content-center gap-4'
      onSubmit={handleSubmit}
    >
      <div className='col-md-4'>
        <label htmlFor='email'>Email address</label>
        <input
          type='email'
          id='email'
          className='form-control'
          placeholder='Email address'
          value={email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          className='form-control'
          placeholder='Password'
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className='col-lg-6 text-center'>
        <button className='btn btn-lg btn-primary' type='submit'>
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
