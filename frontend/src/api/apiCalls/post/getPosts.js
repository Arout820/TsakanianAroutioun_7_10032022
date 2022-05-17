import server from '../../server';

// fetch pour récupérer les données des posts
async function getPosts(token, setError) {
  const abortCtrl = new AbortController();
  try {
    const url = server();
    const res = await fetch(`${url}/post`, {
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
      return setError('Le chargement des posts a été stoppé !');
    }
    setError(error.message);
  }
  return () => abortCtrl.abort();
}

export default getPosts;
