import WallCardPost from './WallCardPost';
import { useState } from 'react';

const WallContainer = ({ postInfos, isLoading, error, setModification }) => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [content, setContent] = useState(undefined);
  const [attachment, setAttachment] = useState(undefined);
  const user_id = id;

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
        console.log('res');
        console.log(res);
        const contenu = await res.json();
        console.log('contenu');
        console.log(contenu);
        setModification((e) => !e);
      } catch (err) {
        console.log('err');
        console.log(err);
      }
    });
  };

  return (
    <>
      <main className="wall-container">
        <form onSubmit={HandleCreatePost} className="create-post">
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
          <button className="create-post__button"> Ajouter un nouveau post</button>
        </form>
        {isLoading && <div>En cours de traitement...</div>}
        {error && <div>Une erreur vient de se produire - {error}</div>}
        {postInfos && <WallCardPost postInfos={postInfos} setModification={setModification} />}
      </main>
    </>
  );
};

export default WallContainer;
