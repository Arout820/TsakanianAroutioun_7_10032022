import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/icon-left-font-monochrome-black.svg';

const HeaderConnected = ({ userInfos }) => {
  const navigate = useNavigate();

  // Bouton se deconnecter
  const HandleButton = (event) => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <header className="header-connected">
      <NavLink to="/wall" className="presentation__logo__link">
        <img src={logo} alt="Logo de groupomania" />
      </NavLink>
      <div className='header-connected__infos'>
        <h1 className="header-connected__welcome">
          <span className="header-connected__welcome__intro">Bienvenue </span>
          <span className="header-connected__welcome__name">
            {userInfos[0].firstname} {userInfos[0].lastname}
          </span>
        </h1>
        <nav className="navigation">
          <NavLink to="/wall" className="presentation__logo__link">
            <i className=" fa-2x fa-regular fa-message"></i>
          </NavLink>
          <NavLink to="/profil" className="presentation__logo__link">
            <i className="fa-2x fa-solid fa-id-card-clip"></i>
          </NavLink>
          <i
            onClick={() => {
              HandleButton();
            }}
            className="fa-2x fa-solid fa-arrow-right-from-bracket"
          ></i>
        </nav>
      </div>
    </header>
  );
};

export default HeaderConnected;
