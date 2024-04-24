import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedLayout = ({ isAuthenticated }) => {
  const { pathname } = useLocation(); // Get the current pathname to redirect the user back to the page they were trying to access

  return (
    <div className='container mt-5'>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to={{ pathname: '/login' }} state={{ next: pathname }} />
      )}
    </div>
  );
};

export default ProtectedLayout;
