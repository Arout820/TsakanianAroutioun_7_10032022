import server from '../../server';

// fetch pour modifier les données d'un utilisateur
async function modifyUserInfos(newInfos, userId, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(newInfos),
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

export default modifyUserInfos;
