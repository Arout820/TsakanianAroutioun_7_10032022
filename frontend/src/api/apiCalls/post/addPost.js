import server from '../../server';

// fetch pour faire un post
async function addPost(formData, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/post/`, {
      method: 'POST',
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

export default addPost;
