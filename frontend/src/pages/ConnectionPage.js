import { useEffect, useState } from 'react';
import Presentation from '../components/header/HeaderDisconnected';
import Signup from '../components/connect/Signup';
import Login from '../components/connect/Login';

import entreprise from '../assets/entreprise.jpg';

const ConnectionPage = ({ setIsConnected }) => {
  const [signupModal, setsignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(true);

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  const handleModals = (event) => {
    if (event.target.id === 'signup') {
      setLoginModal(false);
      setsignupModal(true);
    } else if (event.target.id === 'login') {
      setsignupModal(false);
      setLoginModal(true);
    }
  };
  return (
    <main className="main">
      <Presentation />
      <div className="user">
        <div className="signupAndLogin">
          <ul className="signupAndLogin__list">
            <li
              onClick={handleModals}
              id="signup"
              className={signupModal ? 'active-btn current-signup' : null}
            >
              Inscription
            </li>
            <li onClick={handleModals} id="login" className={loginModal ? 'active-btn current-login' : null}>
              Connexion
            </li>
          </ul>
          {signupModal && <Signup />}
          {loginModal && <Login setIsConnected={setIsConnected} />}
        </div>
        <div className="entreprise">
          <img src={entreprise} alt="L'entreprise groupomania" />
        </div>
      </div>
    </main>
  );
};

export default ConnectionPage;
