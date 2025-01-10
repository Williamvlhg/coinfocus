
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Form from '../../Components/Form';

const Register = () => {
  const navigate = useNavigate();

  const registerFields = [

    { name: 'username', label: 'Utilisateur', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Mot de passe', type: 'password', required: true },
  ];

  // const handleRegisterSubmit = (data) => {
  //   console.log('Register data:', data);
  //   if (data.username && data.email && data.password) {
  //     localStorage.setItem('user', JSON.stringify(data));
  //     alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
  //     navigate('/login');
  //   } else {
  //     alert('Veuillez remplir tous les champs.');
  //   }
  // };

  const handleRegisterSubmit = (data) => {
    console.log('Register data:', data);
  
    if (data.username && data.email && data.password) {
      const walletAddress = '0x' + Math.random().toString(16).substr(2, 40);
  
      const userData = { ...data, wallet_address: walletAddress };
      const walletData = {  wallet_address: walletAddress, cryptoBalance: 0, dollarBalance: 0 };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('wallet', JSON.stringify(walletData));

  
      alert(`Inscription réussie! Votre adresse de portefeuille: ${walletAddress}`);
      navigate('/login');
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };
  

  return <Form title="Inscription" fields={registerFields} onSubmit={handleRegisterSubmit} />
  
};

export default Register;