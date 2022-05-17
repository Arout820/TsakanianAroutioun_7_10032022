import { useEffect, useState } from 'react';

import HeaderDisconnected from '../components/header/HeaderDisconnected';
import Signup from '../components/connect/Signup';
import Login from '../components/connect/Login';

import entreprise from '../assets/entreprise.jpg';

const ConnectionPage = ({ setIsConnected }) => {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(true);

  useEffect(() => {
    localStorage.removeItem('auth');
  }, []);

  const handleModals = (event) => {
    if (event.target.id === 'signup') {
      setLoginModal(false);
      setSignupModal(true);
    } else if (event.target.id === 'login') {
      setSignupModal(false);
      setLoginModal(true);
    }
  };
  return (
    <>
      <HeaderDisconnected />
      <main className="main">
        <div className="connection">
          <div className="signup-and-login">
            <ul className="signup-and-login__list">
              <li onClick={handleModals} id="signup" className={signupModal ? 'active-btn' : null}>
                Inscription
              </li>
              <li onClick={handleModals} id="login" className={loginModal ? 'active-btn' : null}>
                Connexion
              </li>
            </ul>
            {signupModal && (
              <Signup setLoginModal={setLoginModal} setSignupModal={setSignupModal} />
            )}
            {loginModal && <Login setIsConnected={setIsConnected} />}
          </div>
          <div className="entreprise">
            <img src={entreprise} alt="L'entreprise groupomania" />
          </div>
        </div>
      </main>
    </>
  );
};

export default ConnectionPage;
