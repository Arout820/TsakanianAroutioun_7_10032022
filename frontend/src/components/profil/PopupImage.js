import { useState } from 'react';

const PopupImage = ({ setTrigger, setModification, userInfos }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [user_photo, setUserPhoto] = useState('');

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

  return (
    <form onSubmit={handleSubmit} className="form-image" encType="multipart/form-data">
      <div className="form-image__change">
        <input type="hidden" name="oldImage" value={userInfos[0].user_photo} />
        <label className="form-image__change__label" htmlFor="file">
          Changer la photo de profil
        </label>
        <input
          className="form-image__change__input"
          type="file"
          name="image"
          id="image"
          onChange={(event) => setUserPhoto(event.target.files[0])}
        />
      </div>
      <button type="submit" className="form-image__send">
        Envoyer
      </button>
    </form>
  );
};

export default PopupImage;
