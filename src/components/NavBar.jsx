import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useWidth from '../utils/useWidth';

const NavBar = ({ isAuthenticated, user, logout }) => {
  const windowWidth = useWidth();
  const collapse = useMemo(
    () => windowWidth < 576 && { 'data-bs-toggle': 'collapse', 'data-bs-target': '#navbarNav' },
    [windowWidth]
  );

  return (
    <nav className='container navbar navbar-expand-sm navbar-dark'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          Thoughts
          <span role='img' aria-label='thought'>
            💭
          </span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto mb-lg-0 align-items-center' {...collapse}>
            {isAuthenticated ? (
              <>
                {user && (
                  <li className='nav-item'>
                    <div className='nav-link'>
                      <span>
                        Welcome back, {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </li>
                )}
                <li className='nav-item'>
                  <Link to='/app/create' className='nav-link'>
                    <span>Create thought</span>
                  </Link>
                </li>
                <li className='nav-item' onClick={logout}>
                  <div className='nav-link'>
                    <span>Log out</span>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    <span>Login</span>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/register' className='nav-link'>
                    <span>Register</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
