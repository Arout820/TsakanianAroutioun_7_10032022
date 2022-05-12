import { dateCorrection } from '../../utils/Utils';
import emptyPhoto from '../../assets/profil_vide.jpg';

const Comments = ({ post, commentInfos, error, setUpdateComment, userInfos }) => {
  // récupération infos de connexion du local storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const userId = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  // fonction poour supprimer un commentaire
  const HandleDelete = (commentId) => {
    fetch(`http://localhost:5000/api/comment/${commentId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      try {
        setUpdateComment((e) => !e);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className="comments">
      <h2 className="comments__title">Commentaires</h2>

      {error && <div>Une erreur vient de se produire - {error}</div>}
      {commentInfos &&
        commentInfos.map(
          (comment) =>
            comment.post_id === post.post_id && (
              <div key={comment.comment_id} className="card-comment">
                <img
                  className="card-comment__photo"
                  src={comment.user_photo ? comment.user_photo : emptyPhoto}
                  alt={`${userInfos[0].firstname} ${userInfos[0].lastname}`}
                />
                <div className="card-comment__infos">
                  <div className="card-comment__infos__profil">
                    <p className="card-comment__infos__profil__username">
                      {comment.firstname} {comment.lastname}
                    </p>
                    <p className="card-comment__infos__profil__time">{dateCorrection(comment.comment_create_time)}</p>
                  </div>
                  <p className="card-comment__infos__content">{comment.content}</p>
                  {(comment.user_id === userId || userInfos[0].isAdmin === 1) && (
                    <div className="card-comment__infos__delete">
                      <i onClick={() => HandleDelete(comment.comment_id)} className="fa-1x fa-solid fa-trash-can"></i>
                    </div>
                  )}
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default Comments;
