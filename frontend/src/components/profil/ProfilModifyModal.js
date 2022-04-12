import { useState } from 'react';

const ProfilModifyModal = ({ on, off, userInfos, setModification }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [firstname, setFirstName] = useState(userInfos[0].firstname);
  const [lastname, setLastname] = useState(userInfos[0].lastname);
  const [bio, setBio] = useState(userInfos[0].bio);

  const newInfos = { firstname, lastname, bio };

  const handleSubmit = (event) => {
    event.preventDefault();

    const send = fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newInfos),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer${token}`,
      },
    });

    send.then(async (res) => {
      try {
        off(false);
        on(true);
        setModification((e) => !e);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className="description">
      <form onSubmit={handleSubmit} className="form-modify">
        <div className="form-modify-container">
          <div className="form-modify__element">
            <label htmlFor="firstname">Prénom</label>
            <input
              name="test"
              type="text"
              id="firstname"
              onChange={(event) => setFirstName(event.target.value)}
              defaultValue={firstname}
            />
          </div>

          <div className="form-modify__element">
            <label htmlFor="lastname">Nom de famille</label>
            <input
              type="text"
              id="lastname"
              onChange={(event) => setLastname(event.target.value)}
              defaultValue={lastname}
            />
          </div>
        </div>

        <div className="form-modify__element">
          <label htmlFor="biography">Biographie</label>
          <textarea
            type="text"
            id="biography"
            className="form-modify__element__biography"
            onChange={(event) => setBio(event.target.value)}
            defaultValue={bio}
          />
        </div>

        <button type="submit" id="modifyInfos" className="form-modify__button">
          Valider la modification
        </button>
      </form>
    </div>
  );
};

export default ProfilModifyModal;
