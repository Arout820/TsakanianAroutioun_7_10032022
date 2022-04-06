const WallCardDelete = ({ setModification, post }) => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const token = userConnectionInfos.token;

  // fonction pour la logique du bouton supprimer
  const HandleDelete = (id) => {
    // // supprimer un post
    const sendDelete = fetch(`http://localhost:5000/api/post/${id}`, {
      method: 'Delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    sendDelete.then(async (res) => {
      try {
        console.log('res');
        console.log(res);
        const contenu = await res.json();
        console.log('contenu');
        console.log(contenu);
        setModification((e) => !e);
      } catch (err) {
        console.log('err');
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

export default WallCardDelete;
