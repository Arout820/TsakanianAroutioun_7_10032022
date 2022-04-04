import { dateCorrection } from '../../utils/Utils';

const ProfilDataModal = ({ userInfos }) => {
  return (
    <div>
      <div className="description">
        <p className="description__username">
          {userInfos[0].firstname} {userInfos[0].lastname}
        </p>
        <p className="description__useremail">{userInfos[0].email}</p>
        <p className="description__created-date">
          Compte crée le {dateCorrection(userInfos[0].user_create_time)}
        </p>
      </div>
      <div className="bio-container">
        <h1 className="bio-container__title">Biographie</h1>
        <p className="bio-container__infos">{userInfos[0].bio}</p>
      </div>
    </div>
  );
};

export default ProfilDataModal;
