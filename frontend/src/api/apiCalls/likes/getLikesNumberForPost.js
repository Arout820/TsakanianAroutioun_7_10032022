import server from '../../server';

// fetch pour récupérer le nombre de likes d'un post
async function getLikesNumberForPost(userId, postId, token, setError) {
  const abortCtrl = new AbortController();
  try {
    const url = server();
    const res = await fetch(`${url}/likes/${userId}/${postId}`, {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw Error(`${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      return setError('Le chargement des éléments a été stoppé !');
    }
    setError(error.message);
  }
  return () => abortCtrl.abort();
}

export default getLikesNumberForPost;
