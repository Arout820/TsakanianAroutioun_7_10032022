import { useEffect, useState } from 'react';

const LikePostCard = ({ post, setModification, userInfos }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const id = userConnectionInfos.userId;
  const token = userConnectionInfos.token;

  const user_id = id;
  const post_id = post.post_id;

  // variables selon état du fetch
  const [likeInfos, setlikeInfos] = useState('');
  const [error, setError] = useState(null);

  // toogle pour relancer récupération de données
  const [updateLike, setUpdateLike] = useState(false);

  const isLiked = 1;
  const sendlikesInfos = { user_id, post_id, isLiked };

  useEffect(() => {
    if (likeInfos) {
      console.log('--- like infos---');
      console.log(likeInfos);
    }
  }, [likeInfos]);

  // -------------- récupération des éléments de posts de la base de données avec l'api -----------------------------
  // useEffect(() => {
  //   const abortCtrl = new AbortController();
  //   fetch(`http://localhost:5000/api/likes/`, {
  //     signal: abortCtrl.signal,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then(async (res) => {
  //     try {
  //       if (!res.ok) {
  //         throw Error(`${res.status}  ${res.statusText}`);
  //       } else {
  //         const contenu = await res.json();
  //         setlikeInfos(contenu);
  //         setError(null);
  //       }
  //     } catch (err) {
  //       if (err.name === 'AbortError') {
  //         setError('Fetch a été stoppé');
  //       } else {
  //         setError(err.message);
  //       }
  //     }
  //   });
  //   return () => abortCtrl.abort();
  // }, [id, token, error, updateLike, post_id]);

  // --------------- fonction like enlever like ------------------------ //
  const handleLike = (event) => {
    event.preventDefault();
    likeInfos.map((like) => {
      if (!like.isLiked) {
        const sendLike = fetch('http://localhost:5000/api/likes', {
          method: 'POST',
          body: JSON.stringify(sendlikesInfos),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        sendLike.then(async (res) => {
          try {
            setUpdateLike((e) => !e);
          } catch (err) {
            console.log(err);
          }
        });
      } else if (like.isLiked === 1) {
        // Enlever un like
        const sendRemoveLike = fetch(
          `http://localhost:5000/api/likes/${userInfos[0].user_id}/${post.post_id}/0`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        sendRemoveLike.then(async (res) => {
          try {
            setUpdateLike((e) => !e);
          } catch (err) {
            console.log(err);
          }
        });
      }
    });
  };

  return (
    <div onClick={handleLike} className={'card-post__reputation__element'}>
      <i className="fa-2x fa-solid fa-thumbs-up"></i>
      <p className="card-post__reputation__element__number">J'aime (Number)</p>
    </div>
  );
};

export default LikePostCard;
