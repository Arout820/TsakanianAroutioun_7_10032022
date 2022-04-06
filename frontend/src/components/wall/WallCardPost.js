import { useEffect } from 'react';
import profilVide from '../../assets/profil_vide.jpg';

const WallCardPost = ({ postInfos, setModification }) => {
  // infos Local Storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const token = userConnectionInfos.token;

  // fonction pour la logique du bouton supprimer
  const HandleDelete = async (id) => {
    // créer un post
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

  return postInfos.map((post) => (
    <div key={post.post_id} className="card-post">
      <div className="card-post__infos">
        <img className="card-post__infos__photo" src={profilVide} alt="" />
        <div className="card-post__infos__profil">
          <p className="card-post__infos__profil__username">
            {post.firstname} {post.lastname}
          </p>
          <p className="card-post__infos__profil__time">{post.post_create_time}</p>
        </div>
        <i
          onClick={() => HandleDelete(post.post_id)}
          className="card-post__infos__delete fa-2x fa-solid fa-trash-can"
        ></i>
      </div>
      <p className="card-post__content">{post.content}</p>
      <div className="card-post__reputation">
        <i className="card-post__reputation__element fa-2x fa-solid fa-thumbs-up"></i>
        <p className="card-post__reputation__element ">Commenter</p>
      </div>
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
      <div className="card-new-comment">
        <img className="card-new-comment__photo" src={profilVide} alt="" />
        <input type="text" className="card-new-comment__content" placeholder="Envoyez votre commentaire" />
      </div>
    </div>
  ));
};

export default WallCardPost;
