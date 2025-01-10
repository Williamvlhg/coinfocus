// Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="wrapper">
          <div className="logo">
            <Link to="/">Coinfocus</Link>
          </div>
          
          <ul className={`nav-links`}>
            <label className="btn close-btn" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </label>
            
            <div className="main-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/market">Marché</Link></li>
              <li><Link to="/transaction">Transaction</Link></li>
              <li><Link to="/wallet">Portefeuille</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </div>

            <div className="auth-links">
              <li><Link to="/login">Sign up</Link></li>
              |
              <li className='btn-register'><Link to="/register">Sign in</Link></li>
            </div>
          </ul>
          
          
        </div>
      </nav>
    </>
  );
};

export default Header;