
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Form from '../../Components/Form';
import Login from './Login';

const Register = () => {
  const navigate = useNavigate();

  const registerFields = [

    { name: 'username', label: 'Nom d\'utilisateur', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Mot de passe', type: 'password', required: true },
  ];

  const handleRegisterSubmit = (data) => {
    console.log('Register data:', data);
    if (data.username && data.email && data.password) {
      localStorage.setItem('user', JSON.stringify(data));
      alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
      navigate('/login');
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  return <Form title="Inscription" fields={registerFields} onSubmit={handleRegisterSubmit} />
  
};

export default Register;