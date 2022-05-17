import server from '../../server';

// fetch pour modifier ou supprimer la photo de profil d'un utilisateur
async function modifyUserPhoto(formData, userId, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/user/${userId}`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default modifyUserPhoto;
