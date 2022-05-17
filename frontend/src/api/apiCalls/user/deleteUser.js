import server from '../../server';

// fetch pour supprimer un utilisateur
async function deleteUser(userId, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/user/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default deleteUser;
