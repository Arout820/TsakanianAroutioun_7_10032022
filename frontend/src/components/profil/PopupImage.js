import { useState, useRef } from 'react';

import emptyPhoto from '../../assets/profil_vide.jpg';

import modifyUserPhoto from '../../api/apiCalls/user/modifyUserPhoto';

/**
 * Composant popup permettant de changer ou supprimer la photo de profil
 *
 * @param {Object}    props
 * @param {Boolean}   props.setTrigger        - boolean permmettant d'afficher ou enlever un popup
 * @param {Array}     props.setModification   - useState pour déclancher le réaffichage
 * @param {Array}     props.userInfos         - informations de la personne connectée
 *
 * @component
 */
function PopupImage({ setTrigger, setModification, userInfos }) {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

  const [user_photo, setUserPhoto] = useState('');
  const [isImage, setIsImage] = useState('');
  const [errorType, setErrorType] = useState(false);

  const imagePostRef = useRef();

  // changement de photo de profil
  const HandleChangeImage = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('oldImage', userInfos[0].user_photo);
    formData.append('image', user_photo);

    modifyUserPhoto(formData, userId, token);
    setTrigger(false);
    setModification((e) => !e);
  };

  const HandleImage = (event) => {
    setErrorType(false);
    setUserPhoto(event.target.files[0]);
    const test = event.target.files[0];

    if (test.type === 'image/png' || test.type === 'image/jpg' || test.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setIsImage(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
      return;
    }
    HandleDeletePreview();
    setErrorType(true);
  };

  const HandleDeletePreview = () => {
    setUserPhoto('');
    setIsImage('');
    setUserPhoto('');
    imagePostRef.current.value = '';
  };

  return (
    <>
      <form onSubmit={HandleChangeImage} className="form-image" encType="multipart/form-data">
        <div className="form-image__change">
          {!user_photo ? (
            <>
              <div htmlFor="imageProfil" className="form-image__photo">
                <img
                  className="form-image__photo__img"
                  src={userInfos[0].user_photo ? userInfos[0].user_photo : emptyPhoto}
                  alt={
                    userInfos[0].user_photo && `Photo de profil de ${userInfos[0].firstname} ${userInfos[0].lastname}`
                  }
                />
              </div>
              {errorType && (
                <div className="form-image__error-type">
                  Fichier non autorisé! <br />
                  Choissisez un jpg, jpeg ou png!
                </div>
              )}
              <label className="form-image__change__label" htmlFor="imageProfil">
                {userInfos[0].user_photo ? 'Changez la photo de profil' : 'Ajoutez une photo de profil'}
                <i className="form-image__change__label__icon material-icons">add_photo_alternate</i>
              </label>
            </>
          ) : (
            <>
              <div htmlFor="imageProfil" className="form-image__photo">
                <img
                  className="form-image__photo__img"
                  src={isImage}
                  alt={
                    userInfos[0].user_photo &&
                    `Preview photo de profil de ${userInfos[0].firstname} ${userInfos[0].lastname}`
                  }
                />
                <div className="form-image__photo__delete">
                  <i onClick={HandleDeletePreview} className="form-image__photo__delete__icon material-icons">
                    delete
                  </i>
                </div>
              </div>
              <button type="submit" className="form-image__send">
                Confirmer le changement de photo de profil
              </button>
            </>
          )}

          <input
            className="form-image__change__input"
            type="file"
            name="imagePost"
            id="imageProfil"
            accept=".png, .jpg, .jpeg"
            onChange={HandleImage}
            ref={imagePostRef}
          />
        </div>
      </form>
      <form onSubmit={HandleChangeImage} className="form-image">
        {!user_photo && userInfos[0].user_photo && (
          <button type="submit" className="form-image__send">
            Supprimer la photo de profil active
            <i className="form-image__change__label__icon material-icons">delete</i>
          </button>
        )}
      </form>
    </>
  );
}

export default PopupImage;
