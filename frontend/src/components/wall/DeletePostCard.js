const DeletePostCard = ({ setModification, post }) => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const token = userConnectionInfos.token;

  // fonction pour supprimer un post
  const HandleDelete = (postId) => {
    fetch(`http://localhost:5000/api/post/${postId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      try {
        setModification((e) => !e);
      } catch (err) {
        console.log(err);
      }
    });
  };
  return (
    <i onClick={() => HandleDelete(post.post_id)} className="card-post__infos__delete fa-2x fa-solid fa-trash-can"></i>
  );
};

export default DeletePostCard;
