import { useEffect, useRef } from 'react';
import profilVide from '../../assets/profil_vide.jpg';
import WallCardDelete from './WallCardDelete';
import { dateCorrection } from '../../utils/Utils';
import WallNewComment from './WallNewComment';
import WallComments from './WellComments';

const WallCardPost = ({ postInfos, setModification }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;

  return postInfos.map((post) => (
    <div key={post.post_id} className="card-post" id={`card-post__${post.post_id}`}>
      <div className="card-post__infos">
        <img className="card-post__infos__photo" src={profilVide} alt="" />
        <div className="card-post__infos__profil">
          <p className="card-post__infos__profil__username">
            {post.firstname} {post.lastname}
          </p>
          <p className="card-post__infos__profil__time">{dateCorrection(post.post_create_time)}</p>
        </div>
        {post.user_id === id && <WallCardDelete setModification={setModification} post={post} />}
      </div>
      <p className="card-post__content">{post.content}</p>
      <div className="card-post__reputation">
        <i className="card-post__reputation__element fa-2x fa-solid fa-thumbs-up"></i>
        <p className="card-post__reputation__element ">Commenter</p>
      </div>
      <WallComments setModification={setModification} post={post} />
      <WallNewComment setModification={setModification} post={post} />
    </div>
  ));
};

export default WallCardPost;
