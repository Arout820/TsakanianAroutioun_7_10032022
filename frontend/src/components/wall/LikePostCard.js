import { useEffect, useState } from 'react';

const LikePostCard = ({ post, setModification }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const userIdConnected = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  // variables selon état du fetch
  const [userLikesInfos, setUserLikesInfos] = useState('');
  const [error, setError] = useState(null);

  // toogle pour relancer récupération de données de likes
  const [updateLike, setUpdateLike] = useState(false);

  // Infos à envoyer lors d'un like
  const user_id = userIdConnected;
  const post_id = post.post_id;
  const isLiked = 1;
  const sendlikesInfos = { user_id, post_id, isLiked };

  useEffect(() => {
    if (userLikesInfos) {
      console.log(userLikesInfos[0]);
    }
  }, [userLikesInfos]);

  // -------------- récupération des éléments de posts de la base de données avec l'api -----------------------------
  useEffect(() => {
    const abortCtrl = new AbortController();
    fetch(`http://localhost:5000/api/likes/${userIdConnected}/${post.post_id}`, {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      try {
        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        } else {
          const contenu = await res.json();
          setUserLikesInfos(contenu);
          setError(null);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          setError("Le chargement des éléments n'a pas abouti");
        } else {
          setError(err.message);
        }
      }
    });
    return () => abortCtrl.abort();
  }, [userIdConnected, token, error, updateLike, post.post_id]);

  // --------------- fonction like enlever like ------------------------ //
  const HandleLike = (event) => {
    event.preventDefault();

    if (userLikesInfos[0] === undefined) {
      fetch(`http://localhost:5000/api/likes/`, {
        method: 'POST',
        body: JSON.stringify(sendlikesInfos),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        try {
          setModification((e) => !e);
          setUpdateLike((e) => !e);
        } catch (err) {
          console.log(err);
        }
      });
    } else {
      fetch(`http://localhost:5000/api/likes/${userIdConnected}/${post.post_id}/0`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        try {
          setModification((e) => !e);
          setUpdateLike((e) => !e);
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  return (
    <div onClick={HandleLike} className="card-post__reputation__element">
      <i
        className={
          !userLikesInfos[0] ? 'fa-2x fa-solid fa-thumbs-up' : 'fa-2x fa-solid fa-thumbs-up liked'
        }
      ></i>
      <p className="card-post__reputation__element__number">{post.post_likes_number} j'aime</p>
    </div>
  );
};

export default LikePostCard;
