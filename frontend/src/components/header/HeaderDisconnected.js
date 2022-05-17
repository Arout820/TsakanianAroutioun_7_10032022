import { Link } from 'react-router-dom';

import logo from '../../assets/icon-left-font-monochrome-black.svg';

const HeaderDisconnected = () => {
  return (
    <header className="header-disconnected" id="header-connected">
      <div className="header-disconnected__logo">
        <Link to="/profil" className="header-disconnected__logo__link">
          <img src={logo} alt="Logo de groupomania" />
        </Link>
      </div>
      <div className="header-disconnected__title">
        <h1>Avec Groupomania, partagez et restez en contact avec vos collégues.</h1>
      </div>
    </header>
  );
};

export default HeaderDisconnected;
