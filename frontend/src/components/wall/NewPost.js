import { useEffect, useState } from 'react';

const NewPost = ({ setModification, userInfos }) => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState('');
  const [video, setVideo] = useState('');
  const [errorContent, setErrorContent] = useState(false);

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
    formData.append('video', video);

    // créer un post
    if (!content) {
      setErrorContent(true);
    } else {
      setErrorContent(false);
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
          setVideo('');
          fileStockInInput.value = '';
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  // images handling
  const imageHandler = (event) => {
    setAttachment(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIsImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    setVideo('');
  };

  const HandleDelete = (event) => {
    fileStockInInput.value = '';
    setIsImage('');
    setAttachment('');
  };

  // video handling
  const HandleVideo = () => {
    let findLink = content.split(' ');
    for (let i = 0; i < findLink.length; i++) {
      if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
        let embed = findLink[i].replace('watch?v=', 'embed/');
        setVideo(embed.split('&')[0]);
        findLink.splice(i, 1);
        setContent(findLink.join(' '));
        setAttachment('');
        setIsImage('');
        fileStockInInput.value = '';
      }
    }
  };

  const HandleVideoDelete = (event) => {
    event.preventDefault();
    setVideo('');
  };

  // reset button
  const HandleReset = (event) => {
    event.preventDefault();
    setContent('');
    setIsImage('');
    setVideo('');
    setErrorContent('');
    fileStockInInput.value = '';
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
            <label htmlFor="image">
              <i className="material-icons">add_photo_alternate</i>
            </label>
          ) : (
            <div className="container-image">
              <label className="ifThereIsFile" htmlFor="image">
                <i className="material-icons">photo</i>
              </label>
              <div onClick={HandleDelete} className="delete-selected-image">
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
            width="500px"
          />
        </div>
      </div>
      {errorContent && <div className="error-contenu">Le contenu est vide</div>}
      <div className="create-post__preview">
        {/* {(content || isImage) && <h1 className="create-post__preview__title">Prévisualisation</h1>} */}
        {content && (
          <div className="create-post__preview__content">
            <p>{content}</p>
          </div>
        )}
        {isImage && (
          <div className="create-post__preview__image">
            <img src={isImage} alt="" />
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
          <button
            onClick={HandleVideoDelete}
            className="create-post__buttons__element button-video videonoselect"
          >
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
