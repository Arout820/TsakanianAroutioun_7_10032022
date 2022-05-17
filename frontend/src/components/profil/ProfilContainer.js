import { useState } from 'react';

import emptyPhoto from '../../assets/profil_vide.jpg';

import Popup from '../../utils/Popup';
import PopupImage from './PopupImage';
import ProfilDataModal from './ProfilDataModal';
import ProfilModifyModal from './ProfilModifyModal';
import FooterConnected from '../../components/footer/FooterConnected';

const ProfilContainer = ({ userInfos, isLoading, errorUser, setModification }) => {
  // variables toogle modals
  const [profilDataModal, setProfilDataModal] = useState(true);
  const [profilModifyModal, setProfilModifyModal] = useState(false);

  // popup changement de photo de profil
  const [buttonPopup, setButtonPopup] = useState(false);

  // fonction toogle modals
  const HandleModals = () => {
    if (profilDataModal === true) {
      setProfilDataModal(false);
      setProfilModifyModal(true);
    } else if (profilModifyModal === true) {
      setProfilModifyModal(false);
      setProfilDataModal(true);
    }
  };

  return (
    <>
      {isLoading && <div>En cours de traitement...</div>}

      {errorUser && (
        <div className="error-popup">
          <div className="error-popup__container">
            Une erreur s'est produite dans la page de votre profil - {errorUser}
          </div>
        </div>
      )}
      {userInfos && (
        <>
          <main className="main-profil">
            <div className="profil-datas">
              <div className="profil-datas__photo">
                <img
                  className="profil-datas__photo__img"
                  src={userInfos[0].user_photo ? userInfos[0].user_photo : emptyPhoto}
                  alt={`Logo de profil de ${userInfos[0].firstname} ${userInfos[0].lastname}`}
                  onClick={() => setButtonPopup(true)}
                />
              </div>
              <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <PopupImage setTrigger={setButtonPopup} setModification={setModification} userInfos={userInfos} />
              </Popup>
              <div className="container-infos">
                <button onClick={HandleModals} className="container-infos__modify-account">
                  Modifier le profil
                </button>
                {profilDataModal && <ProfilDataModal userInfos={userInfos} />}

                {profilModifyModal && (
                  <ProfilModifyModal
                    setModification={setModification}
                    userInfos={userInfos}
                    off={setProfilModifyModal}
                    on={setProfilDataModal}
                  />
                )}
              </div>
            </div>
          </main>
          <FooterConnected />
        </>
      )}
    </>
  );
};

export default ProfilContainer;
