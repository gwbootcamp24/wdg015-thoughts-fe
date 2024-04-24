import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { registerUser } from '../utils/authUtils';

const Register = ({ isAuthenticated, setIsAuthenticated, setToken }) => {
  const [{ firstName, lastName, email, password }, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!firstName || !lastName || !email || !password)
        return toast.error('Please fill out all the fields');
      const { token } = await registerUser({ firstName, lastName, email, password });
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
  // If the user is authenticated, redirect them to the next page they were trying to access
  if (isAuthenticated)
    return (
      <Navigate
        to={{
          pathname: location.state ? location.state.next : '/app/create',
          from: location.pathname
        }}
      />
    );

  return (
    <form
      className='row flex-column align-items-center justify-content-center gap-4'
      onSubmit={handleSubmit}
    >
      <div className='col-md-4'>
        <label htmlFor='firstName'>First name</label>
        <input
          id='firstName'
          className='form-control'
          placeholder='First name'
          value={firstName}
          onChange={handleChange}
        />
        <label htmlFor='lastName'>Last name</label>
        <input
          id='lastName'
          className='form-control'
          placeholder='Last name'
          value={lastName}
          onChange={handleChange}
        />
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
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
