import server from '../../server';

// fetch pour ajouter un commentaire
async function addComment(sendCommentInfos, token) {
  try {
    const url = server();
    const res = await fetch(`${url}/comment/`, {
      method: 'POST',
      body: JSON.stringify(sendCommentInfos),
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

export default addComment;
