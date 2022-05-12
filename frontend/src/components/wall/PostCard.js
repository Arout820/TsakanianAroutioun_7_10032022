import { useEffect, useState } from 'react';
import { dateCorrection } from '../../utils/Utils';
import emptyPhoto from '../../assets/profil_vide.jpg';

import DeletePostCard from './DeletePostCard';
import LikePostCard from './LikePostCard';
import CommentsOfPost from './CommentsOfPost';
import Comments from './Comments';
import NewComment from './NewComment';

const PostCard = ({ postInfos, setModification, userInfos }) => {
  // récupération infos de connexion du local storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const userId = userConnectionInfos.userId;
  const token = userConnectionInfos.token;
  const isAdmin = userConnectionInfos.isAdmin;

  // variables selon état du fetch
  const [commentInfos, setCommentInfos] = useState(null);
  const [error, setError] = useState(null);

  const [updateComment, setUpdateComment] = useState(false);

  useEffect(() => {
    const abortCtrl = new AbortController();
    fetch(`http://localhost:5000/api/comment`, {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      try {
        const contenu = await res.json();
        setCommentInfos(contenu);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          return setError("Le chargement des éléments n'a pas abouti");
        }
        setError(err.message);
      }
    });
    return () => abortCtrl.abort();
  }, [token, updateComment]);

  return postInfos.map((post) => (
    <div key={post.post_id} className="card-post" id={`cardPost${post.post_id}`}>
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
        {(post.user_id === userId || isAdmin === 1) && <DeletePostCard setModification={setModification} post={post} />}
      </div>
      {post.content && <p className="card-post__content">{post.content}</p>}
      {post.video && (
        <div className="card-post__video">
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
          <img src={post.attachment} alt={`Posté par ${post.firstname} ${post.lastname}`} />
        </div>
      )}
      <div className="card-post__reputation">
        <LikePostCard post={post} setModification={setModification} />
        <CommentsOfPost post={post} updateComment={updateComment} />
      </div>
      <Comments
        post={post}
        userInfos={userInfos}
        commentInfos={commentInfos}
        error={error}
        setUpdateComment={setUpdateComment}
      />
      <NewComment setUpdateComment={setUpdateComment} post={post} userInfos={userInfos} />
    </div>
  ));
};

export default PostCard;
