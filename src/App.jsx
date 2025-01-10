import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TradingPage from './pages/TradingPage';
import BlogPage from './pages/BlogPage';
import CryptoDetailsPage from './Pages/CryptoDetailsPage';
import './App.css'
const App = () => {
  return (
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
