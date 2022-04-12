const DeletePostCard = ({ setModification, post }) => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const token = userConnectionInfos.token;

  // fonction pour la logique du bouton supprimer
  const HandleDelete = (id) => {
    // // supprimer un post
    const sendDeletePost = fetch(`http://localhost:5000/api/post/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    sendDeletePost.then(async (res) => {
      try {
        setModification((e) => !e);
      } catch (err) {
        console.log(err);
      }
    });
  };
  return (
    <i
      onClick={() => HandleDelete(post.post_id)}
      className="card-post__infos__delete fa-2x fa-solid fa-trash-can"
    ></i>
  );
};

export default DeletePostCard;
