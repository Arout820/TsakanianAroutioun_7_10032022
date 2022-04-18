import { useState } from 'react';
import emptyPhoto from '../../assets/profil_vide.jpg';

const PopupImage = ({ setTrigger, setModification, userInfos }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [user_photo, setUserPhoto] = useState('');
  const [isImage, setIsImage] = useState('');

  const fileStockInInput = document.querySelector('#imageProfil');

  // changement de photo de profil
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('oldImage', userInfos[0].user_photo);
    formData.append('image', user_photo);

    const send = fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    send.then(async (res) => {
      try {
        setTrigger(false);
        setModification((e) => !e);
      } catch (err) {
        console.log(err);
      }
    });
  };

  // suppression photo de profil
  const handleDelete = (event) => {
    event.preventDefault();
    if (!user_photo) {
      const sendDelete = fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ user_photo }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      sendDelete.then(async (res) => {
        try {
          setTrigger(false);
          setModification((e) => !e);
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  
  const imageHandler = (event) => {
    setUserPhoto(event.target.files[0]);
    console.log('userphoto from IMAGE HANDLER');
    console.log(user_photo);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setIsImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleDeletePreview = (event) => {
    fileStockInInput.value = '';
    setIsImage('');
    setUserPhoto('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-image" encType="multipart/form-data">
        <div className="form-image__change">
          <input type="hidden" name="oldImage" value={userInfos[0].user_photo} />
          {!user_photo ? (
            <>
              <div htmlFor="imageProfil" className="form-image__photo">
                <img
                  className="form-image__photo__img"
                  src={userInfos[0].user_photo ? userInfos[0].user_photo : emptyPhoto}
                  alt=""
                />
              </div>
              <label className="form-image__change__label" htmlFor="imageProfil">
                Changer la photo de profil
                <i className="form-image__change__label__icon material-icons">add_photo_alternate</i>
              </label>
            </>
          ) : (
            <>
              <div htmlFor="imageProfil" className="form-image__photo">
                <img className="form-image__photo__img" src={isImage} alt="" />
                <div className='form-image__photo__delete'>
                  <i
                    onClick={() => setUserPhoto('')}
                    className="form-image__photo__delete__icon material-icons"
                  >
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
            name="image"
            id="imageProfil"
            onChange={imageHandler}
          />
        </div>
      </form>
      <form onSubmit={handleDelete} className="form-image">
        {!user_photo && (
          <button type="submit" className="form-image__send">
            Supprimer la photo de profil actuelle
            <i className="form-image__change__label__icon material-icons">delete</i>
          </button>
        )}
      </form>
    </>
  );
};

export default PopupImage;
