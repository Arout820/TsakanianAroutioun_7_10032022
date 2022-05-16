import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getDataForUser } from '../../api/getDataForUserAction';
import login from '../../api/login';

import errorImage from '../../assets/non_valide.png';

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

  // ---------------- fonction pour la logique du bouton connexion ------------------
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setEmailError('');
      setPasswordError('');

      if (email === '') {
        emailRef.current.focus();
        setEmailError('Veuillez inscrire votre email de connexion !');
        throw new Error('Le champ email ne doit pas être vide !');
      }
      const loginInfos = { email, password };
      login(loginInfos, navigate);
      // console.log({ contenu });
      // if (contenu.error && contenu.error.email) {
      //   emailRef.current.focus();
      //   setEmailError(contenu.error.email);
      //   throw new Error(contenu.error.email);
      // }
      // if (contenu.error && contenu.error.password) {
      //   passwordRef.current.focus();
      //   setPasswordError(contenu.error.password);
      //   throw new Error(contenu.error.password);
      // }
      // setIsConnected((e) => !e);
      // getDataForUser();
    } catch (error) {
      console.log(error);
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
              <img src={errorImage} alt="Error" />
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
              <img src={errorImage} alt="Error" />
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
