import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Popup from '../../utils/Popup';

import deleteUser from '../../api/apiCalls/user/deleteUser';

/**
 * Composant permettant de supprimer un compte
 *
 * @component
 */
function DeleteAccount() {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

  const navigate = useNavigate();

  // popup pour confirmation de suppression
  const [buttonPopup, setButtonPopup] = useState(false);

  // suppression du compte
  const HandleDelete = (event) => {
    event.preventDefault();

    deleteUser(userId, token);
    navigate('/');
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
}

export default DeleteAccount;
