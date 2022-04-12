import Header from '../components/header/HeaderConnected';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // toogle pour relancer récupération de données
  const [modification, setModification] = useState(false);

  // récupération des éléments de la base de données avec l'api
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
          throw Error('Erreur survenue');
        } else {
          const contenu = await res.json();
          setPostInfos(contenu);
          console.log('Contenu infos post');
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
      <main className="wall-container">
        <WallNewPost setModification={setModification} />
        {isLoading && <div>En cours de traitement...</div>}
        {error && <div>Une erreur vient de se produire - {error}</div>}
        {postInfos && <WallCardPost postInfos={postInfos} setModification={setModification} />}
      </main>
    </>
  );
};

export default WallPage;
