import profilVide from '../../assets/profil_vide.jpg';

const WallContainer = () => {
  const handleDelete = (event) => {
    event.preventDefault();
    console.log('deleted');
  };

  return (
    <main className="wall-container">
      <button className="new-post"> Ajouter un nouveau post</button>

      <div className="card-post">
        <div className="card-post__infos">
          <img className="card-post__infos__photo" src={profilVide} alt="" />
          <div className="card-post__infos__profil">
            <p className="card-post__infos__profil__username">John Smith</p>
            <p className="card-post__infos__profil__created-time">Crée le 10/01/2022</p>
          </div>
          <i onClick={handleDelete} className="card-post__infos__delete fa-2x fa-solid fa-trash-can"></i>
        </div>
        <div className="card-post__content">Ici se trouve le post que je vais mettre en ligne</div>
      </div>
    </main>
  );
};

export default WallContainer;
