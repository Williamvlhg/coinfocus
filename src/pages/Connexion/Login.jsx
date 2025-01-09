import { useNavigate } from 'react-router-dom';
import Form from "../../Components/Form";
import "./../../assets/css/Style.css";

const Login = () => {
  const navigate = useNavigate();

  const loginFields = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];

  const handleLoginSubmit = (data) => {
    console.log('Login data:', data);
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.email === data.email && user.password === data.password) {
        alert(`Bienvenue, ${user.username}!`);
        navigate('/home');
      } else {
        alert('Identifiants incorrects. Veuillez réessayer.');
      }
    } else {
      alert("Aucun utilisateur enregistré. Veuillez vous inscrire d'abord.");
    }
  };

  return <Form title="Login" fields={loginFields} onSubmit={handleLoginSubmit} />;
};

export default Login;