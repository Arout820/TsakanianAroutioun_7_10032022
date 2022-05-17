import deletePost from '../../api/apiCalls/post/deletePost';

const DeletePostCard = ({ setModification, post }) => {
  // récupération infos de connexion du local storage
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = auth.token;

  // fonction pour supprimer un post avec l'api
  const HandleDelete = (postId) => {
    deletePost(postId, token);
    setModification((e) => !e);
  };
  return (
    <i onClick={() => HandleDelete(post.post_id)} className="card-post__infos__delete fa-2x fa-solid fa-trash-can"></i>
  );
};

export default DeletePostCard;
