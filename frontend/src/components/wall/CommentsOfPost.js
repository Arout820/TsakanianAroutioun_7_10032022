import { useEffect, useState } from 'react';

import getCommentNumberForPost from '../../api/apiCalls/comment/getCommentNumberForPost';

/**
 * Composant permettant de récupérer le nombre de commentaire d'un post
 *
 * @param {Object}    props
 * @param {Object}    props.post            - informations du post
 * @param {Boolean}   props.updateComment   - pour le réaffichage des commentaires
 *
 * @component
 */
function CommentsOfPost({ post, updateComment }) {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = auth.token;

  // variables selon état du fetch
  const [numberComments, setNumberComments] = useState('');

  // récupération du nombre de commentaires par posts de la base de données avec l'api
  useEffect(() => {
    const getNumberComment = async () => {
      const numberComment = await getCommentNumberForPost(post.post_id, token);
      setNumberComments(numberComment);
    };
    getNumberComment();
  }, [token, updateComment, post.post_id]);

  return (
    <div className="card-post__reputation__element">
      <i className="fa-2x fa-solid fa-comment"></i>
      <p className="card-post__reputation__element__number">
        {numberComments && numberComments[0].post_id === post.post_id && numberComments[0].post_comments} commentaires
      </p>
    </div>
  );
}

export default CommentsOfPost;
