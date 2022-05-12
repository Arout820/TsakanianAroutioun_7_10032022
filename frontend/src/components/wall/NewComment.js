import { useState } from 'react';
import emptyPhoto from '../../assets/profil_vide.jpg';

const NewComment = ({ setUpdateComment, post, userInfos }) => {
  // récupération infos de connexion du local storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const userId = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [content, setContent] = useState('');
  const user_id = userId;
  const post_id = post.post_id;

  const HandleSubmit = (event) => {
    event.preventDefault();
    const createCommentInfos = { content, user_id, post_id };

    if (content) {
      fetch(`http://localhost:5000/api/comment`, {
        method: 'POST',
        body: JSON.stringify(createCommentInfos),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        try {
          setUpdateComment((e) => !e);
          setContent('');
        } catch (err) {
          console.log(err);
        }
      });
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
