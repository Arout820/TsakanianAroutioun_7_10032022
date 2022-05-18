import { useEffect, useState } from 'react';

import modifyUserInfos from '../../api/apiCalls/user/modifyUserInfos';

import DeleteAccount from './DeleteAccount';

/**
 * Carte affichant un formulaire permettant de modifier le prénom, le nom et la biographie de l'utilisateur
 *
 * @param {Object}     props
 * @param {Boolean}    props.on               - correspond au composant parent, ici utilisé pour l'afficher
 * @param {Boolean}    props.off              - correspond au composant actuel, ici utilisé pour ne plus l'afficher
 * @param {Array}      props.userInfos        - informations de la personne connectée
 * @param {Function}   props.setModification  - useState pour déclencher le réaffichage
 *
 * @component
 */
function ProfilModifyModal({ on, off, userInfos, setModification }) {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

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

  // fonction modification d'infos de profil
  const HandleSubmit = (event) => {
    event.preventDefault();

    if (firstname && lastname) {
      modifyUserInfos(newInfos, userId, token);
      off(false);
      on(true);
      setModification((e) => !e);
    }
  };

  return (
    <div className="container-infos__description">
      <form onSubmit={HandleSubmit} className="form-modify">
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
            {errorLastname && <div className="error-input">Le nom de famille est vide </div>}
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
}

export default ProfilModifyModal;
