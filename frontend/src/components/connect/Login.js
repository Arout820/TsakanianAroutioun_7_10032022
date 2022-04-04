import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  // Création des variables affichés modifiables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const emailRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setEmailError('');
    setPasswordError('');
  }, [email, password]);

  // fonction pour la logique du bouton connexion
  const handleLogin = (event) => {
    event.preventDefault();
    const emailID = document.querySelector('#email');
    const passwordID = document.querySelector('#password');

    const emailErrorStyle = document.querySelector('#email-error');
    const passwordErrorStyle = document.querySelector('#password-error');

    // données à envoyer
    const loginInfos = { email, password };

    // mise à jour des erreurs
    setEmailError('');
    setPasswordError('');
    passwordErrorStyle.classList.remove('input-message-error');
    passwordID.classList.remove('error');

    if (email === '') {
      emailID.classList.add('error');
      emailErrorStyle.classList.add('input-message-error');
      setEmailError('Veuillez inscrire votre email de connexion');
    } else {
      // fetch pour travailler sur les données de la base de données
      const sendLogin = fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        body: JSON.stringify(loginInfos),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      // action lorsque on envoie les données
      sendLogin.then(async (res) => {
        try {
          if (!res.ok && res.status === 404) {
            emailID.classList.add('error');
            emailErrorStyle.classList.add('input-message-error');
            setEmailError('Email incorrecte');

            throw new Error('Email incorrecte');
          } else if (res.status !== 404) {
            emailErrorStyle.classList.remove('input-message-error');
            emailID.classList.remove('error');
          }
          if (!res.ok && res.status === 401) {
            passwordID.classList.add('error');
            passwordErrorStyle.classList.add('input-message-error');
            setPasswordError('Mot de passe incorrect');

            throw new Error('Mot de passe incorrect');
          }

          const contenu = await res.json();
          console.log('Contenu de connexion');
          console.log(contenu);
          localStorage.setItem('token', JSON.stringify(contenu));
          //auth pesistente => setAuth
          navigate('/profil');
        } catch (err) {
          console.log(err);
        }
      });
    }
  };
  return (
    <form onSubmit={handleLogin} className="form-auth" id="form-auth">
      <h1 className="form-auth__name">Connexion</h1>
      <div className="form-auth__element">
        <input
          type="text"
          ref={emailRef}
          name="email"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <div id="email-error">{emailError}</div>
      </div>

      <div className="form-auth__element">
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="on"
          placeholder="Mot de passe"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <div id="password-error">{passwordError}</div>
      </div>
      <button type="submit" id="login" className="form-auth__button">
        Se connecter
      </button>
      <div className="forgot-password" id="forgot-password">
        <Link to="/profil">Mot de passe oublié ?</Link>
      </div>
    </form>
  );
};

export default Login;
