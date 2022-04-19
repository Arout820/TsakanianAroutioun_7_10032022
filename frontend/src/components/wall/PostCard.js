import { useEffect, useState } from 'react';
import emptyPhoto from '../../assets/profil_vide.jpg';
import DeletePostCard from './DeletePostCard';
import { dateCorrection } from '../../utils/Utils';
import NewComment from './NewComment';
import Comments from './Comments';
import LikePostCard from './LikePostCard';

const WallCardPost = ({ postInfos, setModification, userInfos }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  // variables selon état du fetch
  const [commentInfos, setCommentInfos] = useState(null);
  const [error, setError] = useState(null);

  const [updateComment, setUpdateComment] = useState(false);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const recupComment = fetch(`http://localhost:5000/api/comment`, {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    recupComment.then(async (res) => {
      try {
        const contenu = await res.json();
        setCommentInfos(contenu);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          setError('Fetch a été stoppé');
        } else {
          setError(err.message);
        }
      }
    });
    return () => abortCtrl.abort();
  }, [token, updateComment, updateComment]);

  return postInfos.map((post) => (
    <div key={post.post_id} className="card-post" id={`card-post__${post.post_id}`}>
      <div className="card-post__infos">
        <img
          className="card-post__infos__photo"
          src={post.user_photo ? post.user_photo : emptyPhoto}
          alt={`Logo de ${post.firstname} ${post.lastname}`}
        />
        <div className="card-post__infos__profil">
          <p className="card-post__infos__profil__username">
            {post.firstname} {post.lastname}
          </p>
          <p className="card-post__infos__profil__time">{dateCorrection(post.post_create_time)}</p>
        </div>
        {post.user_id === id && <DeletePostCard setModification={setModification} post={post} />}
      </div>
      {post.content && <p className="card-post__content">{post.content}</p>}
      {post.video && (
        <div className='card-post__video'>
          <iframe
            src={post.video}
            title={post.video}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {post.attachment && (
        <div className="card-post__image">
          <img src={post.attachment} alt={'Photo posté par ' + post.firstname + ' ' + post.lastname} />
        </div>
      )}
      <div className="card-post__reputation">
        <LikePostCard post={post} userInfos={userInfos} setModification={setModification} />
        <div className="card-post__reputation__element">
          <i className="fa-2x fa-solid fa-comment"></i>
          <p className="card-post__reputation__element__number">12 commentaires</p>
        </div>
      </div>
      <Comments post={post} commentInfos={commentInfos} error={error} setUpdateComment={setUpdateComment} />
      <NewComment setUpdateComment={setUpdateComment} post={post} userInfos={userInfos} />
    </div>
  ));
};

export default WallCardPost;
