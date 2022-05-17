import { useEffect, useRef, useState } from 'react';

import addPost from '../../api/apiCalls/post/addPost';

const NewPost = ({ setModification, userInfos }) => {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState('');
  const [video, setVideo] = useState('');
  const [errorContent, setErrorContent] = useState(false);
  const [errorType, setErrorType] = useState(false);

  const [isImage, setIsImage] = useState('');

  const user_id = userId;
  const imagePreviewRef = useRef();

  // fonction pour crée un post
  const HandleCreatePost = (event) => {
    event.preventDefault();

    setErrorType(false);

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('content', content);
    formData.append('image', attachment);
    formData.append('video', video);

    if (!content) {
      return setErrorContent(true);
    }
    setErrorContent(false);

    addPost(formData, token);

    setModification((e) => !e);
    setIsImage('');
    setAttachment('');
    setContent('');
    setVideo('');
    imagePreviewRef.current.value = '';
  };

  // images preview handling
  const HandleImage = (event) => {
    setErrorType(false);
    setAttachment(event.target.files[0]);
    const test = event.target.files[0];
    if (test === undefined) return;
    if (test.type === 'image/png' || test.type === 'image/jpg' || test.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setIsImage(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
      setVideo('');
      return;
    }
    HandleDeleteImage();
    setErrorType(true);
  };

  // image preview deleting
  const HandleDeleteImage = () => {
    imagePreviewRef.current.value = '';
    setIsImage('');
    setAttachment('');
    setErrorContent(false);
  };

  // video handling
  const HandleVideo = () => {
    setErrorType(false);
    let findLink = content.split(' ');
    for (let i = 0; i < findLink.length; i++) {
      if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
        let embed = findLink[i].replace('watch?v=', 'embed/');
        setVideo(embed.split('&')[0]);
        findLink.splice(i, 1);
        setContent(findLink.join(' '));
        setAttachment('');
        setIsImage('');
        imagePreviewRef.current.value = '';
      }
    }
  };

  // video preview deleting
  const HandleVideoDelete = (event) => {
    event.preventDefault();
    setVideo('');
    setErrorContent(false);
  };

  // reset button
  const HandleReset = (event) => {
    event.preventDefault();
    setContent('');
    setIsImage('');
    setVideo('');
    setErrorContent('');
    imagePreviewRef.current.value = '';
  };

  useEffect(() => {
    HandleVideo();
  }, [content]);

  return (
    <form onSubmit={HandleCreatePost} className="create-post">
      <h1 htmlFor="create-post__content" className="create-post__welcome">
        <span className="create-post__welcome__intro">Bienvenue </span>
        <span className="create-post__welcome__name">
          {userInfos[0].firstname} {userInfos[0].lastname}
        </span>
      </h1>
      <div className="create-post__content">
        <textarea
          type="text"
          value={content}
          id="create-post__content"
          className="create-post__content"
          placeholder="Ajoutez votre contenu"
          onChange={(event) => {
            setErrorContent(false);
            setContent(event.target.value);
          }}
        />
        <div className="create-post__content__image">
          {!isImage ? (
            <label htmlFor="image" title="Formats autorisés : jpg / jpeg / png">
              <i className="material-icons">add_photo_alternate</i>
            </label>
          ) : (
            <div className="container-image">
              <label className="ifThereIsFile" htmlFor="image">
                <i className="material-icons">photo</i>
              </label>
              <div onClick={HandleDeleteImage} className="delete-selected-image">
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
            onChange={HandleImage}
            width="500px"
            ref={imagePreviewRef}
          />
        </div>
      </div>
      {errorContent && <div className="error-contenu">Le contenu est vide</div>}
      <div className="create-post__preview">
        {content && (
          <div className="create-post__preview__content">
            <p>{content}</p>
          </div>
        )}
        {isImage && (
          <div className="create-post__preview__image">
            <img
              src={isImage}
              alt={`Preview du post qui va être publié par ${userInfos[0].firstname} ${userInfos[0].lastname}`}
            />
          </div>
        )}
        {errorType && (
          <div className="create-post__error-type">
            Fichier non autorisé! <br />
            Choissisez un jpg, jpeg ou png !
          </div>
        )}
        {video && (
          <>
            <iframe
              className="create-post__preview__video"
              src={video}
              title={video}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </>
        )}
      </div>
      <div className="create-post__buttons">
        {video && (
          <button onClick={HandleVideoDelete} className="create-post__buttons__element button-video videonoselect">
            <span className="text">Vidéo</span>
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </span>
          </button>
        )}
        {!video && (content || isImage) && <div className="noshow"></div>}
        <button className="create-post__buttons__add">Publiez</button>
        {(content || isImage || video) && (
          <button onClick={HandleReset} className="create-post__buttons__element button-reset noselect">
            <span className="text">Annuler</span>
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </form>
  );
};

export default NewPost;
