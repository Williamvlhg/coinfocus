// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TradingPage from './pages/trading/TradingPage';
import BlogPage from './pages/blog/BlogPage';
import CryptoDetailsPage from './pages/crypto/CryptoDetailsPage';


import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Connexion/Login';
import Register from './pages/Connexion/Register';
import Transaction from './pages/transactions/Transaction';
import Header from './pages/Header';

function App() {

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />
    </Routes>
  </Router>
  )
}
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/trading">Trading</Link></li>
              <li><Link to="/blog">Mini-Blog</Link></li>
              <li><Link to="/crypto/:cryptoId">Crypto</Link></li>

            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trading" element={<TradingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/crypto/:cryptoId" element={<CryptoDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
