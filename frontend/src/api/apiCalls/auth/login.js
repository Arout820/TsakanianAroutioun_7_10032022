import server from '../../server';

// fetch pour récupérer données de connexion d'un utilisateur
async function login(loginInfos) {
  try {
    const url = server();
    const res = await fetch(`${url}/user/login`, {
      method: 'POST',
      body: JSON.stringify(loginInfos),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default login;
