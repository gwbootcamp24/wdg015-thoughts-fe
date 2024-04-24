import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './components/NavBar';
import GlobalLayout from './components/GlobalLayout';
import CreateThought from './components/CreateThought';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { getUser } from './utils/authUtils';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedLayout from './components/ProtectedLayout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const validateUser = async () => {
      try {
        const user = await getUser(token);
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        toast.error(error.response?.data.error || error.message);
        localStorage.removeItem('token');
        setToken(null);
      }
    };
    token && validateUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <ToastContainer />
      <NavBar isAuthenticated={isAuthenticated} user={user} logout={logout} />
      <Routes>
        <Route path='/' element={<GlobalLayout />}>
          <Route index element={<Home user={user} />} />
          <Route
            path='login'
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setToken={setToken}
              />
            }
          />
          <Route
            path='register'
            element={
              <Register
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setToken={setToken}
              />
            }
          />
          <Route path='app' element={<ProtectedLayout isAuthenticated={isAuthenticated} />}>
            <Route path='create' element={<CreateThought />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
