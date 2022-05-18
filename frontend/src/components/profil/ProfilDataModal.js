import { dateCorrection } from '../../utils/Utils';

/**
 * Carte affichant le profil de l'utilisateur
 *
 * @param {Object}   props
 * @param {Array}    props.userInfos   - informations de la personne connectée
 *
 * @component
 */
function ProfilDataModal({ userInfos }) {
  return (
    <div>
      <div className="container-infos__description">
        <h1 className="container-infos__description__username">
          {userInfos[0].firstname} {userInfos[0].lastname}
        </h1>
        <p className="container-infos__description__useremail">{userInfos[0].email}</p>
        <p className="container-infos__description__created-date">
          Compte crée le {dateCorrection(userInfos[0].user_create_time)}
        </p>
      </div>
      <div className="container-infos__bio">
        <h1 className="container-infos__bio__title">Biographie</h1>
        <p className="container-infos__bio__infos">{userInfos[0].bio}</p>
      </div>
    </div>
  );
}

export default ProfilDataModal;
