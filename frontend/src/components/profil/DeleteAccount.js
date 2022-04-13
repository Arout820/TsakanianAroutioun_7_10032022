import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Popup from '../../utils/Popup';

const DeleteAccount = () => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const navigate = useNavigate();

  // popup changement de photo de profil
  const [buttonPopup, setButtonPopup] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();

    const send = fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    send.then(async (res) => {
      try {
        navigate('/');
        console.log(res);
        console.log(res.json());
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
          <button className="delete-account__confirmate" onClick={handleDelete}>
            Confirmer la suppression
          </button>
          <div className="delete-account__infos">La suppression est irréversible</div>
      </Popup>
    </div>
  );
};

export default DeleteAccount;
