import { useEffect, useState } from 'react';

const CommentsOfPost = ({ post, updateComment }) => {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  const token = userConnectionInfos.token;

  const [numberComments, setNumberComments] = useState('');

  useEffect(() => {
    const abortCtrl = new AbortController();
    fetch(`http://localhost:5000/api/post/comments/${post.post_id}`, {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      try {
        const contenu = await res.json();
        setNumberComments(contenu);
      } catch (err) {
        console.log(err);
      }
    });
    return () => abortCtrl.abort();
  }, [token, updateComment, post.post_id]);

  return (
    <div className="card-post__reputation__element">
      <i className="fa-2x fa-solid fa-comment"></i>
      <p className="card-post__reputation__element__number">
        {numberComments &&
          numberComments[0].post_id === post.post_id &&
          numberComments[0].post_comments}{' '}
        commentaires
      </p>
    </div>
  );
};

export default CommentsOfPost;
