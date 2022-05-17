import { useEffect, useState } from 'react';

import addLike from '../../api/apiCalls/likes/addLike';
import deleteLike from '../../api/apiCalls/likes/deleteLike';
import getLikesNumberForPost from '../../api/apiCalls/likes/getLikesNumberForPost';

const LikePostCard = ({ post, setModification }) => {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

  // variables selon état du fetch
  const [userLikesInfos, setUserLikesInfos] = useState('');
  const [error, setError] = useState(null);

  // toogle pour relancer récupération de données de likes
  const [updateLike, setUpdateLike] = useState(false);

  // Infos à envoyer lors d'un like
  const user_id = userId;
  const post_id = post.post_id;
  const isLiked = 1;

  // ------------ récupération du nombre de likes d'un post de la base de données avec l'api ------------ //
  useEffect(() => {
    const getLikesNumber = async () => {
      setError(null);
      const likesNumber = await getLikesNumberForPost(userId, post.post_id, token, setError);
      setUserLikesInfos(likesNumber);
    };
    getLikesNumber();
  }, [userId, token, error, updateLike, post.post_id]);

  // ------------ fonction Handlelike pour ajouter ou enlever un like ------------ //
  const HandleLike = (event) => {
    event.preventDefault();
    const sendLikesInfos = { user_id, post_id, isLiked };
    if (userLikesInfos[0] === undefined) {
      addLike(sendLikesInfos, token);
      setModification((e) => !e);
      setUpdateLike((e) => !e);
      return;
    }

    deleteLike(userId, post.post_id, token);
    setModification((e) => !e);
    setUpdateLike((e) => !e);
  };

  return (
    <div onClick={HandleLike} className="card-post__reputation__element">
      <i className={!userLikesInfos[0] ? 'fa-2x fa-solid fa-thumbs-up' : 'fa-2x fa-solid fa-thumbs-up liked'}></i>
      <p className="card-post__reputation__element__number">{post.post_likes_number} j'aime</p>
    </div>
  );
};

export default LikePostCard;
