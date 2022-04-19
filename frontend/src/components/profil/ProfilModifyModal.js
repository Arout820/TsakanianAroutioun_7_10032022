import { useEffect, useState } from 'react';
import DeleteAccount from './DeleteAccount';

const ProfilModifyModal = ({ on, off, userInfos, setModification }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const [firstname, setFirstName] = useState(userInfos[0].firstname);
  const [lastname, setLastname] = useState(userInfos[0].lastname);
  const [bio, setBio] = useState(userInfos[0].bio);

  const [errorFirstname, setErrorFirstname] = useState(false);
  const [errorLastname, setErrorLastname] = useState(false);
  const [errorBio, setErrorBio] = useState(false);

  useEffect(() => {
    if (!firstname) {
      setErrorFirstname(true);
    }

    if (!lastname) {
      setErrorLastname(true);
    }

    if (!bio) {
      setErrorBio(true);
    }
  }, [firstname, lastname, bio]);

  const newInfos = { firstname, lastname, bio };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstname && lastname) {
      const send = fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newInfos),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      send.then(async (res) => {
        try {
          console.log(res);
          off(false);
          on(true);
          setModification((e) => !e);
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  return (
    <div className="container-infos__description">
      <form onSubmit={handleSubmit} className="form-modify">
        <div className="form-modify-container">
          <div className="form-modify__element">
            <label htmlFor="firstname">Prénom</label>
            <input
              name="test"
              type="text"
              id="firstname"
              onChange={(event) => {
                event.target.value && setErrorFirstname(false);
                setFirstName(event.target.value);
              }}
              defaultValue={firstname}
            />
            {errorFirstname && <div className="error-input">Le prénom est vide</div>}
          </div>

          <div className="form-modify__element">
            <label htmlFor="lastname">Nom de famille</label>
            <input
              type="text"
              id="lastname"
              onChange={(event) => {
                event.target.value && setErrorLastname(false);
                setLastname(event.target.value);
              }}
              defaultValue={lastname}
            />
            {errorLastname && <div className='error-input'>Le nom de famille est vide </div>}
          </div>
        </div>

        <div className="form-modify__element">
          <label htmlFor="biography">Biographie</label>
          <textarea
            type="text"
            id="biography"
            className="form-modify__element__biography"
            onChange={(event) => {
              event.target.value && setErrorBio(false);
              setBio(event.target.value);
            }}
            defaultValue={bio}
          />
        </div>

        <button type="submit" id="modifyInfos" className="form-modify__button">
          Valider la modification
        </button>
      </form>
      <DeleteAccount />
    </div>
  );
};

export default ProfilModifyModal;
