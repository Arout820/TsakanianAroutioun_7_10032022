import profilVide from '../../assets/profil_vide.jpg';

const WallNewComment = ({ setModification, post }) => {
  return (
    <div className="card-new-comment">
      <img
        className="card-new-comment__photo"
        src={post.user_photo ? post.user_photo : profilVide}
        alt={`${post.firstname} ${post.lastname}`}
      />
      <input type="text" className="card-new-comment__content" placeholder="Envoyez votre commentaire" />
    </div>
  );
};

export default WallNewComment;
