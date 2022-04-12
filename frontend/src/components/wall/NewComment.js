import { useState } from 'react';
import profilVide from '../../assets/profil_vide.jpg';

const NewComment = ({ setUpdateComment, post }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [content, setContent] = useState('');
  const user_id = id;
  const post_id = post.post_id;

  const handleSubmit = (event) => {
    event.preventDefault();
    const createCommentInfos = { content, user_id, post_id };
    console.log('ddd');

    const send = fetch(`http://localhost:5000/api/comment`, {
      method: 'POST',
      body: JSON.stringify(createCommentInfos),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    send.then(async (res) => {
      try {
        setUpdateComment((e) => !e);
        setContent('');
      } catch (err) {
        console.log(err);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="card-new-comment">
      <img className="card-new-comment__photo" src={profilVide} alt={`${post.firstname} ${post.lastname}`} />
      <input
        type="text"
        className="card-new-comment__content"
        placeholder="Envoyez votre commentaire"
        onChange={(event) => setContent(event.target.value)}
        onKeyPress={(event) => event.key === 'Enter' && handleSubmit}
        value={content}
      />
    </form>
  );
};

export default NewComment;
