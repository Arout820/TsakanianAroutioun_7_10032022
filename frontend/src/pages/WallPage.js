import HeaderConnected from '../components/header/HeaderConnected';
import FooterConnected from '../components/footer/FooterConnected';
import WallCardPost from '../components/wall/PostCard';
import WallNewPost from '../components/wall/NewPost';

import { useState, useEffect } from 'react';

const WallPage = () => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  // variables selon état du fetch
  const [postInfos, setPostInfos] = useState(null);
  const [error, setError] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

  // toogle pour relancer récupération de données
  const [modification, setModification] = useState(false);

  // récupération des éléments de posts de la base de données avec l'api
  useEffect(() => {
    const abortCtrl = new AbortController();
    fetch('http://localhost:5000/api/post/', {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      try {
        if (!res.ok) {
          throw Error(`${res.status}  ${res.statusText}`);
        } else {
          const contenu = await res.json();
          setPostInfos(contenu);
          // console.log(contenu);
          setError(null);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          setError('Fetch a été stoppé');
        } else {
          setError(err.message);
        }
      }
    });
    return () => abortCtrl.abort();
  }, [id, token, modification]);

  // récupération des éléments de l'utilisateur connecté de la base de données avec l'api
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
          // console.log(contenu);
          setError(null);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          setError('Fetch a été stoppé');
        } else {
          setError(err.message);
        }
      }
    });
    return () => abortCtrl.abort();
  }, [id, token, modification]);

  return (
    <>
      {error && <div>Une erreur vient de se produire - {error}</div>}
      {postInfos && userInfos && (
        <>
          <HeaderConnected />
          <main className={userInfos[0].isAdmin ? 'wall-container admin' : 'wall-container'}>
            <WallNewPost setModification={setModification} userInfos={userInfos} />
            <WallCardPost postInfos={postInfos} userInfos={userInfos} setModification={setModification} />
          </main>
          <FooterConnected />
        </>
      )}
    </>
  );
};

export default WallPage;
