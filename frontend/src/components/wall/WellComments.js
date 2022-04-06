import profilVide from '../../assets/profil_vide.jpg';

const WallComments = ({ setModification, post }) => {
  return (
    <div className="card-comments">
      <h1>Commentaires</h1>
      <div className="card-comment">
        <img className="card-comment__photo" src={profilVide} alt="" />
        <div className="card-comment__infos">
          <div className="card-comment__infos__profil">
            <p className="card-comment__infos__profil__username">John Smith</p>
            <p className="card-comment__infos__profil__time">le 10/01/2022 à 15h05</p>
          </div>
          <p className="card-comment__infos__content">J'aime beaucoup votre sens de pensée</p>
        </div>
      </div>
    </div>
  );
};

export default WallComments;
