import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import nonValideImage from '../../assets/non_valide.png';

const Login = ({ setIsConnected }) => {
  // Création des variables modifiables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // fonction pour la logique du bouton connexion
  const handleLogin = (event) => {
    event.preventDefault();

    const loginInfos = { email, password };

    // mise à jour des erreurs
    setEmailError('');
    setPasswordError('');

    if (email === '') {
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
            setEmailError('Email incorrecte');
            throw new Error('Email incorrecte');
          }
          if (!res.ok && res.status === 401) {
            passwordRef.current.focus();
            setPasswordError('Mot de passe incorrect');
            throw new Error('Mot de passe incorrect');
          }

          const contenu = await res.json();
          localStorage.setItem('token', JSON.stringify(contenu));
          setIsConnected((e) => !e);
          navigate('/wall');
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
          name="email"
          id="email"
          className={emailError && 'error-border'}
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          ref={emailRef}
        />
        {emailError && (
          <div className="error">
            <div className="error__image">
              <img src={nonValideImage} alt="" />
            </div>
            <div className="error__message">{emailError}</div>
          </div>
        )}
      </div>

      <div className="form-auth__element">
        <input
          type="password"
          name="password"
          id="password"
          className={passwordError && 'error-border'}
          autoComplete="on"
          placeholder="Mot de passe"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          ref={passwordRef}
        />
        {passwordError && (
          <div className="error">
            <div className="error__image">
              <img src={nonValideImage} alt="" />
            </div>
            <div className="error__message">{passwordError}</div>
          </div>
        )}
      </div>
      <button type="submit" id="login" className="form-auth__button">
        Se connecter
      </button>
      <div className="forgot-password" id="forgot-password">
        <Link to="/">Mot de passe oublié ?</Link>
      </div>
    </form>
  );
};

export default Login;
