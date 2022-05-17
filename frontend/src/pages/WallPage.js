import { useState, useEffect } from 'react';

import getPosts from '../api/apiCalls/post/getPosts';
import getUser from '../api/apiCalls/user/getUser';

import HeaderConnected from '../components/header/HeaderConnected';
import PostCard from '../components/wall/PostCard';
import NewPost from '../components/wall/NewPost';
import FooterConnected from '../components/footer/FooterConnected';


const WallPage = () => {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

  // variables selon état du fetch
  const [postInfos, setPostInfos] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

  const [errorUser, setErrorUser] = useState(null);
  const [errorPosts, setErrorPosts] = useState(null);
  // toogle pour relancer récupération de données
  const [modification, setModification] = useState(false);

  // récupération des éléments de posts de la base de données avec l'api
  useEffect(() => {
    const getPostsData = async () => {
      setErrorPosts(null);
      const posts = await getPosts(token, setErrorPosts);
      setPostInfos(posts);
    };
    getPostsData();
  }, [userId, token, modification]);

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
      {errorPosts && (
        <div className="error-popup">
          <div className="error-popup__container">
            Une erreur s'est produite dans le chargement des posts - {errorPosts}
          </div>
        </div>
      )}
      {errorUser && (
        <div className="error-popup">
          <div className="error-popup__container">
            Une erreur s'est produite dans le chargement de votre compte - {errorUser}
          </div>
        </div>
      )}

      {postInfos && userInfos && (
        <>
          <HeaderConnected />
          <main className={userInfos[0].isAdmin ? 'wall-container admin' : 'wall-container'}>
            <NewPost setModification={setModification} userInfos={userInfos} />
            {!postInfos[0] && <div className="no-card">Soyez le premier à poster!</div>}
            <PostCard postInfos={postInfos} userInfos={userInfos} setModification={setModification} />
          </main>
          <FooterConnected />
        </>
      )}
    </>
  );
};

export default WallPage;
