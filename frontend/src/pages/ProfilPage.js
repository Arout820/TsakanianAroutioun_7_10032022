import { useEffect, useState } from 'react';

import getUser from '../api/apiCalls/user/getUser';

import HeaderConnected from '../components/header/HeaderConnected';
import ProfilContainer from '../components/profil/ProfilContainer';

/**
 * Page correspondant à la page de profil
 *
 * @component
 */
function ProfilPage() {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

  // variables selon état du fetch
  const [userInfos, setUserInfos] = useState(null);
  const [errorUser, setErrorUser] = useState(null);

  // toogle pour relancer récupération de données
  const [modification, setModification] = useState(false);

  // récupération des éléments de l'utilisateur connecté de la base de données avec l'api
  useEffect(() => {
    const getUserData = async () => {
      setErrorUser(null);
      const user = await getUser(userId, token, setErrorUser);
      setUserInfos(user);
    };
    getUserData();
  }, [userId, token, modification]);
  return (
    <>
      <HeaderConnected />
      <ProfilContainer userInfos={userInfos} error={errorUser} setModification={setModification} />
    </>
  );
}

export default ProfilPage;
