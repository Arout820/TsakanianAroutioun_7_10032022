import server from '../../server';

// fetch pour supprimer un commentaire
async function deleteComment(commentId, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/comment/${commentId}`, {
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

export default deleteComment;
