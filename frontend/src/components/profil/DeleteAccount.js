import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Popup from '../../utils/Popup';

const DeleteAccount = () => {
  // récupération infos de connexion du local storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const userId = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const navigate = useNavigate();

  // popup changement de photo de profil
  const [buttonPopup, setButtonPopup] = useState(false);

  const HandleDelete = (event) => {
    event.preventDefault();

    fetch(`http://localhost:5000/api/user/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      try {
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    });
  };
  return (
    <div className="delete-account">
      <div className="delete-account__question" onClick={() => setButtonPopup(true)}>
        Voulez vous supprimer le compte?
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <button className="delete-account__confirmate" onClick={HandleDelete}>
          Confirmer la suppression
        </button>
        <div className="delete-account__infos">La suppression est irréversible</div>
      </Popup>
    </div>
  );
};

export default DeleteAccount;
