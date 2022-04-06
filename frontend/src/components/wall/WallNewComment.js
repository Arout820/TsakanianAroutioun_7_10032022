import profilVide from '../../assets/profil_vide.jpg';

const WallNewComment = ({ setModification, post }) => {
  return (
    <div className="card-new-comment">
      <img className="card-new-comment__photo" src={profilVide} alt="" />
      <input type="text" className="card-new-comment__content" placeholder="Envoyez votre commentaire" />
    </div>
  );
};

export default WallNewComment;
