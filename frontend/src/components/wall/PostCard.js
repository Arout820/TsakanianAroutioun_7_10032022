import { useEffect, useState } from 'react';
import profilVide from '../../assets/profil_vide.jpg';
import DeletePostCard from './DeletePostCard';
import { dateCorrection } from '../../utils/Utils';
import NewComment from './NewComment';
import Comments from './Comments';

const WallCardPost = ({ postInfos, setModification }) => {
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
          src={post.user_photo}
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
      <p className="card-post__content">{post.content}</p>
      <div className="card-post__reputation">
        <i className="card-post__reputation__element fa-2x fa-solid fa-thumbs-up"></i>
        <p className="card-post__reputation__element ">Commenter</p>
      </div>
      <div className="card-comments">
        <h1>Commentaires</h1>
        <Comments post={post} commentInfos={commentInfos} error={error} setUpdateComment={setUpdateComment} />
      </div>
      <NewComment setUpdateComment={setUpdateComment} post={post} />
    </div>
  ));
};

export default WallCardPost;
