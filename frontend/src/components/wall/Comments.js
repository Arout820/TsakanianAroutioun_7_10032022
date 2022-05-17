import { dateCorrection } from '../../utils/Utils';

import emptyPhoto from '../../assets/profil_vide.jpg';

import deleteComment from '../../api/apiCalls/comment/deleteComment';

const Comments = ({ post, commentInfos, errorComments, setUpdateComment, userInfos }) => {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const userId = auth.userId;
  const token = auth.token;

  // fonction pour supprimer un commentaire avec l'api
  const HandleDelete = (commentId) => {
    deleteComment(commentId, token);
    setUpdateComment((e) => !e);
  };

  return (
    <div className="comments">
      <h2 className="comments__title">Commentaires</h2>

      {errorComments && (
        <div className="error-popup">
          <div className="error-popup__container">
            Une erreur s'est produite dans le chargement des commentaires - {errorComments}
          </div>
        </div>
      )}
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
