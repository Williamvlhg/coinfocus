import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Connexion/Login';
import Register from './Connexion/Register';


const Header = () => {
    return (
      <Router>
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </Router>
    );
  };
  
  export default Header;