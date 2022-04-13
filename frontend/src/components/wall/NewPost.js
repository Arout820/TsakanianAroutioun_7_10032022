import { useEffect, useState } from 'react';

const WallNewPost = ({ setModification }) => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState('');
  const user_id = id;

  useEffect(() => {
    if (attachment) {
      console.log(attachment.name);
    }
  }, [attachment]);

  // fonction pour la logique du bouton inscription
  const HandleCreatePost = async (event) => {
    event.preventDefault();

    // données à envoyer
    const createPostInfos = { content, user_id, attachment };
    console.log(createPostInfos);

    // créer un post
    const sendCreatePost = fetch('http://localhost:5000/api/post', {
      method: 'POST',
      body: JSON.stringify(createPostInfos),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    sendCreatePost.then(async (res) => {
      try {
        setModification((e) => !e);
      } catch (err) {
        console.log(err);
      }
    });
  };
  return (
    <form onSubmit={HandleCreatePost} className="create-post">
      <div className="create-post__content">
        <label className="create-post__label" htmlFor="create-post__content">
          Publiez
        </label>
        <textarea
          type="text"
          id="create-post__content"
          className="create-post__content"
          placeholder="Ajoutez votre contenu"
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div className="create-post__buttons">
        <div className="create-post__buttons__image">
          <label className={attachment.name && 'testtest'} htmlFor="image">
            📷
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(event) => setAttachment(event.target.files[0])}
          />
        </div>
        <button className="create-post__buttons__add">Ajouter un nouveau post</button>
      </div>
    </form>
  );
};

export default WallNewPost;
