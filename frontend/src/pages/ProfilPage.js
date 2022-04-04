import { useEffect, useState } from 'react';
import FooterConnected from '../components/footer/FooterConnected';

import Header from '../components/header/HeaderConnected';
import ProfilContainer from '../components/profil/ProfilContainer';

const ProfilPage = () => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  // variables selon état du fetch
  const [userInfos, setUserInfos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // toogle pour relancer récupération de données
  const [modification, setModification] = useState(false);

  // récupération des éléments de la base de données avec l'api
  useEffect(() => {
    const abortCtrl = new AbortController();
    fetch(`http://localhost:5000/api/user/${id}`, {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      try {
        if (!res.ok) {
          throw Error('Erreur survenue');
        } else {
          const contenu = await res.json();
          setUserInfos(contenu);
          console.log('Contenu infos profil');
          console.log(contenu);
          setError(null);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          setError('Fetch a été stoppé');
        } else {
          setError(err.message);
          setIsLoading(false);
        }
      }
    });

    return () => abortCtrl.abort();
  }, [id, token, modification]);
  return (
    <>
      <Header />
      <ProfilContainer
        userInfos={userInfos}
        isLoading={isLoading}
        error={error}
        setModification={setModification}
      />
      <FooterConnected/>
    </>
  );
};

export default ProfilPage;
