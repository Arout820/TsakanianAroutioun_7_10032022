import { useState, useRef } from 'react';
import emptyPhoto from '../../assets/profil_vide.jpg';

const PopupImage = ({ setTrigger, setModification, userInfos }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [user_photo, setUserPhoto] = useState('');
  const [isImage, setIsImage] = useState('');

  const imagePostRef = useRef();

  // changement de photo de profil
  const HandleChangeImage = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('oldImage', userInfos[0].user_photo);
    formData.append('image', user_photo);

    fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      try {
        setTrigger(false);
        setModification((e) => !e);
      } catch (err) {
        console.log(err);
      }
    });
  };

  // suppression photo de profil
  const HandleDeleteImage = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('oldImage', userInfos[0].user_photo);
    formData.append('image', user_photo);

    if (!user_photo) {
      fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        try {
          setTrigger(false);
          setModification((e) => !e);
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  const HandleImage = (event) => {
    setUserPhoto(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIsImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
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
          <input type="hidden" name="oldImage" value={userInfos[0].user_photo} />
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
            onChange={HandleImage}
            ref={imagePostRef}
          />
        </div>
      </form>
      <form onSubmit={HandleDeleteImage} className="form-image">
        {(!user_photo && userInfos[0].user_photo) && (
          <button type="submit" className="form-image__send">
            Supprimer la photo de profil active
            <i className="form-image__change__label__icon material-icons">delete</i>
          </button>
        )}
      </form>
    </>
  );
};

export default PopupImage;
