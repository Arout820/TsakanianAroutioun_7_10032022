import { useEffect, useState } from 'react';

import { getDataForUser } from '../api/getDataForUserAction';

import HeaderConnected from '../components/header/HeaderConnected';
import ProfilContainer from '../components/profil/ProfilContainer';

const ProfilPage = () => {
  // récupération infos de connexion du local storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const userId = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  // variables selon état du fetch
  const [userInfos, setUserInfos] = useState(null);
  const [error, setError] = useState(null);

  // toogle pour relancer récupération de données
  const [modification, setModification] = useState(false);

  // récupération des éléments de la base de données avec l'api
  useEffect(() => {
    getDataForUser();
  }, [userId, token, modification]);
  return (
    <>
      <HeaderConnected />
      <ProfilContainer userInfos={userInfos} error={error} setModification={setModification} />
    </>
  );
};

export default ProfilPage;

