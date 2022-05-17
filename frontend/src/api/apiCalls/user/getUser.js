import server from '../../server';

// fetch pour récupérer les données d'un utilisateur
async function getUser(userId, token, setError) {
  const abortCtrl = new AbortController();
  try {
    const url = server();
    const res = await fetch(`${url}/user/${userId}`, {
      signal: abortCtrl.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw Error("Mauvaise demande d'information à l'api !");
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

export default getUser;
