import profilVide from '../../assets/profil_vide.jpg';

const WallContainer = () => {
  const handleDelete = (event) => {
    event.preventDefault();
    console.log('deleted');
    let item = event.target;
    let card = item.closest('#card-post');
    console.log(card);
    card.remove();
  };

  return (
    <main className="wall-container">
      <button className="new-post"> Ajouter un nouveau post</button>

      <div className="card-post" id="card-post">
        <div className="card-post__infos">
          <img className="card-post__infos__photo" src={profilVide} alt="" />
          <div className="card-post__infos__profil">
            <p className="card-post__infos__profil__username">John Smith</p>
            <p className="card-post__infos__profil__time">Crée le 10/01/2022</p>
          </div>
          <i onClick={handleDelete} className="card-post__infos__delete fa-2x fa-solid fa-trash-can"></i>
        </div>
        <p className="card-post__content">Ici se trouve le post que je vais mettre en ligne</p>
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
          <input type="text" className="card-new-comment__content" placeholder='Envoyez votre commentaire' />
        </div>
      </div>
    </main>
  );
};

export default WallContainer;
