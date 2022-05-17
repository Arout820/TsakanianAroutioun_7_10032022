import server from '../../server';

// fetch pour supprimer un post
async function deletePost(postId, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/post/${postId}`, {
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

export default deletePost;
