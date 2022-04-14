import { useEffect, useState } from 'react';
import emptyPhoto from '../../assets/profil_vide.jpg';

const NewPost = ({ setModification, userInfos }) => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState('');
  const [isImage, setIsImage] = useState('');
  const user_id = id;
  const fileStockInInput = document.querySelector('#image');

  // fonction pour la logique du bouton inscription
  const HandleCreatePost = async (event) => {
    event.preventDefault();

    // données à envoyer
    const createPostInfos = { content, user_id, attachment };
    console.log(createPostInfos);

    const formData = new FormData();
    // formData.append('oldImage', userInfos[0].user_photo);
    formData.append('user_id', user_id);
    formData.append('content', content);
    formData.append('image', attachment);

    // créer un post
    const sendCreatePost = fetch('http://localhost:5000/api/post', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    sendCreatePost.then(async (res) => {
      try {
        setModification((e) => !e);
        setIsImage('');
        setAttachment('');
        setContent('');
        fileStockInInput.value = '';
      } catch (err) {
        console.log(err);
      }
    });
  };

  const imageHandler = (event) => {
    setAttachment(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIsImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleDelete = (event) => {
    fileStockInInput.value = '';
    setIsImage('');
    setAttachment('');
  };

  return (
    <form onSubmit={HandleCreatePost} className="create-post">
      <label htmlFor="create-post__content" className="create-post__welcome">
        <span className="create-post__welcome__intro">Bienvenue </span>
        <span className="create-post__welcome__name">
          {userInfos[0].firstname} {userInfos[0].lastname}
        </span>
      </label>
      <div className="create-post__content">
        <textarea
          type="text"
          value={content}
          id="create-post__content"
          className="create-post__content"
          placeholder="Ajoutez votre contenu"
          onChange={(event) => setContent(event.target.value)}
        />
        <div className="create-post__content__image">
          {!isImage ? (
            <label htmlFor="image">
              <i className="material-icons">add_photo_alternate</i>
            </label>
          ) : (
            <div className="container-image">
              <label className="ifThereIsFile" htmlFor="image">
                <i className="material-icons">photo</i>
              </label>
              <div onClick={handleDelete} className="delete-selected-image">
                <i className="fa-lg fa-solid fa-trash-can"></i>
              </div>
            </div>
          )}
          <input
            className="input-image"
            type="file"
            name="image"
            id="image"
            accept=".png, .jpg, .jpeg"
            onChange={imageHandler}
          />
        </div>
      </div>
      {content && (
        <div className="create-post__content-preview">
          <p>{content}</p>
        </div>
      )}
      {isImage && (
        <div className="create-post__image-preview">
          <img src={isImage} alt="" />
        </div>
      )}
      <div className="create-post__buttons">
        <div className="create-post__buttons__image"></div>
        <button className="create-post__buttons__add">Publiez</button>
      </div>
    </form>
  );
};

export default NewPost;
