import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Connexion/Login';
import Register from './pages/Connexion/Register';
import Transaction from './pages/transactions/Transaction';
import Header from './Components/Header';

function App() {

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

export default App
