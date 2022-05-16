import { fetcher } from './fetcher';
import { store } from '../providers/Store';

// fetch pour récupérer données de connexion d'un utilisateur
async function login(loginInfos, navigate) {
  // try {
  //   const res = await fetch(`http://localhost:5000/api/user/login`, {
  //     method: 'POST',
  //     body: JSON.stringify(loginInfos),
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   return await res.json();
  // } catch (error) {
  //   console.log(error);
  // }

  let res;
  try {
    res = await fetcher(`/user/login`, JSON.stringify(loginInfos), 'POST');

    if (res.error) {
      console.log(res.error);
    }
    if (res) {
      console.log('LOGIN');
      console.log(res);
      store.set({
        login: {
          ...res,
        },
      });
    }
    localStorage.setItem('token', JSON.stringify(res));

    navigate('/wall');
  } catch (err) {
    console.log(err);
  }
}

export default login;
