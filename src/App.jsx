import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Connexion/Login';
import Register from './pages/Connexion/Register';
import Transaction from './pages/transactions/Transaction';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  )
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TradingPage from './Pages/trading/TradingPage';
import BlogPage from './Pages/blog/BlogPage';
import CryptoDetailsPage from './Pages/crypto/CryptoDetailsPage';
import Login from './pages/Connexion/Login';
import Register from './pages/Connexion/Register';
import Transaction from './Pages/transactions/Transaction';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <main>
          <Routes>
            <Route path="/trading" element={<TradingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/crypto/:cryptoId" element={<CryptoDetailsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

