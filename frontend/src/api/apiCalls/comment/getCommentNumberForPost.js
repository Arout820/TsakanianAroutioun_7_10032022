import server from '../../server';

// fetch pour récupérer le nombre de commentaire d'un post
async function getCommentNumberForPost(postId, token) {
  const abortCtrl = new AbortController();
  try {
    const url = server();
    const res = await fetch(`${url}/post/comments/${postId}`, {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
  return () => abortCtrl.abort();
}

export default getCommentNumberForPost;
