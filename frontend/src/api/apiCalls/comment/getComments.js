import server from '../../server';

// fetch pour récuper les données des commentaires
async function getComments(token, setErrorComments) {
  const abortCtrl = new AbortController();
  try {
    const url = server();
    const res = await fetch(`${url}/comment`, {
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
      return setErrorComments('Le chargement des commentaires a été stoppé !');
    }
    setErrorComments(error.message);
  }
  return () => abortCtrl.abort();
}

export default getComments;
