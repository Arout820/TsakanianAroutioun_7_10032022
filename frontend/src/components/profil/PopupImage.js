import { useState } from 'react';

const PopupImage = () => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [user_photo, setUserPhoto] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const send = fetch('http://localhost:5000/api/user/' + id, {
      method: 'PUT',
      body: JSON.stringify(user_photo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    send.then(async (res) => {
      try {
        console.log(res);
        const contenu = res.json();
        console.log(contenu);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-image">
      <div className="form-image__change">
        <label className="form-image__change__label" htmlFor="file">
          Changer la photo de profil
        </label>
        <input
          className="form-image__change__input"
          type="file"
          name="file "
          id="file"
          onChange={(event) => setUserPhoto(event.target.value)}
          value={user_photo}
        />
      </div>
      <button type="submit" className="form-image__send">
        Envoyer
      </button>
    </form>
  );
};

export default PopupImage;
