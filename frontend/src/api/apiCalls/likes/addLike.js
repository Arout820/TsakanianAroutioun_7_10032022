import server from '../../server';

// fetch pour ajouter un like
async function addLike(sendLikesInfos, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/likes/`, {
      method: 'POST',
      body: JSON.stringify(sendLikesInfos),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default addLike;
