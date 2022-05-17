import server from '../../server';

// fetch pour supprimer un like
async function deleteLike(userId, postId, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/likes/${userId}/${postId}/0`, {
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

export default deleteLike;
