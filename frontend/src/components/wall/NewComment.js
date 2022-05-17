import { useState } from 'react';

import addComment from '../../api/apiCalls/comment/addComment';

import emptyPhoto from '../../assets/profil_vide.jpg';

const NewComment = ({ setUpdateComment, post, userInfos }) => {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

  // contenu input commentaire
  const [content, setContent] = useState('');

  // Infos à envoyer lors de la création d'un commentaire
  const user_id = userId;
  const post_id = post.post_id;

  // fonction poour ajouter un commentaire avec l'api
  const HandleSubmit = (event) => {
    event.preventDefault();
    const sendCommentInfos = { content, user_id, post_id };

    if (content) {
      addComment(sendCommentInfos, token);
      setUpdateComment((e) => !e);
      setContent('');
    }
  };
  return (
    <form onSubmit={HandleSubmit} className="card-new-comment">
      <div className="card-new-comment__photo">
        <img
          src={userInfos[0].user_photo ? userInfos[0].user_photo : emptyPhoto}
          alt={`${userInfos[0].firstname} ${userInfos[0].lastname}`}
        />
      </div>
      <input
        type="text"
        className="card-new-comment__content"
        placeholder="Envoyez votre commentaire"
        onChange={(event) => setContent(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' && HandleSubmit}
        value={content}
      />
    </form>
  );
};

export default NewComment;
